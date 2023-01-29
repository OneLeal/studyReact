import React from "react";
import styles from "./index.module.css";
import { MainLayout } from "../../layouts/main";
import { ProductList } from "../../components/searchList";
import { PaymentCard } from "../../components/paymentCard";
import { Col, Row, Affix } from "antd";

export const ShoppingCart: React.FC = () => {
  return (
    <MainLayout>
      <Row>
        {/* 购物车清单 */}
        <Col span={16}>
          <div className={styles["product-list-container"]}>
            {/* <ProductList /> */}
          </div>
        </Col>

        {/* 支付卡组件 */}
        <Col span={8}>
          <Affix>
            <div className={styles["payment-card-container"]}>
              {/* <PaymentCard /> */}
            </div>
          </Affix>
        </Col>
      </Row>
    </MainLayout>
  );
};
