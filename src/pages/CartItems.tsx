import { useSelector } from "react-redux";
import { addProductToCart, decreaseCartProduct, deleteProduct } from "../app/feature/cart/CartSlice";
import type { IProduct } from "../interfaces";
import Button from "../ui/Button";
import { useAppDispatch, type RootState } from "../app/store";

const CartItems = () => {
    const { productCart } = useSelector(({ cart }: RootState) => cart);
    const dispatch = useAppDispatch()

    const renderProduct = productCart.map((product: IProduct) => {
        const { id, price, rating, thumbnail, title, quantity } = product;
        const roundedRating = Math.round(rating);

        return (
            <div key={id} className="flex gap-5 items-center justify-between border p-3 even:bg-gray-300 mb-4 hover:bg-gray-300 rounded">
                <div className="flex gap-5">
                    <img className="w-20" src={thumbnail} alt="product image" />
                    <div className="flex flex-col justify-center">
                        <h1 className="font-semibold text-xl">{title}</h1>
                        <div className="flex items-center space-x-1 rtl:space-x-reverse">
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
                        <p>$ {price}</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <Button type="button" className="bg-green-600" onClick={() => dispatch(addProductToCart(product))}>+</Button>
                    <span className="bg-green-500 w-10 h-10 rounded-full flex items-center justify-center font-bold text-2xl text-white">{quantity}</span>
                    <Button type="button" className="bg-red-500" onClick={() => dispatch(decreaseCartProduct({ id, quantity }))}>-</Button>
                    <Button type="button" className="bg-red-600" onClick={() => dispatch(deleteProduct({ id }))}>Delete</Button>
                </div>
            </div>
        );
    });

    if (productCart.length === 0) {
        return (
            <div className="container mx-auto px-2 mt-10">
                <p className="text-center text-2xl font-semibold">Your cart is empty</p>
                <img className="mx-auto" src="https://static.vecteezy.com/system/resources/thumbnails/008/515/488/small_2x/empty-cart-flat-illustration-concept-vector.jpg" alt="Empty cart image" />
            </div>
        )
    }

    const totalPrice = productCart.reduce((total, product) => total + product.price * product.quantity, 0);
    return (
        <div className="container mx-auto px-2 mt-10">
            {renderProduct}

            <div className="text-center font-bold text-2xl mx-auto ">
                <span>Total Price: {totalPrice.toFixed(2)}</span>
            </div>
        </div>
    );
};

export default CartItems;
