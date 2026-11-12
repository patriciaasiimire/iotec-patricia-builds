export type Blog = {
    id: number;
    image: string;
    category: string;
    date: string;
    readTime: string;
    price: string;
    title: string;
    description: string;
    content: string[]; // one string per paragraph of the full article
    isFree?: boolean;
};

export const blogs: Blog[] = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop",
        category: "Architecture",
        date: "Oct 24, 2024",
        readTime: "8 min read",
        price: "Paid . UGX 10,000",
        title: "Quiet Computing & The Architecture of Cognitive Silence",
        description: "An inquiry into computational environments that honor human attention spans...",
        content: [
            "We spend our days inside machines that never stop talking. Notifications, badges, banners — the interface has become a crowded room where every object demands the floor.",
            "Quiet computing proposes the opposite: environments that wait. A spatial interface that reveals its depth only when the user slows down.",
            "The result is not emptiness. It is a room where the few things present are finally audible.",
        ],
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop",
        category: "Architecture",
        date: "Oct 24, 2024",
        readTime: "8 min read",
        price: "Free . UGX 0",
        isFree: true,
        title: "Quiet Computing & The Architecture of Cognitive Silence",
        description: "An inquiry into computational environments that honor human attention spans...",
        content: [
            "We spend our days inside machines that never stop talking. Notifications, badges, banners — the interface has become a crowded room where every object demands the floor.",
            "Quiet computing proposes the opposite: environments that wait. A spatial interface that reveals its depth only when the user slows down.",
            "The result is not emptiness. It is a room where the few things present are finally audible.",
        ],
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop",
        category: "Architecture",
        date: "Oct 24, 2024",
        readTime: "8 min read",
        price: "Free . UGX 0",
        isFree: true,
        title: "Quiet Computing & The Architecture of Cognitive Silence",
        description: "An inquiry into computational environments that honor human attention spans...",
        content: [
            "We spend our days inside machines that never stop talking. Notifications, badges, banners — the interface has become a crowded room where every object demands the floor.",
            "Quiet computing proposes the opposite: environments that wait. A spatial interface that reveals its depth only when the user slows down.",
            "The result is not emptiness. It is a room where the few things present are finally audible.",
        ],
    },
    {
        id: 4,
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop",
        category: "Architecture",
        date: "Oct 24, 2024",
        readTime: "8 min read",
        price: "Free . UGX 0",
        isFree: true,
        title: "Quiet Computing & The Architecture of Cognitive Silence",
        description: "An inquiry into computational environments that honor human attention spans...",
        content: [
            "We spend our days inside machines that never stop talking. Notifications, badges, banners — the interface has become a crowded room where every object demands the floor.",
            "Quiet computing proposes the opposite: environments that wait. A spatial interface that reveals its depth only when the user slows down.",
            "The result is not emptiness. It is a room where the few things present are finally audible.",
        ],
    },
    {
        id: 5,
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop",
        category: "Architecture",
        date: "Oct 24, 2024",
        readTime: "8 min read",
        price: "Free . UGX 0",
        isFree: true,
        title: "Quiet Computing & The Architecture of Cognitive Silence",
        description: "An inquiry into computational environments that honor human attention spans...",
        content: [
            "We spend our days inside machines that never stop talking. Notifications, badges, banners — the interface has become a crowded room where every object demands the floor.",
            "Quiet computing proposes the opposite: environments that wait. A spatial interface that reveals its depth only when the user slows down.",
            "The result is not emptiness. It is a room where the few things present are finally audible.",
        ],
    },
    {
        id: 6,
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop",
        category: "Architecture",
        date: "Oct 24, 2024",
        readTime: "8 min read",
        price: "Free . UGX 0",
        isFree: true,
        title: "Quiet Computing & The Architecture of Cognitive Silence",
        description: "An inquiry into computational environments that honor human attention spans...",
        content: [
            "We spend our days inside machines that never stop talking. Notifications, badges, banners — the interface has become a crowded room where every object demands the floor.",
            "Quiet computing proposes the opposite: environments that wait. A spatial interface that reveals its depth only when the user slows down.",
            "The result is not emptiness. It is a room where the few things present are finally audible.",
        ],
    },
    {
        id: 7,
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop",
        category: "Architecture",
        date: "Oct 24, 2024",
        readTime: "8 min read",
        price: "Free . UGX 0",
        isFree: true,
        title: "Quiet Computing & The Architecture of Cognitive Silence",
        description: "An inquiry into computational environments that honor human attention spans...",
        content: [
            "We spend our days inside machines that never stop talking. Notifications, badges, banners — the interface has become a crowded room where every object demands the floor.",
            "Quiet computing proposes the opposite: environments that wait. A spatial interface that reveals its depth only when the user slows down.",
            "The result is not emptiness. It is a room where the few things present are finally audible.",
        ],
    },
    {
        id: 8,
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop",
        category: "Architecture",
        date: "Oct 24, 2024",
        readTime: "8 min read",
        price: "Free . UGX 0",
        isFree: true,
        title: "Quiet Computing & The Architecture of Cognitive Silence",
        description: "An inquiry into computational environments that honor human attention spans...",
        content: [
            "We spend our days inside machines that never stop talking. Notifications, badges, banners — the interface has become a crowded room where every object demands the floor.",
            "Quiet computing proposes the opposite: environments that wait. A spatial interface that reveals its depth only when the user slows down.",
            "The result is not emptiness. It is a room where the few things present are finally audible.",
        ],
    },
    {
        id: 9,
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop",
        category: "Architecture",
        date: "Oct 24, 2024",
        readTime: "8 min read",
        price: "Free . UGX 0",
        isFree: true,
        title: "Quiet Computing & The Architecture of Cognitive Silence",
        description: "An inquiry into computational environments that honor human attention spans...",
        content: [
            "We spend our days inside machines that never stop talking. Notifications, badges, banners — the interface has become a crowded room where every object demands the floor.",
            "Quiet computing proposes the opposite: environments that wait. A spatial interface that reveals its depth only when the user slows down.",
            "The result is not emptiness. It is a room where the few things present are finally audible.",
        ],
    },
    {
        id: 10,
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop",
        category: "Architecture",
        date: "Oct 24, 2024",
        readTime: "8 min read",
        price: "Free . UGX 0",
        isFree: true,
        title: "Quiet Computing & The Architecture of Cognitive Silence",
        description: "An inquiry into computational environments that honor human attention spans...",
        content: [
            "We spend our days inside machines that never stop talking. Notifications, badges, banners — the interface has become a crowded room where every object demands the floor.",
            "Quiet computing proposes the opposite: environments that wait. A spatial interface that reveals its depth only when the user slows down.",
            "The result is not emptiness. It is a room where the few things present are finally audible.",
        ],
    },
];