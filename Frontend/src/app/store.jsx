import { configureStore } from '@reduxjs/toolkit'
import todoReducer from '../features/todos/todoSlice.jsx'
import userReducer from "../features/users/users.jsx"

export const store = configureStore({
    reducer: {
        todo: todoReducer,
        user: userReducer,
    },
})
