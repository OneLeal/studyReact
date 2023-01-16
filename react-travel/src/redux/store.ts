import { createStore, combineReducers } from "redux"; // FIXME: 使用 toolkit
import { initLanguageReducer } from "./language/languageReducer";
import { initRecommendProductsReducer } from "./recommendProducts/recommendProductsReducer";

// 收集所有的 reducer
const collectReducer = {
  language: initLanguageReducer,
  recommendProducts: initRecommendProductsReducer,
};

const rootReducer = combineReducers(collectReducer); // 糅合所有的 reducer
const store = createStore(rootReducer); // 创建数据仓库
export type RootState = ReturnType<typeof store.getState>; // 导出 store 类型
export default store;
