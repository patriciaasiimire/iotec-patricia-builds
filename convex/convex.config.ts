import { defineApp } from "convex/server";
import { v } from "convex/values";
import auth from "@convex-dev/auth/convex.config.js";
import authPasskey from "@convex-dev/auth/components/passkey/convex.config.js";
import authUsername from "@convex-dev/auth/components/username/convex.config.js";

const app = defineApp({
    env: {
        PASSKEY_RP_ID: v.optional(v.string()),
        PASSKEY_ORIGIN: v.optional(v.string()),

        IOTEC_AUTH_ISSUER: v.optional(v.string()),
        IOTEC_AUTH_CLIENT_ID: v.optional(v.string()),
        IOTEC_AUTH_CLIENT_SECRET: v.optional(v.string()),
        IOTEC_PAY_BASE_URL: v.optional(v.string()),
        IOTEC_PAY_WALLET_ID: v.optional(v.string()),
        IOTEC_PAY_CURRENCY: v.optional(
            v.union(v.literal("ITX"), v.literal("UGX")),
        ),
    },
});

app.use(auth);
app.use(authPasskey);
app.use(authUsername);

export default app;

// auth, authPasskey, and authUsername are backend components Convex Auth needs for the sign-in system we chose.
// app.use(...) mounts those components in your Convex app.
// The env section tells Convex that passkey settings may be provided per deployment. It doesn’t set the values yet.