import { createSlice } from "@reduxjs/toolkit";
const initialState={
    items:[],
    totalPrice:0
}
export const cartSlice =createSlice({
    name:"cart",
    initialState,
    reducers:{
        addToCart:(state,action)=>{
            state.items.push(action.payload)
        },
        removeFromCart:(state,action)=>{
            const itemId=action.payload
            let removed =false;
            state.items=state.items.filter((item)=>{
                if(!removed && item.id===itemId){
                    removed=true;
                    return false;
                }
                return true
            })
        },
        calcTotal:(state)=>{
            let total=0
            state.items.forEach((item)=>{
                total+=item.price;
            })
            state.totalPrice=total;
        }
    }
})