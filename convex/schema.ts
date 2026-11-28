import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    tasks: defineTable({
        text: v.string(),
        isCompleted: v.boolean(),
    }),
    blogs: defineTable({
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
    }).index("by_status_and_publishedAt", ["status", "publishedAt"]), users: defineTable({
        isAdmin: v.optional(v.boolean()),
        // v.optional means older user records can be missing this field. We’ll only treat isAdmin: true as admin.
    }),

    blogPurchases: defineTable({
        userId: v.id("users"),
        blogId: v.id("blogs"),
        externalId: v.string(),
        providerTransactionId: v.optional(v.string()),
        amount: v.number(),
        currency: v.union(
            v.literal("UGX"),
            v.literal("USD"),
            v.literal("ITX"),
        ),
        status: v.union(
            v.literal("pending"),
            v.literal("succeeded"),
            v.literal("failed"),
        ),
    })
        .index("by_user_blog_status", ["userId", "blogId", "status"])
        .index("by_provider_transaction_id", ["providerTransactionId"])
        .index("by_external_id", ["externalId"]),
// userId and blogId record who is trying to buy which article.
// externalId is a reference we generate for this purchase attempt.
// providerTransactionId is Iotec Pay’s transaction ID. It’s optional because we won’t have it until Iotec accepts the collection request.
// amount and currency record what the reader was charged.
// status records the payment state. We use our own lowercase names; later, we’ll translate Iotec’s Pending, Success, and Failed values into them.
// The indexes let Convex look up purchases efficiently—for example, to check whether this user has a successful purchase for this blog.

});

// Why an empty users table?
// Convex Auth needs a place in your app’s data model for each signed-in user.
// The passkey credentials are handled by the Auth components;
// don’t add passkey secrets or passwords to this table.
// Later, we’ll decide how to mark your account as an admin.
