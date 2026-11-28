// BlogDetailsPage.tsx
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
import { useLocation } from "../navigation/RouterContext";
import { useState } from "react";

import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useNavigate } from '../navigation/RouterContext'
import { PATHS } from '../navigation/paths'

export function BlogDetailsPage() {
  const navigate = useNavigate()

  // These remember which demo network the reader selected, the phone number they typed, and the demo message to display.
  const [selectedProvider, setSelectedProvider] = useState<"MTN" | "Airtel">("MTN");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [demoMessage, setDemoMessage] = useState("");

  // Read ID from the url
  const { search } = useLocation()
  const blogId = new URLSearchParams(search).get('id')

  // Ask convex for that blog
  const blog = useQuery(
    api.blogs.getPublishedById,
    blogId ? { id: blogId as Id<'blogs'> } : 'skip',
  )
  // The 'skip' tells Convex “don’t run this query until we have an ID.”
  // The Id type tells TypeScript what kind of ID the query expects.
  // The query also checks the ID on Convex’s side.

  return (
    <div className="flex flex-1 flex-col items-start py-12">
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => navigate(PATHS.LANDING)}
        className="px-3.5 py-1.5 text-xs font-medium shadow-2xs"
      >
        <ArrowLeft aria-hidden="true" className="size-3.5 text-muted-foreground" />
        <span>Back to Landing</span>
      </Button>

      <div className="my-auto py-16">
        {!blogId ? (
          <p className="text-sm text-muted-foreground">Please select a blog</p>
        ) : blog === undefined ? (
          <p className="text-sm text-muted-foreground">Loading blog...</p>
        ) : blog === null ? (
          <p className="text-sm text-muted-foreground">
            Blog not found or unavailable.
          </p>
        ) : (
          <article className="mx-auto max-w-3xl">
            {blog.coverImageUrl && (
              <img src={blog.coverImageUrl} alt={blog.title} className="mb-8 aspect-[4/3] w-full rounded-xl object-cover" />
            )}
            <p className="text-sm text-muted-foreground">{blog.category}</p>
            <h1 className="mt-2 font-serif text-3xl font-normal tracking-tight text-foreground">
              {blog.title}
            </h1>
            <p className="mt-3 text-sm text-muted-foreground">
              {blog.publishedAt === undefined
                ? "Date not set"
                : new Date(blog.publishedAt).toLocaleDateString()}
              {" . "}
              {blog.readTimeMinutes} min read
            </p>
            <p className="mt-6 text-muted-foreground">{blog.description}</p>
            <div className="mt-8 space-y-5">
              {blog.isFree ? (
                blog.content?.map((paragraph, index) => (
                  <p key={index} className="leading-relaxed text-foreground">
                    {paragraph}
                  </p>
                ))
              ) : (
                <>
                {/* teaser only if it isnt empty */}
                {blog.previewContent && (
                  <p className="mb-6 leading-relaxed text-foreground">
                    {blog.previewContent}
                  </p>
                )}

                {/* unlock this article */}
                <div className="relative mt-8 min-h-[28rem] overflow-hidden">
                  <div className="pointer-events-none absolute inset-0 overflow-hiddenpx-2 pt-2 opacity-60">
                    <div className="space-y-4 blur-[3px]">
                      <p className="text-sm leading-7 text-gray-700">{blog.previewContent}</p>
                      <p className="text-sm leading-7 text-gray-700">{blog.description}</p>
                      <p className="text-sm leading-7 text-gray-700">{blog.previewContent}</p>
                    </div>
                  </div>

                  <section className="relative z-10 mx-auto mt-10 max-w-xl rounded-2xl border bg-white p-6 shadow-xl">
                    <h2 className="text-center font-serif text-xl">
                      Unlock this article
                    </h2>
                    <p className="mt-2 text-center">
                      {blog.currency} {blog.priceAmount}
                    </p>

                    <p className="mt-6 text-sm">Choose a Mobile Money network</p>
                    <div className="mt-2 grid grid-cols-2 gap-3">
                      <Button type="button" variant={selectedProvider === "MTN" ? "default" : "outline"} onClick={() => setSelectedProvider("MTN")}>
                        MTN Mobile Money
                      </Button>
                      <Button type="button" variant={selectedProvider === "Airtel" ? "default" : "outline"} onClick={() => setSelectedProvider("Airtel")}>
                        Airtel Money
                      </Button>
                    </div>

                    <label htmlFor="demo-phone" className="mt-5 block text-sm">
                      Mobile Money phone number
                    </label>
                    <input type="tel" id="demo-phone" value={phoneNumber} onChange={(event) => setPhoneNumber(event.target.value)} className="mt-2 w-full rounded-lg border px-3 py-2" placeholder="Enter your number" />

                    <Button type="button" className="mt-5 w-full" onClick={() =>
                      setDemoMessage(`Demo only: ${selectedProvider} selected. No payment was made.`)
                    }>
                      Continue with {selectedProvider}
                    </Button>

                    {demoMessage && (
                      <p className="mt-3 text-center text-sm" role="status">
                        {demoMessage}
                      </p>
                    )}
                  </section>
                </div>
                </>

              )}
            </div>
          </article>
        )}
      </div>
    </div>
  )
};