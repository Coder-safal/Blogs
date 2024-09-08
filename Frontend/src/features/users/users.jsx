
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchUser = createAsyncThunk("fetchUser", async (details) => {

    const response = await fetch("http://localhost:8000/api/blogs/v1/users/login",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(details),
        }
    );

    return response.json();
})

const initialState = {
    isLoading: false,
    isError: false,
    data: null,
}
const userSlice = createSlice({
    name: "userRedux",
    initialState,

    extraReducers: (builder) => {

        builder.addCase(fetchUser.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        })

        builder.addCase(fetchUser.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = false;
            state.data = null;
        })

    }
})


export default userSlice.reducer;