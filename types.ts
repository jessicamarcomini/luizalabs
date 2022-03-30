export type Customer = {
    name: string;
    email: string;
    _id?: any;
}

export type Wishlist = {
    email: string;
    productIds: string[];
}