import { useMemo, useState } from "react";
import BlogCard from "./BlogCard";
import { blogs, type Blog } from "@/data/blogs";
import { useNavigate } from "@/navigation/RouterContext";
import { PATHS } from "@/navigation/paths";

const POSTS_PER_PAGE = 3;
const ALL = "All";

function RecentBlogs() {
    const navigate = useNavigate();
    const [activeCategory, setActiveCategory] = useState(ALL);
    const [currentPage, setCurrentPage] = useState(1);

    // Derive the tab list from the data itself - add a category in
    // blogs.ts and it automatically becomes a tab here.
    const categories = useMemo(
        () => [ALL, ...Array.from(new Set(blogs.map((b) => b.category)))],
        []
    );

    // Compute the visible list from state - never store it in state.
    const filteredBlogs = useMemo(
        () =>
            activeCategory === ALL
                ? blogs
                : blogs.filter((b) => b.category === activeCategory),
        [activeCategory]
    );

    const totalPages = Math.ceil(filteredBlogs.length / POSTS_PER_PAGE);

    // If a filter shrinks the list, don't get stranded on an empty page
    const safePage = Math.min(currentPage, totalPages);
    const pageBlogs = filteredBlogs.slice(
        (safePage - 1) * POSTS_PER_PAGE,
        safePage * POSTS_PER_PAGE
    );

    const handleCategoryClick = (category: string) => {
        setActiveCategory(category);
        setCurrentPage(1); // a new filter always starts on page 1
    };

    const handleRead = (blog: Blog) => {
        navigate(`${PATHS.BLOG_DETAILS}?id=${blog.id}`);
    };

    return (
        <section className="max-w-5xl mx-auto px-6 pb-20">
            {/* header */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                <h2 className="text-2xl font-semibold">Recent Blogs</h2>

                {/* Filters */}
                <div className="flex flex-wrap items-center gap-4 text-sm">
                    {categories.map((category) => (
                        <button key={category} onClick={() =>
                            handleCategoryClick(category)}
                            className={
                                category === activeCategory
                                    ? "font-medium text-[#1c1917] border-b-2 border-[#1c1917] pb-0.5"
                                    : "text-[#78716c] hover:text-[#1c1917] transition-colors"
                            }
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {/* Blog cards grid */}
            {pageBlogs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pageBlogs.map((blog) => (
                        <BlogCard key={blog.id} blog={blog} onRead={handleRead} />
                    ))}
                </div>
            ) : (
                <p className="text-sm text-[#78716c] py-12 text-center">No blogs in this category yet.</p>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-10">
                    <button
                        onClick={() => setCurrentPage((p) => Math.max(p-1, 1))}
                        disabled={safePage === 1}
                        className="px-3 py-1.5 text-sm rounded-lg border border-[#e8e6e0] text-[#44403c] hover:bg-[#f6f5f1] disabled:opacity-40 disabled:cursor-not-allowed">
                        ← Prev
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${page === safePage
                                    ? "bg-[#1c1917] text-white border-[#1c1917]"
                                    : "border-[#e8e6e0] text-[#44403c] hover:bg-[#f6f5f1]"
                                }`}
                        >
                            {page}
                        </button>
                    ))}

                    <button
                        onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages)
                        )}
                        disabled={safePage === totalPages}
                        className="px-3 py-1.5 text-sm rounded-lg border border-[#e8e6e0] text-[#44403c] hover:bg-[#f6f5f1] disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        Next →
                    </button>
                </div>
            )}
        </section>
    );
}

export default RecentBlogs;

/*
The concepts, in the order they appear
1. Two pieces of state, nothing more.
tsx
const [activeCategory, setActiveCategory] = useState(ALL);
const [currentPage, setCurrentPage] = useState(1);
This is the single most important React idea in the file: state is the minimal set of facts; everything else is computed. You might be tempted to also store filteredBlogs in state. Don't. The filtered list isn't a new fact — it's a consequence of activeCategory. If you stored both, they'd be two copies of one truth, and they'd drift (update one, forget the other → bugs). Rule of thumb: if you can calculate it from state during render, don't put it in state.

2. useMemo — caching a calculation.
tsx
const filteredBlogs = useMemo(() => ..., [activeCategory]);
useMemo says "only re-run this calculation when activeCategory changes." Without it, the filter would re-run on every render — harmless here (6 items), but the pattern matters when lists grow. Read the arguments backwards: [activeCategory] is "recompute when this changes," the function is "how to recompute." The empty array [] on categories means "compute once, never again" — blog categories don't change at runtime.

3. The filter itself.
tsx
activeCategory === ALL ? blogs : blogs.filter((b) => b.category === activeCategory)
.filter() walks the array and keeps only items where the callback returns true. Nothing is deleted — a filter always returns a new array; the original blogs is untouched. That immutability is why the "All" tab works: it just... stops filtering, and the full original array is still there.

4. Pagination is slicing, not splitting.
tsx
filteredBlogs.slice((safePage - 1) * POSTS_PER_PAGE, safePage * POSTS_PER_PAGE)
.slice(start, end) copies out a sub-range. Page 1 → indices 0–3, page 2 → 3–6. No arrays get chopped up; each page just views a different window of the same list. Math.ceil rounds up so a remainder (e.g. 4 blogs = 2 pages of 3+1) gets its own page.

5. The safePage clamp — a bug you avoid before it happens.
Imagine you're on page 2, then click the "Architecture" filter, which has only 3 posts → now there's only 1 page. currentPage still says 2, so the slice returns nothing and the user stares at an empty grid. safePage = Math.min(currentPage, totalPages) fixes it at render: we display page 1 while state catches up. We also reset setCurrentPage(1) inside the tab click — the clamp is the seatbelt, the reset is the brake.
6. setCurrentPage((p) => p + 1) — the updater function.
For Prev/Next we don't do setCurrentPage(currentPage + 1). We pass a function that receives the latest value. Why: React batches state updates, and currentPage inside your event handler can be stale. The updater form is always safe: "whatever the current page is, give me one more, floored/capped."

7. Array.from({ length: totalPages }, (_, i) => i + 1) — building page numbers.
A compact idiom for "make an array 1..N." Array.from builds an array of the given length; the second argument maps each slot to a value. The _ is the unused element (undefined), i is its index; i + 1 turns 0,1,2 into page numbers 1,2,3.

8. Wiring up Step 4's callback.
tsx
<BlogCard key={blog.id} blog={blog} onRead={handleRead} />
This is the parent "changing its mind" from the Step 4 explanation: the card reports a click, and here we decide it means navigate('/blog?id=3'). Also note key={blog.id} — the stable key replacing your old key={index}, and the reason we added id to the data in Step 1.
9. Two conditional renders.
{pageBlogs.length > 0 ? ... : ...} guards the empty-filter case with a friendly message, and {totalPages > 1 && ...} hides pagination entirely when everything fits on one page. The && trick: false renders as nothing in JSX.
*/