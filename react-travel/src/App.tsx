import styles from "./App.module.css";
import { Header } from "./components/header";
import { Footer } from "./components/footer";
import { SideMenu } from "./components/sideMenu";
import { SlideShow } from "./components/slideShow";
import { Row, Col } from "antd";

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
      </div>

      <Footer />
    </div>
  );
}

export default App;
