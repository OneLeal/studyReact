import React from "react";
import { List } from "antd";
import { Comment } from "@ant-design/compatible";

interface PropsType {
  list: {
    author: string;
    avatar: string;
    content: string;
    createDate: string;
  }[];
}

export const ProductComments: React.FC<PropsType> = (props) => {
  return (
    <List
      itemLayout="horizontal"
      dataSource={props.list}
      renderItem={(item) => (
        <Comment
          author={item.author}
          avatar={item.avatar}
          content={item.content}
          datetime={item.createDate}
        />
      )}
    />
  );
};
