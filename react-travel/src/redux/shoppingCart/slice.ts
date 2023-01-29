import axios from "axios";
import {
  shoppingCartList,
  delGoodsInShoppingCart,
  addGoodsInShoppingCart,
} from "../../api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface shoppingCartType {
  loading: boolean;
  error: string | null;
  list: any[];
}

const initialState: shoppingCartType = {
  loading: false,
  error: null,
  list: [],
};

// 获取购物车列表
const fetchShoppingCartList = createAsyncThunk(
  "shoppingCart/fetchShoppingCartList",
  async (jwt: string, thunkAPI) => {
    const headers = { Authorization: `bearer ${jwt}` };
    const { data } = await axios.get(shoppingCartList, { headers });
    return data.shoppingCartItems;
  }
);

// 删除购物车中的商品
const delShoppingCart = createAsyncThunk(
  "shoppingCart/delShoppingCart",
  async (params: { jwt: string; list: number[] }) => {
    const listStr = params.list.join(",");
    const url = `${delGoodsInShoppingCart}${listStr}`;
    const headers = { Authorization: `bearer ${params.jwt}` };
    return await axios.delete(url, { headers });
  }
);

// 添加商品到购物车
const addShoppingCart = createAsyncThunk(
  "shoppingCart/addShoppingCart",
  async (params: { jwt: string; id: string }, thunkAPI) => {
    const headers = { Authorization: `bearer ${params.jwt}` };
    const body = { touristRouteId: params.id };
    const { data } = await axios.post(addGoodsInShoppingCart, body, {
      headers,
    });
    return data.shoppingCartItems;
  }
);

export const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchShoppingCartList.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchShoppingCartList.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.list = action.payload;
      })
      .addCase(fetchShoppingCartList.rejected, (state, action) => {
        state.loading = false;
        state.list = [];

        const ErrorInfo = action.payload;
        if (ErrorInfo instanceof Error) {
          state.error = ErrorInfo.message || "购物车列表获取失败！";
        }
      })
      .addCase(delShoppingCart.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(delShoppingCart.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.list = [];
      })
      .addCase(delShoppingCart.rejected, (state, action) => {
        state.loading = false;

        const ErrorInfo = action.payload;
        if (ErrorInfo instanceof Error) {
          state.error = ErrorInfo.message || "删除商品失败！";
        }
      })
      .addCase(addShoppingCart.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addShoppingCart.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.list = action.payload;
      })
      .addCase(addShoppingCart.rejected, (state, action) => {
        state.loading = false;

        const ErrorInfo = action.payload;
        if (ErrorInfo instanceof Error) {
          state.error = ErrorInfo.message || "添加商品到购物车失败！";
        }
      });
  },
});
