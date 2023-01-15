import styles from "./App.module.css";
import { Header } from "./components/header";
import { Footer } from "./components/footer";
import { SideMenu } from "./components/sideMenu";
import { SlideShow } from "./components/slideShow";
import { HotProducts } from "./components/HotProducts";
import { Row, Col, Typography } from "antd";
import { productList1, productList2, productList3 } from "./mock/hotProducts";

import sideImage1 from "./assets/images/sider_2019_12-09.png";
import sideImage2 from "./assets/images/sider_2019_02-04.png";
import sideImage3 from "./assets/images/sider_2019_02-04-2.png";

function App() {
  return (
    <div className={styles.App}>
      <Header />

      {/* 页面内容 */}
      <div className={styles["page-content"]}>
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
          list={productList1}
          title={
            <Typography.Title level={3} type="warning">
              爆款推荐
            </Typography.Title>
          }
        />

        <HotProducts
          sideImage={sideImage2}
          list={productList2}
          title={
            <Typography.Title level={3} type="danger">
              新品上市
            </Typography.Title>
          }
        />

        <HotProducts
          sideImage={sideImage3}
          list={productList3}
          title={
            <Typography.Title level={3} type="success">
              周边旅游
            </Typography.Title>
          }
        />
      </div>

      <Footer />
    </div>
  );
}

export default App;
