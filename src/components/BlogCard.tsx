import type { Blog } from "@/data/blogs";

type BlogCardProps = {
    blog: Blog;
    onRead: (blog: Blog) => void;
};

function BlogCard({ blog, onRead }: BlogCardProps) {
    const { image, category, date, readTime, price, title, description, isFree = false } = blog;

    return (
        <article className="bg-white rounded-xl overflow-hidden border border-[#e8e6e0] hover:shadow-md transition-shadow">
            {/* image */}
            <div className="aspect-[4/3] overflow-hidden">
                <img src={image} alt={title} className="w-full h-full object-cover" />
            </div>

            {/* content */}
            <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium text-[#78716c] uppercase tracking-wide">{category}</span>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded ${
                        isFree? "bg-green-50 text-green-700" : "bg-[#f6f5f1] text-[#44403c]"
                    }` } >{price}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#78716c] mb-3">
                    <span>{date}</span>
                    <span>.</span>
                    <span>{readTime}</span>
                </div>

                <h3 className="text-lg font-medium leading snug mb-2">{title}</h3>
                <p className="text-sm text-[#57534e] leading-relaxed mb-4 line-clamp-2">{description}</p>
                <button type="button" onClick={() => onRead(blog)} className="text-sm font-medium text-[#1c1917] hover:underline inline-flex items-center gap-1">Read <span>→</span></button>
            </div>
        </article>
    );
}

export default BlogCard;