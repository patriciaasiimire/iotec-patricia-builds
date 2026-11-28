import {mutation, query} from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
// query reads data,
// mutation writes data,
// getAuthUserId identifies the signed-in browser session.

import { v } from "convex/values";

export const listPublished = query({
    args:{},
    returns: v.array(
        v.object({
            _id: v.id("blogs"),
            title: v.string(),
            description: v.string(),
            category: v.string(),
            publishedAt: v.optional(v.number()),
            coverImageUrl: v.union(v.string(), v.null()),
            readTimeMinutes: v.number(),
            priceAmount: v.number(),
            currency: v.string(),
            isFree: v.boolean(),
        }),
    ),
//     This is the database-reading part of your query. In your current blogs.ts, it belongs inside the listPublished query’s configuration, alongside args and returns.

// handler: async (ctx) => { ... } is the function Convex runs when the frontend asks for this query. ctx is the context Convex provides; here, it gives the function access to the database.
// ctx.db.query("blogs") starts a read from the blogs table.
// .withIndex("by_status_and_publishedAt", ...) tells Convex to use the index you defined in schema.ts, rather than searching the whole table.
// q.eq("status", "published") narrows the results to published blogs.
// .order("desc") sorts them from newest publication time to oldest.
// .take(50) returns at most 50 blogs, so the query stays bounded.
// await waits for Convex to finish reading before assigning the results to blogs.

// Think of a database table as a large stack of papers. Without an index, finding every published blog may mean checking each paper one by one. An index is like an organized lookup list: it helps the database jump to records that match certain fields.

// In your case, the index on status and publishedAt helps Convex find blogs where the status is "published" and return the newest ones first. That’s why the query can use .withIndex(...) and then .order("desc").

// Indexes have a tradeoff: they make matching reads faster, but take extra storage and need updating when documents change. So add them for the kinds of searches and sorting your app actually does—not for every field. An index also doesn’t create blogs or guarantee that a field’s values are unique.
    handler: async(ctx) => {
        const blogs = await ctx.db
            .query("blogs")
            .withIndex("by_status_and_publishedAt", (q) =>
                q.eq("status", "published"),
            )
            .order("desc")
            .take(50);
        
        
//         This is the transformation-and-return step of the query:

// blogs.map(...) goes through each of the published blog documents fetched just before this.
// For each blog, it builds a new, smaller object with the fields the blog cards need.
// ctx.storage.getUrl(blog.coverImageId) turns the stored image ID into a URL the page can display. It may return null if the image isn’t available.
// Because getting each URL is asynchronous, map produces a list of promises. Promise.all(...) waits for them all and gives you an array of finished blog-card objects.
// return sends that array back to whoever called the query. The code leaves out the full content, which is important for your future paywall.
// Where we are: the query is being built to fetch published documents, prepare card-ready data, and return it to the frontend. After that, we’ll add blog data to Convex and connect RecentBlogs to this query.
        return await Promise.all(
            blogs.map(async(blog) => ({
                _id: blog._id,
                title: blog.title,
                description: blog.description,
                category: blog.category,
                publishedAt: blog.publishedAt,
                coverImageUrl: await ctx.storage.getUrl(blog.coverImageId),
                readTimeMinutes: blog.readTimeMinutes,
                priceAmount: blog.priceAmount,
                currency: blog.currency,
                isFree: blog.isFree,
            })),
        );
    },
});

// A few important ideas in that function above:

// args: {} means the query doesn’t need any input.
// returns describes the result’s shape, so Convex can validate it.
// withIndex(...) uses the index you just added to select published blogs; take(50) keeps the result bounded.
// coverImageUrl is generated from the stored image ID. It can be null if the image is unavailable.
// The query deliberately leaves out content. Since you plan to add a paywall, don’t send paid article text to every visitor in the public list response.

export const getPublishedById = query({
    args: {
        id: v.id("blogs"),
    },
    returns: v.union(
        v.null(),
        v.object({
            _id: v.id("blogs"),
            title: v.string(),
            description: v.string(),
            content: v.union(v.array(v.string()), v.null()),
            category: v.string(),
            publishedAt: v.optional(v.number()),
            coverImageUrl: v.union(v.string(), v.null()),
            readTimeMinutes: v.number(),
            priceAmount: v.number(),
            currency: v.string(),
            isFree: v.boolean(),
        }),
    ),
    handler: async (ctx, args) => {
        const blog = await ctx.db.get(args.id);

        if (!blog || blog.status !== "published") {
            return null;
        }

        return {
            _id: blog._id,
            title: blog.title,
            description: blog.description,
            content: blog.isFree ? blog.content : null,
            category: blog.category,
            publishedAt: blog.publishedAt,
            coverImageUrl: await ctx.storage.getUrl(blog.coverImageId),
            readTimeMinutes: blog.readTimeMinutes,
            priceAmount: blog.priceAmount,
            currency: blog.currency,
            isFree: true as const,
        };
    },
});

export const createBlog = mutation({
    args:{
        // values from the caller
        title: v.string(),
        description: v.string(),
        content: v.array(v.string()),
        category: v.string(),
        status: v.union(v.literal("draft"), v.literal("published")),
        publishedAt: v.optional(v.number()),
        coverImageId: v.id("_storage"),
        readTimeMinutes: v.number(),
        priceAmount: v.number(),
        currency: v.string(),
        isFree: v.boolean(),
    },
    returns:v.id("blogs"),
    handler: async (ctx, args) => {
        // security and write logic
        const userId = await getAuthUserId(ctx);

        // first get the signed-in user ID
        if (userId === null)
            throw new Error("Not signed in");

        // load that user:
        const user = await ctx.db.get(userId);

        if (!user || user.isAdmin !== true)
            throw new Error("Not authorized");
        // This security check happens in Convex itself,
        // so hiding the form in React cannot be used as the only protection.

        // one useful rule: a published blog should always have publishedAt
        if (args.status === "published" && args.publishedAt === undefined)
            throw new Error("Published blogs need a publication date");

        // for free blogs, enforce
        if (args.isFree && args.priceAmount !== 0)
            throw new Error("Free blogs must have a zero price");

        // insert the blog after the checks
        return await ctx.db.insert("blogs", {
            title: args.title,
            description: args.description,
            content: args.content,
            category: args.category,
            status: args.status,
            publishedAt: args.publishedAt,
            coverImageId: args.coverImageId,
            readTimeMinutes: args.readTimeMinutes,
            priceAmount: args.priceAmount,
            currency: args.currency,
            isFree: args.isFree,
        });
        // The result is the new blog’s Convex _id.

    },
});

// blog schema requires coverImageId,
// so the form needs to upload the image to Convex Storage
// and get its ID before it can call createBlog
export const generateBlogImageUploadUrl = mutation({
    args: {},
    returns: v.string(),
    handler: async (ctx) => {
        const userId = await getAuthUserId(ctx);

        if (userId === null)
            throw new Error("Not signed in");

        const user = await ctx.db.get(userId);

        if (!user || user.isAdmin !== true)
            throw new Error("Not authorized");

        return await ctx.storage.generateUploadUrl();
    },
// args: {} says this function needs no input; it doesn’t need the image file itself.
// It repeats the sign-in and admin checks. Every public backend function that changes or enables changes must protect itself. Hiding the upload button isn’t security.
// ctx.storage.generateUploadUrl() asks Convex for a temporary URL that the browser can upload a file to.
// returns: v.string() says the function returns that URL as text.
// The browser will use the returned URL to upload the image; Convex responds with a storage ID. Then the form sends that ID to createBlog as coverImageId.
});