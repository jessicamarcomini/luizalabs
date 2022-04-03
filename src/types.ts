export type Customer = {
    name: string;
    email: string;
    _id?: any;
}

export type Wishlist = {
    email: string;
    productIds: string[];
}

export type Product = {
    price: number;
    image: string;
    brand: string;
    id: string;
    title: string;
    reviewScore: number;
}