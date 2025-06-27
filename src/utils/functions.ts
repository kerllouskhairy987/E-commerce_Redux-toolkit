import type { IProduct } from "../interfaces";

export const addItemToShoppingCart = (cartItems: IProduct[], product: IProduct) => {
    const exists = cartItems.find(item => item.id === product.id);

    if (exists) {
        return cartItems.map(item => item.id === product.id ? { ...product, quantity: item.quantity + 1 } : item);
    }

    return [...cartItems, { ...product, quantity: 1 }];

}