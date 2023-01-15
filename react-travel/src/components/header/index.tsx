import React from "react";
import logo from "../../assets/logo.svg";
import styles from "./index.module.css";
import type { MenuProps } from "antd";
import { GlobalOutlined } from "@ant-design/icons";
import { Layout, Typography, Input, Button, Dropdown, Menu } from "antd";

// 语言选择项
const items: MenuProps["items"] = [
  { key: "1", label: "中 文" },
  { key: "2", label: "英 文" },
  { key: "3", label: "日 文" },
];

// 主菜单选项
const menuList = [
  { key: "1", label: "旅游首页" },
  { key: "2", label: "周末游" },
  { key: "3", label: "跟团游" },
  { key: "4", label: "自由行" },
  { key: "5", label: "私家团" },
  { key: "6", label: "邮轮" },
  { key: "7", label: "酒店+景点" },
  { key: "8", label: "当地玩乐" },
  { key: "9", label: "主题游" },
  { key: "10", label: "定制游" },
  { key: "11", label: "游学" },
  { key: "12", label: "签证" },
  { key: "13", label: "企业游" },
  { key: "14", label: "高端游" },
  { key: "15", label: "爱玩户外" },
  { key: "16", label: "保险" },
];

export const Header: React.FC = () => {
  return (
    <div className={styles["app-header"]}>
      {/* 顶部功能导航 */}
      <div className={styles["top-header"]}>
        <div className={styles.inner}>
          <Typography.Text>让旅游更幸福</Typography.Text>

          <Dropdown menu={{ items }}>
            <Button style={{ marginLeft: 15 }} icon={<GlobalOutlined />}>
              语 言
            </Button>
          </Dropdown>

          <Button.Group className={styles["button-group"]}>
            <Button>注 册</Button>
            <Button>登 录</Button>
          </Button.Group>
        </div>
      </div>

      {/* 主导航 */}
      <Layout.Header className={styles["main-header"]}>
        {/* 页面 icon */}
        <img className={styles["App-logo"]} src={logo} alt="logo" />

        {/* 标题 */}
        <Typography.Title className={styles.title} level={3}>
          React 旅游网
        </Typography.Title>

        {/* 搜索栏 */}
        <Input.Search
          className={styles["search-input"]}
          placeholder={"请输入目的地 / 景点 / 关键字"}
        />
      </Layout.Header>

      {/* 主菜单 */}
      <Menu
        className={styles["main-menu"]}
        mode={"horizontal"}
        items={menuList}
      />
    </div>
  );
};
