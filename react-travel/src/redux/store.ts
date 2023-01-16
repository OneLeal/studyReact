import { createStore } from "redux"; // FIXME: 使用 toolkit
import { initLanguageReducer } from "./language/languageReducer";

const store = createStore(initLanguageReducer);
export type RootState = ReturnType<typeof store.getState>;
export default store;
