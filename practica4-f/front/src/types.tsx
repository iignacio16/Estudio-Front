export type Author = {
    name: string;
    books: Book[];
    createdAt: Date;
    _id: string;
};

export type Book = {
    title: string;
    author: Author;
    pages: number;
    createdAt: Date;
    _id: string;
};

export type User = {
    name: string;
    email: string;
    password: string;
    cart: Book[];
    id: string;
}