import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ConvexReactClient } from "convex/react";
import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { RouterProvider } from './navigation/RouterContext.tsx';
import { api } from "../convex/_generated/api";

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ConvexAuthProvider
        client={convex}
        api={{
            refreshSession: api.auth.refreshSession,
            signOut: api.auth.signOut,
            isAuthenticated: api.auth.isAuthenticated,
        }}
        >
            <RouterProvider>
                <App/>
            </RouterProvider>
        </ConvexAuthProvider>
    </StrictMode>,
)

// ConvexAuthProvider still connects to Convex,
// but also manages the sign-in session.
// The api object tells it which Convex functions refresh, end, and check that session.
