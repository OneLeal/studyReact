import React from "react";
import { Image, Typography } from "antd";
import { Link } from "react-router-dom";

// props 类型声明
interface PropsType {
  id: number | string; // 产品 id
  price: number | string; // 产品价格
  title: string; // 标题
  src: string; // 图片路径
  size: "large" | "small"; // 组件大小
}

export const ProductImage: React.FC<PropsType> = (props) => {
  return (
    <Link to={`/details/${props.id}`}>
      {props.size === "large" ? (
        <Image preview={false} src={props.src} height={285} width={490} />
      ) : (
        <Image preview={false} src={props.src} height={120} width={240} />
      )}

      <p>
        <Typography.Text type="secondary">
          {props.title.slice(0, 25)}
        </Typography.Text>

        <Typography.Text type="danger" strong>
          {`￥ ${props.price} 起`}
        </Typography.Text>
      </p>
    </Link>
  );
};
