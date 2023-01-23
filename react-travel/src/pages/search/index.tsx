import React from "react";
import styles from "./index.module.css";
import { Header } from "../../components/header";
import { Footer } from "../../components/footer";
import { useParams } from "react-router-dom";

export const SearchPage: React.FC = () => {
  const params = useParams();
  console.log("搜索页面: ", params.keywords);
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
