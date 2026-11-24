import type { AuthConfig } from "convex/server";
import { convexAuthProvider } from "@convex-dev/auth/server";

export default {
    providers: [convexAuthProvider()],
} satisfies AuthConfig;

// 'providers' list answers “which sign-in provider should Convex trust?”
// 'satisfies AuthConfig' asks TypeScript to check that this object has the shape Convex expects