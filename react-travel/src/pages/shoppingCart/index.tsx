import React from "react";
import styles from "./index.module.css";
import { MainLayout } from "../../layouts/main";
import { ProductList } from "../../components/searchList";
import { PaymentCard } from "../../components/paymentCard";
import { Col, Row, Affix } from "antd";
import { useSelector, useAppDispatch } from "../../redux/hooks";
import { delShoppingCart } from "../../redux/shoppingCart/slice";

export const ShoppingCart: React.FC = () => {
  const dispatch = useAppDispatch();
  const loading = useSelector((state) => state.shoppingCart.loading);
  const token = useSelector((state) => state.signIn.token);
  const shoppingCartList = useSelector((state) => state.shoppingCart.list);

  // 清空购物车
  const onShoppingCartClear = () => {
    // FIXME: 未登录时点击应提示请登录
    const params = {
      jwt: token,
      list: shoppingCartList.map((item) => item.id),
    };
    dispatch(delShoppingCart(params));
  };

  // 用户下单
  const onCheckout = () => {}; // TODO: 待开发

  return (
    <MainLayout>
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
