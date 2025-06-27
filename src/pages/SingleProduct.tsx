import { Link, useLoaderData } from "react-router";
import Button from "../ui/Button";
import type { IReview } from "../interfaces";
import { useAppDispatch } from "../app/store";
import { addProductToCart } from "../app/feature/cart/CartSlice";

const SingleProduct = () => {
    const product = useLoaderData();
    const dispatch = useAppDispatch();

    const renderReviews = product.reviews.map(({ comment, rating, reviewerEmail, reviewerName }: IReview) => {
        const roundedRating = Math.round(rating)
        return (
            <div key={reviewerEmail} className="w-fit border border-gray-300  p-5 rounded grow">
                <h2 className="font-semibold text-xl">{reviewerName}</h2>
                <p className="font-semibold text-2xl">{comment}</p>
                <div className="flex mt-3 gap-1">
                    {Array.from({ length: 5 }).map((_, index) => (
                            <svg
                                key={index}
                                className={`w-4 h-4 ${index < roundedRating ? 'text-yellow-300' : 'text-gray-300 dark:text-gray-500'}`}
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 22 20"
                            >
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                            </svg>
                        ))}
                </div>
            </div>
        )
    })

    return (
        <div className=" p-5">
            <Link to={"/"}>
                <Button type="button">⬅️ Go Back</Button>
            </Link>
            <div className="mx-auto mt-7 max-w-md w-full bg-white rounded-xl shadow-lg border border-gray-300 p-6">
                <h1 className="text-2xl font-bold text-center mb-4">{product.title}</h1>

                <div className="flex justify-center">
                    <img src={product.thumbnail} alt={product.title} className="w-48 h-auto rounded-md" />
                </div>

                <p className="mt-4 text-gray-700">{product.description}</p>
                <div className="flex justify-between items-center">
                    <p className="text-green-600 font-semibold text-lg mt-3 text-center">${product.price}</p>
                    <Button type="button" onClick={() => dispatch(addProductToCart(product))}>Add to Cart </Button>
                </div>
            </div>

            <h2 className="font-bold text-xl mt-5">OUR REVIEWS</h2>
            <div className="flex flex-wrap items-center justify-start gap-4 mt-5">
                {renderReviews}
            </div>
        </div>
    );
};

export default SingleProduct;