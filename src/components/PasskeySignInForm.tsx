import { useState } from "react";
import { useSignInWithUsernamePasskey } from "@convex-dev/auth/methods/username-passkey/react";
import { api } from "../../convex/_generated/api";

export function PasskeySignInForm() {
    const { signIn, pending, autofill} =
        useSignInWithUsernamePasskey(api.auth);
    const [username, setUsername] = useState("");
    const [error, setError] = useState<string | null>(null);

    return (
        <form 
            onSubmit={async (event) => {
                event.preventDefault();
                setError(null);
                
                const result = await signIn({ username });

                if ( result.status !== "complete") {
                    switch (result.userError.error) {
                        case "USERNAME_TOO_SHORT":
                            setError(`Use at least ${result.userError.minimumLength} character(s).`);
                            break;
                        case "USERNAME_TOO_LONG":
                            setError(`Use no more than ${result.userError.maximumLength} characters.`);
                            break;
                        case "USERNAME_HAS_SURROUNDING_WHITESPACE":
                            setError("Remove spaces from the beginning or end of the username.");
                            break;
                        case "USERNAME_HAS_INVALID_CHARACTERS":
                            setError("The username contains characters that aren't allowed.");
                            break;
                        case "USERNAME_TAKEN":
                            setError("The username is already in use. Try signing in with it.");
                            break;
                        case "CHALLENGE_EXPIRED":
                            setError("The passkey request expired. Please try again.");
                            break;
                        case "UNKNOWN_CREDENTIAL":
                            setError("That passkey wasn't found. Try the passkey for this username.");
                            break;
                        case "PROTOCOL_ERROR":
                            setError("The passkey check failed. Please try again.");
                            break;
                        case "CEREMONY_ABORTED":
                            setError("The passkey request was cancelled.");
                            break;
                        case "PASSKEY_ALREADY_REGISTERED":
                            setError("This passkey is already registered. Try signing in with it.");
                            break;
                        case "WEBAUTHN_UNSUPPORTED":
                            setError("This browser or device doesn't support passkeys..");
                            break;
                        case "ALREADY_PENDING":
                            setError("A passkey request is already in progress.");
                            break;
                        case "OTHER_ERROR":
                            console.log("Passkey sign-in failed:", result.userError.cause);
                            setError("Something unexpected happened. Please try again.");
                            break;
                        default:
                            result.userError satisfies never;
                    }
                }
            
            }}
        >
            <label htmlFor="username">Username</label>
            <input
                type="text"
                id="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                autoComplete="username webauthn"
                required
                disabled={pending}
            />

            {error !== null && <p role="alert">{error}</p> }
            {autofill.lastError !== null && (
                <p role="alert">{autofill.lastError.error}</p>
            )}

            <button type="submit" disabled={pending}>
                {pending ? "Waiting for your passkey..." : "Continue with a passkey"}
            </button>
            </form>
    );
}

// The form’s onSubmit prevents a regular page reload,
// then gives the username to the passkey hook.
// pending prevents starting a second passkey request while one is already running.
// The switch turns machine-readable error codes into messages;
// satisfies never asks TypeScript to flag any new error code we haven’t handled.