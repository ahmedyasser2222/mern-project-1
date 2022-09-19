import {createSlice} from "@reduxjs/toolkit"

const Slice=createSlice({
    name:"user",
    initialState:{
        loading:false,
        user:null,
        error:false
    },
    reducers:{
        loginStart:(state)=>{
            state.loading=true
        },
        loginSuccess:(state ,action)=>{
            state.loading=false
            state.user=action.payload
        },
        loginFaild:(state)=>{
            state.loading=false 
            state.error=true
        },
        logout:(state)=>{
            state.user=null
        }
    }
})

export const {loginFaild ,loginStart ,loginSuccess ,logout} =Slice.actions
export default Slice.reducer