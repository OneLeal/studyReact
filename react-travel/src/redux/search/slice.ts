import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { searchInfo } from "../../api";

// state 数据类型
interface SearchInfoState {
  loading: boolean;
  error: string | null;
  data: any;
  pagination: any;
}

// state 初始值设置
const initialState: SearchInfoState = {
  loading: false,
  error: null,
  data: [],
  pagination: {},
};

// 异步请求
export const fetchSearchInfo = createAsyncThunk(
  "searchInfo/fetchSearchInfo",
  async (
    params: { keywords: string; page: number; pageSize: number },
    thunkAPI
  ) => {
    const { keywords, page, pageSize } = params;
    let url = `${searchInfo}?pageNumber=${page}&pagesize=${pageSize}`;
    keywords && (url += `&keyword=${keywords}`);
    const { data, headers } = await axios.get(url);
    return {
      data,
      pagination: JSON.parse(headers["x-pagination"] || ""),
    };
  }
);

// 创建 slice
export const searchInfoSlice = createSlice({
  name: "searchInfo",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchSearchInfo.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchSearchInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.data = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchSearchInfo.rejected, (state, action) => {
        state.loading = false;
        state.data = [];

        const ErrorInfo = action.payload;
        if (ErrorInfo instanceof Error) {
          state.error = ErrorInfo.message || "请求异常！";
        }
      });
  },
  //   extraReducers: {
  //     [fetchSearchInfo.pending.type]: (state) => {
  //       state.loading = true;
  //     },

  //     [fetchSearchInfo.fulfilled.type]: (state, action) => {
  //       state.loading = false;
  //       state.error = null;
  //       state.data = action.payload.data;
  //       state.pagination = action.payload.pagination;
  //     },

  //     [fetchSearchInfo.rejected.type]: (state, action) => {
  //       state.loading = false;
  //       state.data = [];
  //       state.error = action.payload;
  //     },
  //   },
});
