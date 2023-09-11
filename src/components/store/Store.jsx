import authSlice from "../Auth/AuthSlice"
import { configureStore } from "@reduxjs/toolkit";

const Store =  configureStore({
    reducer : {auth:authSlice.reducer}
})
export default Store