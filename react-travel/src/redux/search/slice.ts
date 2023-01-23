import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { searchInfo } from "../../api";

interface SearchInfoState {
  loading: boolean;
  error: string | null;
  data: any;
  pagination: any;
}

const initialState: SearchInfoState = {
  loading: false,
  error: null,
  data: [],
  pagination: {},
};

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

export const searchInfoSlice = createSlice({
  name: "searchInfo",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchSearchInfo.pending.type]: (state) => {
      state.loading = true;
    },

    [fetchSearchInfo.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.data = action.payload.data;
      state.pagination = action.payload.pagination;
    },

    [fetchSearchInfo.rejected.type]: (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.payload;
    },
  },
});
