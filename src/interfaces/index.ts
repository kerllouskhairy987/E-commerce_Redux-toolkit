export interface IReview {
    reviewerEmail: string,
    rating: number,
    comment: string;
    reviewerName: string;
}
export interface IProduct {
    id: number,
    thumbnail: string;
    title: string;
    price: number;
    rating: number;
    quantity: number;
}
