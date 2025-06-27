import { createBrowserRouter } from "react-router";
import Home from "../pages/Index";
import PageNotFound from "../pages/PageNotFound";
import RootLayout from "../pages/Root";
import CartItems from "../pages/CartItems";
import SingleProduct from "../pages/SingleProduct";
import axiosInstance from "../config/axios.config";

const fetchProduct = async (productId: string) => {
    const response = await axiosInstance.get(`/products/${productId}`);
    return response.data
}

export const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            { index: true, Component: Home },
            { path: "cartItems", Component: CartItems },
            { path: "*", Component: () => <PageNotFound statusCode={500} /> },
        ],
    },
    {
        path: "/products/:productId",
        loader: async ({ params }) => {
            if (!params.productId) throw new Response("Product ID not found", { status: 404 });
            const product = await fetchProduct(params.productId);
            return product;
        },
        Component: SingleProduct,
    },
]);
