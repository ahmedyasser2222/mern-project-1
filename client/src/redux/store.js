import {configureStore} from "@reduxjs/toolkit"
import userSlice from "./slices/userSlice"
import cartSlice from "./slices/cartSlice"

export const  Store=configureStore({
   reducer:{
    user:userSlice,
    cart:cartSlice,
   }
})