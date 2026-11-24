import { internalMutation } from "./_generated/server";
import { v } from "convex/values";

export const createUser = internalMutation({
    args: {
        method: v.object({
            name: v.literal("usernamePasskey"),
            profile: v.object({}),
        }),
    },
    returns: v.id("users"),
    handler: async (ctx) => {
        return await ctx.db.insert("users", {});
    },
});

// internalMutation registers a backend-only write function. The browser can’t call it directly.
// args checks the information Convex Auth passes when someone signs up. usernamePasskey names the method we chose.
// returns: v.id("users") promises that the function will return the new user’s ID.
// ctx.db.insert("users", {}) creates a user row. The empty {} is okay because we haven’t added app-specific user fields yet.
// This function doesn’t make the user an admin. It only creates their user record