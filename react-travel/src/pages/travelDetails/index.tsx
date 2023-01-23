import React, { useEffect } from "react";
import styles from "./index.module.css";
import stylesCommon from "../../styles/index.module.css";
import { useParams } from "react-router-dom";
import { useSelector, useAppDispatch } from "../../redux/hooks";
import { commentMockData } from "../../mock/comments";
import { ProductInfo } from "../../components/productInfo";
import { ProductComments } from "../../components/productComments";
import { Header } from "../../components/header";
import { Footer } from "../../components/footer";
import {
  fetchProductInfo,
  productInfoSlice,
} from "../../redux/productInfo/slice";
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
  const dispatch = useAppDispatch();
  const params = useParams<ParamsKeys>(); // 获取路由参数

  // 将数据存放至 store
  const loading = useSelector((state) => state.productInfo.loading);
  const error = useSelector((state) => state.productInfo.error);
  const product = useSelector((state) => state.productInfo.data);

  useEffect(() => {
    const id = params.travelId;
    id && dispatch(fetchProductInfo(id)); // 异步请求
    dispatch(productInfoSlice.actions.test()); // 同步操作
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
