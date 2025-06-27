import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import CartSlice from './feature/cart/CartSlice'

const store = configureStore({
    reducer: {
        cart: CartSlice
    },
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>() 

export default store