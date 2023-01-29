import React, { useEffect } from "react";
import { PaymentForm } from "../../components/paymentForm";
import { CheckOutCard } from "../../components/checkOutCard";
import { MainLayout } from "../../layouts/main";
import { Col, Row, message } from "antd";
import { useSelector, useAppDispatch } from "../../redux/hooks";
import { handlePayOrder } from "../../redux/payOrder/slice";

export const PayOrder: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useAppDispatch();
  const token = useSelector((state) => state.signIn.token);
  const loading = useSelector((state) => state.payOrder.loading);
  const order = useSelector((state) => state.payOrder.currentOrder);

  // 支付操作
  const onCheckout = () => {
    const orderId = order && order.id; // 获取订单号

    if (!token) {
      messageApi.warning("请登录！");
      return;
    }

    if (!orderId) {
      messageApi.warning("缺少订单号！");
      return;
    }

    const params = { orderId, jwt: token };
    dispatch(handlePayOrder(params));
  };

  // 监听订单状态
  useEffect(() => {
    order && order.state === "Completed" && messageApi.success("支付成功！");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order]);

  return (
    <MainLayout>
      {contextHolder}
      <Row>
        <Col span={12}>
          <PaymentForm />
        </Col>
        <Col span={12}>
          <CheckOutCard
            loading={loading}
            order={order}
            onCheckout={() => onCheckout()}
          />
        </Col>
      </Row>
    </MainLayout>
  );
};
