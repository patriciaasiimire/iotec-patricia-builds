import { internalMutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

export const createUser = internalMutation({
    args: {
        method: v.object({
            name: v.literal("usernamePasskey"),
            profile: v.object({}),
        }),
    },
    returns: v.id("users"),
    handler: async (ctx) => {
        return await ctx.db.insert("users", { isAdmin: false });
    },
});

// internalMutation registers a backend-only write function. The browser can’t call it directly.
// args checks the information Convex Auth passes when someone signs up. usernamePasskey names the method we chose.
// returns: v.id("users") promises that the function will return the new user’s ID.
// ctx.db.insert("users", {}) creates a user row. The empty {} is okay because we haven’t added app-specific user fields yet.
// This function doesn’t make the user an admin. It only creates their user record

export const currentUser = query({
    // Convex checks the signed-in session to get your user ID,
    // finds that user’s app record,
    // and returns only whether they’re an admin.
    // It doesn’t accept a user ID from the browser,
    // because that could let someone pretend to be a different user.
    args: {},
    returns: v.union(
        v.null(),
        v.object({
            isAdmin: v.boolean(),
        }),
    ),
    handler: async (ctx) => {
        const userId = await getAuthUserId(ctx);

        if (userId === null) {
            return null;
        }

        const user = await ctx.db.get(userId);

        if (!user) {
            return null;
        }

        return {
            isAdmin: user.isAdmin === true,
        };
    },
});