import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { IProduct } from '../../../interfaces'
import { addItemToShoppingCart } from '../../../utils/functions'
import toast from 'react-hot-toast'
interface CartState {
    productCart: IProduct[],
}

const initialState: CartState = {
    productCart: []
}

export const CartSlice = createSlice({
    name: 'cartItems',
    initialState,
    reducers: {
        addProductToCart: (state, actionPayload: PayloadAction<IProduct>) => {
            state.productCart = addItemToShoppingCart(state.productCart, actionPayload.payload);
            toast.success('added to your cart successfully!.')
        },
        
        decreaseCartProduct: (state, action: PayloadAction<{ id: number, quantity: number }>) => {
            const { id, quantity } = action.payload;
            const product = state.productCart.find((item) => item.id === id);
            if(quantity < 2) return
            if (product) {
                product.quantity = quantity - 1;
                toast.success('remove one items of your product!.')
            }
        },
        
        deleteProduct: (state, action: PayloadAction<{ id: number }>) => {
            const { id } = action.payload;
            state.productCart = state.productCart.filter((item) => item.id !== id);
            toast.success('deleted product successfully!.')
        }
    },
})

// eslint-disable-next-line react-refresh/only-export-components
export const { addProductToCart, decreaseCartProduct, deleteProduct } = CartSlice.actions

export default CartSlice.reducer