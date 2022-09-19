import {createSlice} from "@reduxjs/toolkit"
import axios  from "axios"
import {API} from "../../API"

const Slice=createSlice({
    name:"cart",
    initialState:{
        products:[],
        count:0 ,
        price:0
    },
    reducers:{
        setProducts:(state,actions)=>{
            state.products =actions.payload.products
            //selectProduct
            state.count =actions.payload.count
            //countProductSelected
            state.price =actions.payload.totalPrice
        }
    }
})

export const {setProducts} =Slice.actions
export default Slice.reducer