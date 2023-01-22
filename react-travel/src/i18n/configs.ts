import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translation_en from "./en.json";
import translation_zh from "./zh.json";

// 配置语言代码所映射的资源文件
const resources = {
  en: { translation: translation_en },
  zh: { translation: translation_zh },
};

// 配置国际化参数
const opts = { resources, lng: "zh", interpolation: { escapeValue: false } };

i18n.use(initReactI18next).init(opts);
export default i18n;
