// import thunk from "redux-thunk";
// import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { initLanguageReducer } from "./language/languageReducer";
import { initRecommendProductsReducer } from "./recommendProducts/recommendProductsReducer";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { productInfoSlice } from "./productInfo/slice";
import { searchInfoSlice } from "./search/slice";
import { signInSlice } from "./signIn/slice";
import storage from "redux-persist/lib/storage";

// 数据持久化配置
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["signIn"],
};

// 收集所有的 reducer
const collectReducer = {
  language: initLanguageReducer,
  recommendProducts: initRecommendProductsReducer,
  productInfo: productInfoSlice.reducer,
  searchInfo: searchInfoSlice.reducer,
  signIn: signInSlice.reducer,
};

const rootReducer = combineReducers(collectReducer); // 糅合所有的 reducer
const persistedReducer = persistReducer(persistConfig, rootReducer); // 建立持久化 reducer
// const store = createStore(rootReducer, applyMiddleware(thunk)); // 创建数据仓库

// 在 redux/toolkit 支持下使用 configureStore 创建数据仓库
const store = configureStore({
  reducer: persistedReducer, // rootReducer | persistedReducer(持久化存储)

  // 可选参数: 合并其他的自定义中间件
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(中间件名称),

  // 可选参数: devTools 开发工具是否启用
  // devTools: true,
});

const persistor = persistStore(store); // 建立持久化数据仓库
export type RootState = ReturnType<typeof store.getState>; // 导出 store 类型
export type AppDispatch = typeof store.dispatch; // 导出 dispatch 类型

// eslint-disable-next-line import/no-anonymous-default-export
export default { store, persistor };
