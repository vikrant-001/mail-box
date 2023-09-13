import { createSlice } from "@reduxjs/toolkit";

const initialToken = localStorage.getItem('token');
const authInitialState = {token:initialToken ,itemView:{}};

const authSlice = createSlice({
    name:'auth',
    initialState:authInitialState,
    reducers:{
        login(state,action){
            state.token = action.payload
            localStorage.setItem('token',action.payload)
        },

        logout(state) {
            state.token = null
            localStorage.removeItem('token');
        },
        setItem(state,action){
            state.itemView = action.payload;
        }
    }
})

export default authSlice;
export const  authActions = authSlice.actions;