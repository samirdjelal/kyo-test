import {configureStore} from "@reduxjs/toolkit";
import TodosSlice from './TodosSlice'
import AuthSlice from "./AuthSlice";

export default configureStore({
    reducer: {
        auth: AuthSlice,
        todos: TodosSlice
    }
})
