import i18n from "i18next";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface languageType {
  language: "en" | "zh";
  languageList: { name: string; code: string }[];
}

const initialState: languageType = {
  language: "zh",
  languageList: [
    { name: "中 文", code: "zh" },
    { name: "English", code: "en" },
    // { name: "新语言", code: "add" },
  ],
};

export const handleLanguageChange = createAsyncThunk(
  "languageChange/handleLanguageChange",
  (code: string, thunkAPI) => {
    i18n.changeLanguage(code);
    thunkAPI.dispatch(languageChangeSlice.actions.change_language(code));
  }
);

export const languageChangeSlice = createSlice({
  name: "languageChange",
  initialState,
  reducers: {
    change_language: (state, action) => {
      state.language = action.payload;
    },
    add_language: (state, action) => {
      state.languageList.push(action.payload);
    },
  },
});
