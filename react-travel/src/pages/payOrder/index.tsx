import React from "react";
import { PaymentForm } from "../../components/paymentForm";
import { CheckOutCard } from "../../components/checkOutCard";
import { MainLayout } from "../../layouts/main";
import { Col, Row } from "antd";

export const PayOrder: React.FC = () => {
  return (
    <MainLayout>
      <Row>
        <Col span={12}>
          <PaymentForm />
        </Col>
        <Col span={12}>
          {/* <CheckOutCard /> */}
        </Col>
      </Row>
    </MainLayout>
  );
};
