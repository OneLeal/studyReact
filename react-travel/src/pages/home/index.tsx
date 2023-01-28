import React from "react";
import stylesCommon from "../../styles/index.module.css";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useSelector, useAppDispatch } from "../../redux/hooks";
import { MainLayout } from "../../layouts/main";
import { SideMenu } from "../../components/sideMenu";
import { SlideShow } from "../../components/slideShow";
import { HotProducts } from "../../components/HotProducts";
import { Row, Col, Typography, Spin } from "antd";
import { apiActionCreator } from "../../redux/recommendProducts/recommendProductsActions";
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
  const dispatch = useAppDispatch();
  const loading = useSelector((state) => state.recommendProducts.loading);
  const error = useSelector((state) => state.recommendProducts.error);
  const productList = useSelector(
    (state) => state.recommendProducts.productList
  );

  useEffect(() => {
    dispatch(apiActionCreator());
  }, []); // 可忽略 eslint 提示

  if (loading) {
    return <Spin className={stylesCommon["common-spin"]} size="large" />;
  }

  if (error) {
    return <div>网站出错: {error}</div>;
  }

  return (
    <MainLayout>
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
    </MainLayout>
  );
};
