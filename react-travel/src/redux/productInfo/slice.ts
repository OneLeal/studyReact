import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { productInfo } from "../../api/";

// 默认数据接口
interface ProductInfoState {
  loading: boolean;
  error: string | null;
  data: any;
}

// 设置默认数据
const initialState: ProductInfoState = {
  loading: true,
  error: null,
  data: null,
};

// 异步请求: 根据产品 id 获取产品详情
export const fetchProductInfo = createAsyncThunk(
  "productInfo/fetchProductInfo",
  async (id: string, thunkAPI) => {
    const url = productInfo + id;
    const { data } = await axios.get(url);
    return data;
  }
);

export const productInfoSlice = createSlice({
  name: "productInfo", // 命名空间
  initialState, // 默认数据初始化

  // 处理同步方法
  reducers: {
    test: (state) => {
      console.log("测试: ", state.data, state.error, state.loading);
    },
  },

  // 处理异步方法
  extraReducers: {
    // 请求数据-开始
    [fetchProductInfo.pending.type]: (state) => {
      state.loading = true;
    },

    // 请求数据-成功
    [fetchProductInfo.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    },

    // 请求数据-失败
    [fetchProductInfo.rejected.type]: (state, action) => {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
    },
  },
});
