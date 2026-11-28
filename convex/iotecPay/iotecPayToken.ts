// server-only helper that asks Iotec staging for a temporary access token. This step does not start a payment or move money.

import { env } from "../_generated/server";

export async function getIotecPayToken(): Promise<string> {
    // his sends the server’s client ID and secret to the staging token endpoint,
    // checks for an access_token, and returns it for backend use only.
    // It does not expose the token to the page.
    const issuer = env.IOTEC_AUTH_ISSUER;
    const clientId = env.IOTEC_AUTH_CLIENT_ID;
    const clientSecret = env.IOTEC_AUTH_CLIENT_SECRET;

    if (!issuer || !clientId || !clientSecret) {
        throw new Error("Iotec staging credentials are not configured.");
    }

    const form = new URLSearchParams({
        grant_type: "client_credentials",
        client_id: clientId,
        client_secret: clientSecret,
    });

    const response = await fetch(
        `${issuer.replace(/\/$/, "")}/protocol/openid-connect/token`,
        {
            method: "POST",
            headers: {"Content-Type": "applications/x-www-form-urlencoded"},
            body: form,
        },
    );

    if (!response.ok) {
        throw new Error(`Iotec token request failed with HTTP ${response.status}.`);
    }

    const result: unknown = await response.json();

    if (
        typeof result !== "object" ||
        result === null ||
        !("access_token" in result) ||
        typeof result.access_token !== "string"
    ) {
        throw new Error("Iotec response did not contain any access token.");
    }

    return result.access_token;
}