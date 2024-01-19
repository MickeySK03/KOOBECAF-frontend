import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "../../config/axios";

export const subscribe = createAsyncThunk("payment/subscribe", async (lookup_key, thunkAPI) => {
    try {
        const res = await axios.post("/payment", { lookup_key });
        return res.data;
    } catch (error) {
        toast.error(error.response.data.message);
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const createSubscribe = createAsyncThunk("payment/createSubscribe", async (transactionId, thunkAPI) => {
    try {
        const res = await axios.post(`/payment/${transactionId}`);
        return res.data;
    } catch (error) {
        toast.error(error.response.data.message);
        return thunkAPI.rejectWithValue(error.message);
    }
});

const paymentSlice = createSlice({
    name: "payment",
    initialState: {
        paymentData: null,
        loading: false,
        error: "",
        success: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(subscribe.pending, (state, { payload }) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(subscribe.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(subscribe.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            });

        builder
            .addCase(createSubscribe.pending, (state, { payload }) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(createSubscribe.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(createSubscribe.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            });
    },
});

export default paymentSlice.reducer;
