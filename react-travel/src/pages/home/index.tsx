import React from "react";
import axios from "axios";
import styles from "./index.module.css";
import stylesCommon from "../../styles/index.module.css";
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
// import {
//   productList1,
//   productList2,
//   productList3,
// } from "../../mock/hotProducts";
import {
  fetchRecommendProductsActionCreator,
  fetchRecommendProductsSuccessActionCreator,
  fetchRecommendProductsFailedActionCreator,
} from "../../redux/recommendProducts/recommendProductsActions";

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
    const http = async () => {
      try {
        dispatch(fetchRecommendProductsActionCreator());
        const { data } = await axios.get(productListApi);
        console.log("产品推荐列表: ", data);
        dispatch(fetchRecommendProductsSuccessActionCreator(data));
      } catch (error) {
        if (error instanceof Error) {
          dispatch(fetchRecommendProductsFailedActionCreator(error));
        }
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
