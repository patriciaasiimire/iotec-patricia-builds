import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Authenticated, AuthLoading, Unauthenticated, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { PasskeySignInForm } from '@/components/PasskeySignInForm';
import { useState } from 'react';

export function AdminBlogsPage() {
  // isFormOpen remembers whether the form is visible.
  // title remembers what’s typed in its input.
  // useState(false) starts closed; useState("") starts with an empty title.
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [contentText, setContentText] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [isFree, setIsFree] = useState(true);
  // The text between <...> is a TypeScript union type:
  // status may only be "draft" or "published". It starts as "draft".
  // The free/paid setting is a boolean, so it starts as true.

  const [readTimeText, setReadTimeText] = useState("1");
  const [priceText, setPriceText] = useState("0");
  const [currency, setCurrency] = useState("UGX");
  // We’re storing the number inputs as text for now.
  // Even an HTML input with type="number" gives React a text value when you read event.target.value.
  // When we submit the form, we’ll convert those strings into numbers and check they’re valid.


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
          onClick={() => setIsFormOpen(true)}
          type="button"
          className="self-start px-4 py-2 text-xs font-medium shadow-2xs sm:self-auto"
        >
          <Plus aria-hidden="true" className="size-3.5" />
          <span>Create New Blog</span>
        </Button>
      </div>

        {isFormOpen && (
          <div className="mt-8 rounded-xl border border-[#e8e6e0] bg-white p-6">
            
            {/* Title input */}
            <label htmlFor="blog-title" className="mb-2 block text-sm font-medium">
              Blog title
            </label>
            <input id='blog-title' value={title} onChange={(event) => setTitle(event.target.value)} className="w-full rounded-lg border border-[#e8e6e0] px-3 py-2" placeholder='Enter a title' />
            <p className="mt-2 text-sm text-muted-foreground">
              Title entered: {title || "Nothing yet"}
            </p>

            {/* Description input */}
            <label htmlFor="blog-description" className="mb-2 mt-6 block text-sm font-medium">
              Short Description
            </label>
            <textarea id="blog-description" value={description} onChange={(event) => setDescription(event.target.value)} className='w-full rounded-lg border border-[#e8e6e0] px-3 py-2' rows={3} placeholder='A short summary for the blog card'/>

              {/* Category */}
              <label htmlFor="blog-category" className="mb-2 mt-6 block text-sm font-medium">
                Category
              </label>
              <input id='blog-category' value={category} onChange={(event) => setCategory(event.target.value)} className="w-full rounded-lg border border-[#e8e6e0] px-3 py-2" placeholder='For example, Friendship' />

              {/* controls to the form */}
              <label htmlFor="blog-status" className="mb-2 mt-6 block text-sm font-medium">
                Status
              </label>
              <select id="blog-status" value={status} onChange={(event) => {
                const nextStatus = event.target.value;

                if (nextStatus === "draft" || nextStatus === "published")
                  setStatus(nextStatus);
              }}
              className="w-full rounded-lg border border-[#e8e6e0] px-3 py-2">
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>

              <label className="mt-6 flex items-center gap-2 text-sm font-medium">
                <input type="checkbox" checked={isFree} onChange={(event) => setIsFree(event.target.checked)} />
                This blog is free
              </label>

              {/* reading time and price. */}
              <label htmlFor="blog-read-time" className="mb-2 mt-6 block text-sm font-medium">
                Reading time in minutes
              </label>
              <input id='blog-read-time' type='number' min='1' step='1' value={readTimeText} onChange={(event) => setReadTimeText(event.target.value)} className="w-full rounded-lg border border-[#e8e6e0] px-3 py-2" />

              {!isFree && (
                // {!isFree && (...)} means “show the price and currency inputs only when the free checkbox is not checked.”
                // The database still needs priceAmount for free blogs,
                // so we’ll send 0 for those when we wire up saving.
                <>
                <label htmlFor="blog-price" className="mb-2 mt-6 block text-sm font-medium">
                  Price amount
                </label>
                <input id='blog-price' type='number' min='1' step='1' value={priceText} onChange={(event) => setPriceText(event.target.value)} className="w-full rounded-lg border border- px-3 py-2" />

                <label htmlFor="blog-currency" className="mb-2 mt-6 block text-sm font-medium">
                  Currency
                </label>
                <input id='blog-currency' value={currency} onChange={(event) => setCurrency(event.target.value)} className="w-full rounded-lg border border- px-3 py-2" />
                </>
              )}

              {/* Article content */}
              <label htmlFor="blog-content" className="mb-2 mt-6 block text-sm font-medium">
                Article content
              </label>
              <textarea id="blog-content" value={contentText} onChange={(event) => setContentText(event.target.value)} className="w-full rounded-lg border border-[#e8e6e0] px-3 py-2" rows={10} placeholder='Write the article here. Leave a blank line between paragraphs.'/>
                {/* 
                A <textarea> is like a bigger input for multiple lines.
                value displays what React has remembered;
                onChange updates that memory whenever you type.

                We’re keeping the article as one text string for now.
                Later, when we send it to Convex,
                we’ll split it into paragraphs because the schema expects content to be an array of strings.
                 */}
          </div>
        )}

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
