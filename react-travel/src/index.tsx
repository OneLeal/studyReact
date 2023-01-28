import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "antd/dist/reset.css";
import { Provider } from "react-redux";
import allStore from "./redux/store";
import "./i18n/configs";
import axios from "axios";
import { PersistGate } from "redux-persist/integration/react";

// 设置请求头
axios.defaults.headers["x-icode"] = "6A2E42F4DD82E0AD"; // 身份验证信息(有效期一个月)

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={allStore.store}>
      <PersistGate persistor={allStore.persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
