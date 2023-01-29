import React, { useEffect } from "react";
import styles from "./index.module.css";
import { MainLayout } from "../../layouts/main";
import { ProductList } from "../../components/searchList";
import { PaymentCard } from "../../components/paymentCard";
import { Col, Row, Affix } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector, useAppDispatch } from "../../redux/hooks";
import { message } from "antd";
import {
  delShoppingCart,
  payShoppingCartGoods,
} from "../../redux/shoppingCart/slice";

export const ShoppingCart: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.shoppingCart.loading);
  const token = useSelector((state) => state.signIn.token);
  const shoppingCartList = useSelector((state) => state.shoppingCart.list);
  const shoppingCartError = useSelector((state) => state.shoppingCart.error);

  // 购物车相关接口报错
  useEffect(() => {
    typeof shoppingCartError === "string" &&
      shoppingCartError &&
      messageApi.error({ type: "error", content: shoppingCartError });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shoppingCartError]);

  // 清空购物车
  const onShoppingCartClear = () => {
    const params = {
      jwt: token,
      list: shoppingCartList.map((item) => item.id),
    };
    dispatch(delShoppingCart(params));
  };

  // 用户下单
  const onCheckout = async () => {
    await dispatch(payShoppingCartGoods(token));
    navigate("/pay");
  };

  return (
    <MainLayout>
      {contextHolder}
      <Row>
        {/* 购物车清单 */}
        <Col span={16}>
          <div className={styles["product-list-container"]}>
            <ProductList
              data={(shoppingCartList || []).map((item) => item.touristRoute)}
            />
          </div>
        </Col>

        {/* 支付卡组件 */}
        <Col span={8}>
          <Affix>
            <div className={styles["payment-card-container"]}>
              <PaymentCard
                loading={loading}
                isClear={(shoppingCartList || []).length === 0}
                isPay={(shoppingCartList || []).length === 0}
                price={(shoppingCartList || [])
                  .map(
                    (item) =>
                      item.originalPrice *
                      (item.discountPresent ? item.discountPresent : 1)
                  )
                  .reduce((sum, price) => sum + price, 0)}
                originalPrice={(shoppingCartList || [])
                  .map((item) => item.originalPrice)
                  .reduce((sum, price) => sum + price, 0)}
                onCheckout={() => {
                  onCheckout();
                }}
                onShoppingCartClear={() => {
                  onShoppingCartClear();
                }}
              />
            </div>
          </Affix>
        </Col>
      </Row>
    </MainLayout>
  );
};
