import React from "react";
import styles from "./index.module.css";
import { sideMenuList } from "./mock";
import { Menu } from "antd";
import { GifOutlined } from "@ant-design/icons";

const items = () =>
  sideMenuList.map((item) => ({
    key: item.title,
    label: item.title,
    icon: <GifOutlined />,
    children: item.subMenu.map((subItem) => ({
      key: subItem.title,
      label: subItem.title,
      icon: <GifOutlined />,
      children: subItem.subMenu.map((subTitle) => ({
        key: subTitle,
        label: subTitle,
        icon: <GifOutlined />,
      })),
    })),
  }));

export const SideMenu: React.FC = () => {
  return <Menu className={styles["side-menu"]} items={items()} />;
};
