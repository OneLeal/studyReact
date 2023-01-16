import i18n from "i18next";
import {
  CHANGE_LANGUAGE,
  ADD_LANGUAGE,
  LanguageActionTypes,
} from "./languageActions";

export interface LanguageState {
  language: "en" | "zh";
  languageList: { name: string; code: string }[];
}

// 设置初始化数据
const defaultState: LanguageState = {
  language: "zh",
  languageList: [
    { name: "中 文", code: "zh" },
    { name: "English", code: "en" },
    // { name: "新语言", code: "add" },
  ],
};

export const initLanguageReducer = (
  state = defaultState,
  action: LanguageActionTypes
) => {
  const { type, payload } = action;

  switch (type) {
    // 言语切换
    case CHANGE_LANGUAGE:
      i18n.changeLanguage(payload); // FIXME: 使用中间件消除副作用
      return { ...state, language: payload };

    // 新增语言
    case ADD_LANGUAGE:
      return { ...state, languageList: [...state.languageList, payload] };

    // 初始化设置
    default:
      return state;
  }
};
