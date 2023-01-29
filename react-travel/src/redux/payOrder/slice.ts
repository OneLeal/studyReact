import axios from "axios";
import { payOrderApi } from "../../api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { payShoppingCartGoods } from "../shoppingCart/slice";

interface PayOrderType {
  loading: boolean;
  error: null | string;
  currentOrder: any;
}

const initialState: PayOrderType = {
  loading: false,
  error: null,
  currentOrder: null,
};

export const handlePayOrder = createAsyncThunk(
  "payOrder/handlePayOrder",
  async (params: { jwt: string; orderId: string }, thunkAPI) => {
    const url = payOrderApi(params.orderId);
    const headers = { Authorization: `bearer ${params.jwt}` };
    const { data } = await axios.post(url, headers);
    return data;
  }
);

export const payOrderSlice = createSlice({
  name: "payOrder",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(handlePayOrder.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(handlePayOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(handlePayOrder.rejected, (state, action) => {
        state.loading = false;

        const ErrorInfo = action.payload;
        if (ErrorInfo instanceof Error) {
          state.error = ErrorInfo.message || "订单支付失败！";
        }
      })
      .addCase(payShoppingCartGoods.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(payShoppingCartGoods.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.currentOrder = action.payload;
      })
      .addCase(payShoppingCartGoods.rejected, (state, action) => {
        state.loading = false;

        const ErrorInfo = action.payload;
        if (ErrorInfo instanceof Error) {
          state.error = ErrorInfo.message || "商品结算失败！";
        }
      });
  },
});
