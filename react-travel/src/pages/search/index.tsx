import React from "react";
import styles from "./index.module.css";
import { Header } from "../../components/header";
import { Footer } from "../../components/footer";

export const SearchPage: React.FC = () => {
  return (
    <div>
      <Header></Header>

      <div className={styles["page-content"]}>
        {/* 分类过滤器 */}
        <div className={styles["product-list-container"]}></div>

        {/* 产品列表 */}
        <div className={styles["product-list-container"]}></div>
      </div>

      <Footer></Footer>
    </div>
  );
};
