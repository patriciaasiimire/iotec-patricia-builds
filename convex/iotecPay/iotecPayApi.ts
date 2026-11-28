// helper that starts an Iotec collection.

import { env } from "../_generated/server";
import { getIotecPayToken } from "./iotecPayToken";

export async function startIotecCollection(
    args:{
        externalId: string,
        payer: string,
        amount: number,
    }
): Promise<{ id: string; status: string}> {
    const baseUrl = env.IOTEC_PAY_BASE_URL?.replace(/\/$/, "");
    const walletId = env.IOTEC_PAY_WALLET_ID;
    const currency = env.IOTEC_PAY_CURRENCY;

    if (
        baseUrl !== "https://pay-staging.iotec.io/api" ||
        currency !== "ITX"
    ) {
        throw new Error("This test helper only allows Iotec staging with ITX.");
    }

    if (!Number.isFinite(args.amount) || args.amount < 500 || args.amount > 1_000_000_000) {
        throw new Error("The collection amount is outside Iotec's allowed range.");
    }

    const token = await getIotecPayToken();
    const response = await fetch(`${baseUrl}/collections/collect`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            category: "MobileMoney",
            currency,
            walletId,
            externalId: args.externalId,
            payer: args.payer,
            amount: args.amount,
            transactionChargesCategory: "ChargeWallet",
        }),
    });

    if (!walletId) {
        throw new Error("Iotec staging wallet is not configured.");
        
    }

    if (!response.ok) {
        throw new Error(`Iotec collection request failed with HTTP ${response.status}.`);
    }

    const result: unknown = await response.json();

    if (
        typeof result !== "object" ||
        result === null ||
        !("id" in result) ||
        typeof result.id !== "string" ||
        !("status" in result) ||
        typeof result.status !== "string"
    ) {
        throw new Error("Iotec returned an unexpected collection response.");
    }

    return {id: result.id, status:result.status};

}