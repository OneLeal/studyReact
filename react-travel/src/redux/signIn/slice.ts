import axios from "axios";
import { login } from "../../api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface SignInStateType {
  loading: boolean;
  error: string | null;
  token: string;
}

const initialState: SignInStateType = {
  loading: false,
  error: null,
  token: "",
};

export const signInRequest = createAsyncThunk(
  "signIn/signInRequest",
  async (params: { email: string; password: string }, thunkAPI) => {
    const { data } = await axios.post(login, {
      email: params.email,
      password: params.password,
    });
    return data.token;
  }
);

export const signInSlice = createSlice({
  name: "signIn",
  initialState,
  reducers: {
    logOut: (state) => {
      state.loading = false;
      state.error = null;
      state.token = "";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(signInRequest.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(signInRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.token = action.payload;
      })
      .addCase(signInRequest.rejected, (state, action) => {
        state.loading = false;
        state.token = "";

        const ErrorInfo = action.payload;
        if (ErrorInfo instanceof Error) {
          state.error = ErrorInfo.message || "登录异常！";
        }
      });
  },
});
