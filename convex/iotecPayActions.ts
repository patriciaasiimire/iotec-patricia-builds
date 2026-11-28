// test the token only

import { internalAction } from "./_generated/server";
import {v} from "convex/values";
import { getIotecPayToken } from "./iotecPay/iotecPayToken";

export const testIotecAuthentication = internalAction({
    // internalAction means this is for backend testing,
    // not something your webpage can call.
    // It asks for a token but returns only null—never the token itself.
    args: {},
    returns: v.null(),
    handler: async () => {
        await getIotecPayToken();
        return null;
    },
});