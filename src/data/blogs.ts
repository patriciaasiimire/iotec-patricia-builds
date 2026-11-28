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
    
];