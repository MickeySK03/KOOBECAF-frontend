import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../config/axios";

export const createChat = createAsyncThunk("/chat/message", async (data, thunkAPI) => {
    try {
        const res = await axios.post("/inbox/chat", data);
        return res.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const getSellInbox = createAsyncThunk("/inbox/sell", async (data, thunkAPI) => {
    try {
        const res = await axios.get("/inbox/getSellInbox", data);
        return res.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const getInbox = createAsyncThunk("/inbox/buy", async (data, thunkAPI) => {
    try {
        const res = await axios.get("/inbox/getBuyInbox", data);
        return res.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const getAllMessage = createAsyncThunk("/inbox/getAllMessage", async (payload, thunkAPI) => {
    try {
        const res = await axios.get(`/inbox/getAllMyMessage/${payload.productId}/${payload.receiverId}`);
        return res.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

const chatSlice = createSlice({
    name: "chat",
    initialState: {
        inputChat: {},
        userInbox: null,
        allMessage: null,
        loading: false,
        error: "",
        success: false,
    },
    reducers: {
        setInputChat: (state, actions) => {
            state.inputChat = actions.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getSellInbox.pending, (state, { payload }) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(getSellInbox.fulfilled, (state, { payload }) => {
                state.userInbox = payload.getInbox;
                state.loading = false;
                state.success = true;
            })
            .addCase(getSellInbox.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            });
        builder
            .addCase(getInbox.pending, (state, { payload }) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(getInbox.fulfilled, (state, { payload }) => {
                state.userInbox = payload.getInbox;
                state.loading = false;
                state.success = true;
            })
            .addCase(getInbox.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            });
        builder
            .addCase(getAllMessage.pending, (state, { payload }) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(getAllMessage.fulfilled, (state, { payload }) => {
                state.allMessage = payload.message;
                state.loading = false;
                state.success = true;
            })
            .addCase(getAllMessage.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            });
    },
});

export const { setInputChat } = chatSlice.actions;

export default chatSlice.reducer;
