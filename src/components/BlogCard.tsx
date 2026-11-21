import type { FunctionReturnType } from "convex/server";
import { api } from "../../convex/_generated/api";

export type BlogCardData =
    FunctionReturnType<typeof api.blogs.listPublished>[number];
// api.blogs.listPublished identifies your query.
// FunctionReturnType<...> asks TypeScript for the query’s result type—it doesn’t run the query.
// [number] means “one item from the array the query returns.”
// export lets another file, RecentBlogs, use this type too.

type BlogCardProps = {
    blog: BlogCardData;
    onRead: (blog: BlogCardData) => void;
};

function BlogCard({ blog, onRead }: BlogCardProps) {
    const { coverImageUrl, category, publishedAt, readTimeMinutes, currency, priceAmount, title, description, isFree = false } = blog;
    const dateLabel =
        publishedAt === undefined
            ? "Date not set"
            : new Date(publishedAt).toLocaleDateString();
    const priceLabel = isFree
            ? "Free"
            : `${currency} ${priceAmount.toLocaleString()}`;
    const readTimeLabel = `${readTimeMinutes} min read`;

    return (
        <article className="bg-white rounded-xl overflow-hidden border border-[#e8e6e0] hover:shadow-md transition-shadow">
            {/* image */}
            <div className="aspect-[4/3] overflow-hidden">
                {coverImageUrl ? (
                    <img src={coverImageUrl} alt={title} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full bg-[#f6f5f1]" aria-label="Image unavailable" />
                )}
            </div>

            {/* content */}
            <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium text-[#78716c] uppercase tracking-wide">{category}</span>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded ${
                        isFree? "bg-green-50 text-green-700" : "bg-[#f6f5f1] text-[#44403c]"
                    }` } >{priceLabel}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#78716c] mb-3">
                    <span>{dateLabel}</span>
                    <span>.</span>
                    <span>{readTimeLabel}</span>
                </div>

                <h3 className="text-lg font-medium leading snug mb-2">{title}</h3>
                <p className="text-sm text-[#57534e] leading-relaxed mb-4 line-clamp-2">{description}</p>
                <button type="button" onClick={() => onRead(blog)} className="text-sm font-medium text-[#1c1917] hover:underline inline-flex items-center gap-1">Read <span>→</span></button>
            </div>
        </article>
    );
}

export default BlogCard;