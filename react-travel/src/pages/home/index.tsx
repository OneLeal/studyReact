import React from "react";
import styles from "./index.module.css";
import stylesCommon from "../../styles/index.module.css";
import axios from "axios";
import { productListApi } from "../../api";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "../../redux/hooks";
import { Header } from "../../components/header";
import { Footer } from "../../components/footer";
import { SideMenu } from "../../components/sideMenu";
import { SlideShow } from "../../components/slideShow";
import { HotProducts } from "../../components/HotProducts";
import { Row, Col, Typography, Spin } from "antd";
import {
  apiActionCreator,
  fetchRecommendProductsActionCreator,
  fetchRecommendProductsFailedActionCreator,
  fetchRecommendProductsSuccessActionCreator,
} from "../../redux/recommendProducts/recommendProductsActions";
// import {
//   productList1,
//   productList2,
//   productList3,
// } from "../../mock/hotProducts";

// 静态资源
import sideImage1 from "../../assets/images/sider_2019_12-09.png";
import sideImage2 from "../../assets/images/sider_2019_02-04.png";
import sideImage3 from "../../assets/images/sider_2019_02-04-2.png";

export const Home: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.recommendProducts.loading);
  const error = useSelector((state) => state.recommendProducts.error);
  const productList = useSelector(
    (state) => state.recommendProducts.productList
  );

  useEffect(() => {
    // dispatch((apiActionCreator()); // FIXME: dispatch 参数类型错误

    // FIXME: 暂时先在组件中进行请求，待上述问题解决后再迁移至中间件调用
    const http = async () => {
      try {
        dispatch(fetchRecommendProductsActionCreator());
        const { data } = await axios.get(productListApi);
        dispatch(fetchRecommendProductsSuccessActionCreator(data));
        console.log("产品推荐列表: ", data);
      } catch (error) {
        if (error instanceof Error) {
          dispatch(fetchRecommendProductsFailedActionCreator(error));
        }
      }
    };
    http();
  }, [dispatch]);

  if (loading) {
    return <Spin className={stylesCommon["common-spin"]} size="large" />;
  }

  if (error) {
    return <div>网站出错: {error}</div>;
  }

  return (
    <div>
      <Header />

      {/* 页面内容 */}
      <div className={styles["page-content"]}>
        {/* 侧边栏 | 幻灯片 */}
        <Row>
          <Col span={6}>
            <SideMenu />
          </Col>

          <Col span={18}>
            <SlideShow />
          </Col>
        </Row>

        {/* 热门推荐 */}
        <HotProducts
          sideImage={sideImage1}
          list={productList[0].touristRoutes}
          title={
            <Typography.Title level={3} type="warning">
              {t("home_page.hot_recommended")}
            </Typography.Title>
          }
        />

        <HotProducts
          sideImage={sideImage2}
          list={productList[1].touristRoutes}
          title={
            <Typography.Title level={3} type="danger">
              {t("home_page.new_arrival")}
            </Typography.Title>
          }
        />

        <HotProducts
          sideImage={sideImage3}
          list={productList[2].touristRoutes}
          title={
            <Typography.Title level={3} type="success">
              {t("home_page.domestic_travel")}
            </Typography.Title>
          }
        />
      </div>

      <Footer />
    </div>
  );
};
