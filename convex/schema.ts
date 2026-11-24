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
    }).index("by_status_and_publishedAt", ["status", "publishedAt"]), users: defineTable({}),
});
// Why an empty users table?
// Convex Auth needs a place in your app’s data model for each signed-in user.
// The passkey credentials are handled by the Auth components;
// don’t add passkey secrets or passwords to this table.
// Later, we’ll decide how to mark your account as an admin.
