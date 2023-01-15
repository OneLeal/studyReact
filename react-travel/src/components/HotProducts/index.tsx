import React from "react";
import styles from "./index.module.css";
import { Row, Col, Divider } from "antd";
import { ProductImage } from "../productImage";

// props 类型声明
interface PropsType {
  title: JSX.Element;
  sideImage: string;
  list: any;
}

export const HotProducts: React.FC<PropsType> = (props) => {
  return (
    <div className={styles.content}>
      <Divider orientation="left">{props.title}</Divider>

      <Row>
        <Col span={4}>
          <img className={styles["side-image"]} src={props.sideImage} alt="" />
        </Col>

        <Col span={20}>
          <Row gutter={10}>
            <Col span={12}>
              <ProductImage
                id={props.list[0].id}
                title={props.list[0].title}
                price={props.list[0].price}
                src={props.list[0].touristRoutePictures[0].url}
                size="large"
              />
            </Col>

            <Col span={12}>
              <Row gutter={10}>
                <Col span={12}>
                  <ProductImage
                    id={props.list[1].id}
                    title={props.list[1].title}
                    price={props.list[1].price}
                    src={props.list[1].touristRoutePictures[0].url}
                    size="small"
                  />
                </Col>

                <Col span={12}>
                  <ProductImage
                    id={props.list[2].id}
                    title={props.list[2].title}
                    price={props.list[2].price}
                    src={props.list[2].touristRoutePictures[0].url}
                    size="small"
                  />
                </Col>
              </Row>

              <Row gutter={10}>
                <Col span={12}>
                  <ProductImage
                    id={props.list[3].id}
                    title={props.list[3].title}
                    price={props.list[3].price}
                    src={props.list[3].touristRoutePictures[0].url}
                    size="small"
                  />
                </Col>
                <Col span={12}>
                  <ProductImage
                    id={props.list[4].id}
                    title={props.list[4].title}
                    price={props.list[4].price}
                    src={props.list[4].touristRoutePictures[0].url}
                    size="small"
                  />
                </Col>
              </Row>
            </Col>
          </Row>

          <Row gutter={10}>
            <Col span={6}>
              <ProductImage
                id={props.list[5].id}
                title={props.list[5].title}
                price={props.list[5].price}
                src={props.list[5].touristRoutePictures[0].url}
                size="small"
              />
            </Col>

            <Col span={6}>
              <ProductImage
                id={props.list[6].id}
                title={props.list[6].title}
                price={props.list[6].price}
                src={props.list[6].touristRoutePictures[0].url}
                size="small"
              />
            </Col>

            <Col span={6}>
              <ProductImage
                id={props.list[7].id}
                title={props.list[7].title}
                price={props.list[7].price}
                src={props.list[7].touristRoutePictures[0].url}
                size="small"
              />
            </Col>

            <Col span={6}>
              <ProductImage
                id={props.list[8].id}
                title={props.list[8].title}
                price={props.list[8].price}
                src={props.list[8].touristRoutePictures[0].url}
                size="small"
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};
