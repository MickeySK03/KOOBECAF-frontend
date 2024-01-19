import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllCategory = createAsyncThunk("category/fetchAllCategories", async (payload, thunkAPI) => {
    try {
        const res = await axios.get("/category/allCategory");
        return res.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

const categorySlice = createSlice({
    name: "category",
    initialState: {
        categoryData: null,
        loading: false,
        error: "",
        success: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllCategory.pending, (state, { payload }) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(fetchAllCategory.fulfilled, (state, { payload }) => {
                state.categoryData = payload.allCategory;
                state.loading = false;
                state.success = true;
            })
            .addCase(fetchAllCategory.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            });
    },
});

export default categorySlice.reducer;
