import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Authenticated, AuthLoading, Unauthenticated, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { PasskeySignInForm } from '@/components/PasskeySignInForm';

export function AdminBlogsPage() {
  const currentUser = useQuery(api.users.currentUser, {});
  // This asks Convex for the current visitor’s own admin status.
  // It doesn’t let the browser choose whose status to check.

  return (
    <>
    <AuthLoading>
      <p>Checking sign-in...</p>
    </AuthLoading>

{/* Unauthenticated means Convex has confirmed there’s no signed-in session,
so that’s where the sign-in form belongs. When sign-in succeeds,
Convex changes the auth state and this form disappears. */}
    <Unauthenticated>
      <PasskeySignInForm />
    </Unauthenticated>

    <Authenticated>
      {currentUser === undefined ? (
        <p>Checking admin access...</p>
      ) : currentUser?.isAdmin ? (
        <div className="flex flex-1 flex-col">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="font-serif text-3xl font-normal tracking-tight text-foreground">
          Articles &amp; Essays
        </h1>
        <Button
          type="button"
          className="self-start px-4 py-2 text-xs font-medium shadow-2xs sm:self-auto"
        >
          <Plus aria-hidden="true" className="size-3.5" />
          <span>Create New Blog</span>
        </Button>
      </div>

      <div className="my-auto py-16">
        <p className="text-sm text-muted-foreground">
          Articles and essays management content will appear here.
        </p>
      </div>
    </div>
      ) : (
        <p>You're signed in, but this account isn’t an admin.</p>
      )}
    </Authenticated>
    </>
    // Why these checks?
    // Convex first restores the sign-in session.
    // Then currentUser checks the user record.
    // Only isAdmin: true gets the admin page;
    // newly registered users start as non-admin.
  )
}
