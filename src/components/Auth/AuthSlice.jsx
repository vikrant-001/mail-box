import { createSlice } from "@reduxjs/toolkit";

const initialToken = localStorage.getItem('token');
const authInitialState = {token:initialToken};

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
        }
    }
})

export default authSlice;
export const  authActions = authSlice.actions;