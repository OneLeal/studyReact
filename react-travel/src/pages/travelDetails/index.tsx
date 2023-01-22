import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./index.module.css";
import stylesCommon from "../../styles/index.module.css";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "../../redux/hooks";
import { productInfoSlice } from "../../redux/productInfo/slice";
import { commentMockData } from "../../mock/comments";
import { productInfo } from "../../api/";
import { ProductInfo } from "../../components/productInfo";
import { ProductComments } from "../../components/productComments";
import { Header } from "../../components/header";
import { Footer } from "../../components/footer";
import {
  Row,
  Col,
  Spin,
  DatePicker,
  Typography,
  Divider,
  Anchor,
  Menu,
} from "antd";

const { RangePicker } = DatePicker;
const dateFormat = "YYYY 年 MM 月 DD 日";
const ERROR_MESSAGE = "获取产品详情失败！";

// 设置路由参数类型
type ParamsKeys = {
  travelId: string;
  title?: string;
};

// 锚点配置列表
const LINK_LIST = [
  { key: 1, title: "产品特色", href: "feature" },
  { key: 2, title: "费 用", href: "fees" },
  { key: 3, title: "预订须知", href: "notes" },
  { key: 4, title: "商品评价", href: "comments" },
];

export const TravelDetails: React.FC = () => {
  const dispatch = useDispatch();
  const params = useParams<ParamsKeys>(); // 获取路由参数

  // 将数据存放在当前组件的 state 中
  // const [loading, setLoading] = useState<boolean>(true);
  // const [product, setProduct] = useState<any>(null);
  // const [error, setError] = useState<string | null>(null);

  // 将数据存放至 redux
  const loading = useSelector((state) => state.productInfo.loading);
  const error = useSelector((state) => state.productInfo.error);
  const product = useSelector((state) => state.productInfo.data);

  useEffect(() => {
    const http = async () => {
      const id = params.travelId;
      const url = productInfo + id;
      // setLoading(true);
      dispatch(productInfoSlice.actions.fetchDataStart());

      try {
        const { data } = await axios.get(url);
        console.log("产品详情: ", data);
        // setProduct(data);
        dispatch(productInfoSlice.actions.fetchDataSuccess(data));
      } catch (error) {
        if (error instanceof Error) {
          // setError(error.message || ERROR_MESSAGE);
          dispatch(productInfoSlice.actions.fetchDataFailed(error));
        }
      } finally {
        // setLoading(false);
      }
    };
    http();
  }, [params.travelId, dispatch]);

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

        {/* 锚点菜单 */}
        <Anchor className={styles["product-detail-anchor"]}>
          <Menu mode="horizontal">
            {LINK_LIST.map((item) => (
              <Menu.Item key={item.key}>
                <Anchor.Link title={item.title} href={`#${item.href}`} />
              </Menu.Item>
            ))}
          </Menu>
        </Anchor>

        {/* 产品特色 */}
        <div id="feature" className={styles["product-detail-container"]}>
          <Divider orientation="center">
            <Typography.Title level={3}>产品特色</Typography.Title>
          </Divider>

          <div
            style={{ margin: 50 }}
            dangerouslySetInnerHTML={{ __html: product.features }}
          />
        </div>

        {/* 费用 */}
        <div id="fees" className={styles["product-detail-container"]}>
          <Divider orientation="center">
            <Typography.Title level={3}>费 用</Typography.Title>
          </Divider>

          <div
            style={{ margin: 50 }}
            dangerouslySetInnerHTML={{ __html: product.fees }}
          />
        </div>

        {/* 预订须知 */}
        <div id="notes" className={styles["product-detail-container"]}>
          <Divider orientation="center">
            <Typography.Title level={3}>预订须知</Typography.Title>
          </Divider>

          <div
            style={{ margin: 50 }}
            dangerouslySetInnerHTML={{ __html: product.notes }}
          />
        </div>

        {/* 商品评价 */}
        <div id="comments" className={styles["product-detail-container"]}>
          <Divider orientation="center">
            <Typography.Title level={3}>商品评价</Typography.Title>
          </Divider>

          <div style={{ margin: 40 }}>
            <ProductComments list={commentMockData} />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
