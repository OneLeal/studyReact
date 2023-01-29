import React, { useEffect } from "react";
import styles from "./index.module.css";
import stylesCommon from "../../styles/index.module.css";
import { useParams } from "react-router-dom";
import { useSelector, useAppDispatch } from "../../redux/hooks";
import { commentMockData } from "../../mock/comments";
import { ProductInfo } from "../../components/productInfo";
import { ProductComments } from "../../components/productComments";
import { MainLayout } from "../../layouts/main";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { addShoppingCart } from "../../redux/shoppingCart/slice";
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
  Button,
  message,
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
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useAppDispatch(); // 获取 dispatch
  const params = useParams<ParamsKeys>(); // 获取路由参数

  // 从 store 中获取数据
  const loading = useSelector((state) => state.productInfo.loading);
  const shoppingLoading = useSelector((state) => state.shoppingCart.loading);
  const error = useSelector((state) => state.productInfo.error);
  const shoppingCartError = useSelector((state) => state.shoppingCart.error);
  const product = useSelector((state) => state.productInfo.data);
  const token = useSelector((state) => state.signIn.token);

  // 监听路由参数，根据 id 查询商品详情信息
  useEffect(() => {
    const id = params.travelId;
    id && dispatch(fetchProductInfo(id)); // 异步请求
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.travelId]);

  // 购物车相关接口报错
  useEffect(() => {
    typeof shoppingCartError === "string" &&
      shoppingCartError &&
      messageApi.error(shoppingCartError);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shoppingCartError]);

  // 把商品加入购物车
  const handleAdd = async () => {
    if (!token) {
      messageApi.warning("请登录");
      return;
    }

    const params = { jwt: token, id: product.id };
    await dispatch(addShoppingCart(params));
    messageApi.success("加入购物车成功！");
  };

  if (loading) {
    return <Spin className={stylesCommon["common-spin"]} size="large" />;
  }

  if (error) {
    return <div>网站出错: {error}</div>;
  }

  return (
    <MainLayout>
      {contextHolder}
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
            <div className={styles["btn-add-shopping-cart"]}>
              <Button
                type="primary"
                loading={shoppingLoading}
                icon={<ShoppingCartOutlined />}
                danger
                onClick={() => {
                  handleAdd();
                }}
              >
                放入购物车
              </Button>
            </div>

            <RangePicker style={{ marginTop: 20 }} format={dateFormat} open />
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
    </MainLayout>
  );
};
