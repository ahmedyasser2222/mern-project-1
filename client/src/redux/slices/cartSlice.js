import {createSlice} from "@reduxjs/toolkit"
import axios  from "axios"
import {API} from "../../API"
const Slice=createSlice({
    name:"cart",
    initialState:{
        count_cart:0,
    },
    reducers:{
        increament:(state)=>{
            state.count_cart +=1
        },
        decreament:(state)=>{
            if(state.count_cart <= 0) return state.count_cart =0
            state.count_cart -=1
        },
        setCountCart:(state,actions)=>{
            state.count_cart =actions.payload
            //console.log(actions.payload)
        }
    }
})

export const {increament ,decreament ,setCountCart} =Slice.actions
export default Slice.reducer