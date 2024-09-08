import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchTodos = createAsyncThunk("fetchTodos", async () => {

    const response = await fetch("https://jsonplaceholder.typicode.com/todos");

    return response.json();
})

const initialState = {
    isLoading: true,
    isError: false,
    data: null,
}

export const todoSlice = createSlice({
    name: 'todo',
    initialState,

    extraReducers: (builder) => {

        builder.addCase(fetchTodos.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        });

        builder.addCase(fetchTodos.pending, (state, action) => {
            state.isLoading = true;
        })

        builder.addCase(fetchTodos.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
        })

    },
    reducers: {

        addTodo: (state, action) => {
            state.todos = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { addTodo } = todoSlice.actions

export default todoSlice.reducer