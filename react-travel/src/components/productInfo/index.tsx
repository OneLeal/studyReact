import React from "react";
import styles from "./index.module.css";
import { Typography, Image, Carousel, Table, Rate } from "antd";
import type { ColumnsType } from "antd/es/table";

// 定义组件 props 接口
interface PropsType {
  title: string;
  description: string;
  points: string;
  coupons: string;
  discount: string;
  price: string | number;
  rating: string | number;
  pictures: string[];
}

interface RowType {
  title: string;
  description: string | number | JSX.Element;
  key: number;
}

const columns: ColumnsType<RowType> = [
  {
    title: "title",
    dataIndex: "title",
    key: "title",
    align: "left",
    width: 120,
  },

  {
    title: "description",
    dataIndex: "description",
    key: "description",
    align: "center",
  },
];

export const ProductInfo: React.FC<PropsType> = (props) => {
  const len = props.pictures.length;
  const tableDataSource: RowType[] = [
    {
      key: 0,
      title: "路线名称",
      description: props.title,
    },
    {
      key: 1,
      title: "价格",
      description: (
        <>
          ¥{" "}
          <Typography.Text type="danger" strong>
            {props.price}
          </Typography.Text>
        </>
      ),
    },
    {
      key: 2,
      title: "限时抢购折扣",
      description: props.discount ? (
        <>
          ¥ <Typography.Text delete>{props.price}</Typography.Text>{" "}
          <Typography.Text type="danger" strong>
            ¥ {props.discount}
          </Typography.Text>
        </>
      ) : (
        "暂无折扣"
      ),
    },
    {
      key: 2,
      title: "领取优惠",
      description: props.coupons ? props.discount : "无优惠券可领",
    },
    {
      key: 2,
      title: "线路评价",
      description: (
        <>
          <Rate allowHalf defaultValue={+props.rating} />
          <Typography.Text style={{ marginLeft: 10 }}>
            {props.rating} 星
          </Typography.Text>
        </>
      ),
    },
  ];

  return (
    <div className={styles["intro-container"]}>
      <Typography.Title level={4}>{props.title}</Typography.Title>
      <Typography.Text>{props.description}</Typography.Text>

      <div className={styles["intro-detail-content"]}>
        <Typography.Text style={{ marginLeft: 20 }}>
          <span className={styles["intro-detail-strong-text"]}>
            {`￥${props.price}/人起`}
          </span>
        </Typography.Text>

        <Typography.Text style={{ marginLeft: 50 }}>
          <span className={styles["intro-detail-strong-text"]}>
            {`${props.rating} 分`}
          </span>
        </Typography.Text>
      </div>

      <Carousel autoplay slidesToShow={len}>
        {props.pictures.map((src) => (
          <Image height={150} src={src} />
        ))}
      </Carousel>

      <Table
        columns={columns}
        dataSource={tableDataSource}
        size="small"
        bordered={false}
        pagination={false}
      />
    </div>
  );
};
