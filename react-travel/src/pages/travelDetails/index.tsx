import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./index.module.css";
import stylesCommon from "../../styles/index.module.css";
import { productInfo } from "../../api/";
import { useParams } from "react-router-dom";
import { Header } from "../../components/header";
import { Footer } from "../../components/footer";
import { Row, Col, Spin } from "antd";

// 设置路由参数类型
type ParamsKeys = {
  travelId: string;
  title?: string;
};

export const TravelDetails: React.FC = () => {
  const params = useParams<ParamsKeys>();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const http = async () => {
      const id = params.travelId;
      const url = productInfo + id;
      setLoading(true);

      try {
        const { data } = await axios.get(url);
        console.log("产品详情: ", data);
        setProduct(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message || "获取产品详情失败！");
        }
      } finally {
        setLoading(false);
      }
    };
    http();
  }, []);

  if (loading) {
    return <Spin className={stylesCommon["common-spin"]} size="large" />;
  }

  if (error) {
    return <div>网站出错: {error}</div>;
  }

  return (
    <div>
      <Header />

      <div className={styles["page-content"]}>
        <div className={styles["product-intro-container"]}></div>

        <div className={styles["product-detail-anchor"]}></div>

        <div id="feature" className={styles["product-detail-container"]}></div>

        <div id="fees" className={styles["product-detail-container"]}></div>

        <div id="notes" className={styles["product-detail-container"]}></div>

        <div id="comments" className={styles["product-detail-container"]}></div>
      </div>

      <Footer />
    </div>
  );
};
