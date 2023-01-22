import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import { initLanguageReducer } from "./language/languageReducer";
import { initRecommendProductsReducer } from "./recommendProducts/recommendProductsReducer";
import { productInfoSlice } from "./productInfo/slice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

// 收集所有的 reducer
const collectReducer = {
  language: initLanguageReducer,
  recommendProducts: initRecommendProductsReducer,
  productInfo: productInfoSlice.reducer,
};

const rootReducer = combineReducers(collectReducer); // 糅合所有的 reducer
const store = createStore(rootReducer, applyMiddleware(thunk)); // 创建数据仓库
export type RootState = ReturnType<typeof store.getState>; // 导出 store 类型
export default store;
