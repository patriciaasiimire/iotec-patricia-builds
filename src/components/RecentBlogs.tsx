import BlogCard from "./BlogCard";

const blogs = [
    {
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop",
        category: "Architecture",
        date: "Oct 24, 2024",
        readTime: "8 min read",
        price: "Paid . UGX 10,000",
        title: "Quiet Computing & The Architecture of Cognitive Silence",
        description: "An inquiry into computational environments that honor human attention spans, examining spatial interfaces and...",
    },
    {
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop",
        category: "Architecture",
        date: "Oct 24, 2024",
        readTime: "8 min read",
        price: "Paid . UGX 10,000",
        isFree: true,
        title: "Quiet Computing & The Architecture of Cognitive Silence",
        description: "An inquiry into computational environments that honor human attention spans, examining spatial interfaces and...",
    },
    {
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop",
        category: "Architecture",
        date: "Oct 24, 2024",
        readTime: "8 min read",
        price: "Paid . UGX 10,000",
        title: "Quiet Computing & The Architecture of Cognitive Silence",
        description: "An inquiry into computational environments that honor human attention spans, examining spatial interfaces and...",
    }
    
];

function RecentBlogs() {
    return (
        <section className="max-w-5xl mx-auto px-6 pb-20">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-semibold">Recent Blogs</h2>
                </div>

                {/* Simple filters */}
                <div className="flex items-center gap-4 text-sm">
                    <button className="font-medium text-[#1c1917]">All</button>
                    <button className="text-[#78716c]">Architecture</button>
                    <button className="text-[#78716c]">Technology</button>
                </div>
            </div>

            {/* Blog Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.map((blog, index) =>(
                    <BlogCard
                        key={index}
                        image={blog.image}
                        category={blog.category}
                        date={blog.date}
                        readTime={blog.readTime}
                        price={blog.price}
                        isFree={blog.isFree}
                        title={blog.title}
                        description={blog.description}
                    />
                ))}
            </div>
        </section>
    );
}

export default RecentBlogs;