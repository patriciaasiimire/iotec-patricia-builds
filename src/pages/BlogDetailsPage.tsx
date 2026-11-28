// BlogDetailsPage.tsx
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
import { useLocation } from "../navigation/RouterContext";

import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useNavigate } from '../navigation/RouterContext'
import { PATHS } from '../navigation/paths'

export function BlogDetailsPage() {
  const navigate = useNavigate()

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
                <section className="rounded-xl border p-6">
                  <h2>Unlock this article</h2>
                  <p>{blog.currency} {blog.priceAmount}</p>
                </section>

              )}
            </div>
          </article>
        )}
      </div>
    </div>
  )
};