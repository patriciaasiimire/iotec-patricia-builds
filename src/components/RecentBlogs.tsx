import { useMemo, useState } from "react";
import BlogCard from "./BlogCard";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useNavigate } from "@/navigation/RouterContext";
import { PATHS } from "@/navigation/paths";

const POSTS_PER_PAGE = 3;
const ALL = "All";

function RecentBlogs() {
    const blogQuery = useQuery(api.blogs.listPublished, {});
    const blogs = blogQuery ?? [];
    // blogQuery is the actual result and is undefined while loading.
    // blogs gives your calculations an array to work with—even during loading.

    const navigate = useNavigate();
    const [activeCategory, setActiveCategory] = useState(ALL);
    const [currentPage, setCurrentPage] = useState(1);

    // Derive the tab list from the data itself - add a category in
    // blogs.ts and it automatically becomes a tab here.
    const categories = useMemo(
        () => [ALL, ...Array.from(new Set(blogs.map((b) => b.category)))],
        [blogs]
    );

    // Compute the visible list from state - never store it in state.
    const filteredBlogs = useMemo(
        () =>
            activeCategory === ALL
                ? blogs
                : blogs.filter((b) => b.category === activeCategory),
        [activeCategory, blogs]
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
            {blogQuery === undefined ? (
                <p className="text-sm text-[#78716c] py-12 text-center">
                    Loading blogs
                </p>
            ) : pageBlogs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pageBlogs.map((blog) => (
                        <BlogCard key={blog.id} blog={blog} onRead={handleRead}/>
                    ))}
                </div>
            ) : (
                <p className="text-sm text-[#78716c] py-12 text-center">
                    No blogs in this category yet.
                </p>
            )}

            {/* What's happening in the Blog cards grid */}
            {/* Here’s what your component is doing now: */}

            {/* Ask Convex for blogs. useQuery(api.blogs.listPublished, {}) requests the published blogs. Convex updates the component when the result arrives. */}
            {/* Handle the wait. While that request is in progress, blogQuery is undefined. Afterward, it contains the returned blog array. */}
            {/* Keep calculations safe. blogQuery ?? [] means “use the result, or use an empty array while it’s still undefined.” That lets the category and filtering logic run without trying to call .map() on undefined. */}
            {/* Choose what to display. The JSX expression under  Blog cards grid  is a compact if/else: */}
            {/* If blogQuery is undefined, show “Loading blogs.” */}
            {/* Otherwise, if pageBlogs has entries, show the cards. */}
            {/* Otherwise, show “No blogs in this category yet.” */}
            {/* The page is now getting its list from Convex instead of the local array. It isn’t fully connected yet: Blog and blog.id in your Read handler still refer to the old data shape; Convex blogs use _id. We should take that next, one piece at a time. */}

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