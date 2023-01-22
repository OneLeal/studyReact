import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./index.module.css";
import stylesCommon from "../../styles/index.module.css";
import { productInfo } from "../../api/";
import { ProductInfo } from "../../components/productInfo";
import { useParams } from "react-router-dom";
import { Header } from "../../components/header";
import { Footer } from "../../components/footer";
import { Row, Col, Spin, DatePicker } from "antd";

const { RangePicker } = DatePicker;
const dateFormat = "YYYY 年 MM 月 DD 日";
const ERROR_MESSAGE = "获取产品详情失败！";

// 设置路由参数类型
type ParamsKeys = {
  travelId: string;
  title?: string;
};

export const TravelDetails: React.FC = () => {
  const params = useParams<ParamsKeys>();
  const [loading, setLoading] = useState<boolean>(true);
  const [product, setProduct] = useState<any>(null);
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
          setError(error.message || ERROR_MESSAGE);
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
        {/* 产品详情 / 日期选择 */}
        <div className={styles["product-intro-container"]}>
          <Row>
            <Col span={13}>
              <ProductInfo
                title={product.title}
                description={product.description}
                points={product.points}
                coupons={product.coupons}
                discount={product.discount}
                price={product.price}
                rating={product.rating}
                pictures={product.touristRoutePictures.map(
                  (item: any) => item.url
                )}
              />
            </Col>

            <Col span={11}>
              <RangePicker style={{ marginTop: 20 }} format={dateFormat} />
            </Col>
          </Row>
        </div>

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
