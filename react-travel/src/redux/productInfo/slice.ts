import { createSlice } from "@reduxjs/toolkit";

interface ProductInfoState {
  loading: boolean;
  error: string | null;
  data: any;
}

const initialState: ProductInfoState = {
  loading: true,
  error: null,
  data: null,
};

export const productInfoSlice = createSlice({
  name: "productInfo",
  initialState,
  reducers: {
    // 请求数据-开始
    fetchDataStart: (state) => {
      state.loading = true;
    },

    // 请求数据-成功
    fetchDataSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    },

    // 请求数据-失败
    fetchDataFailed: (state, action) => {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
    },
  },
});
