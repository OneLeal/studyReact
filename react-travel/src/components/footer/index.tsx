import React from "react";
import styles from "./index.module.css";
import { Layout, Typography } from "antd";

export const Footer: React.FC = () => {
  return (
    <Layout.Footer className={styles["footer-wrap"]}>
      <Typography.Title style={{ textAlign: "center" }} level={3}>
        版权所有 @ React 旅游网
      </Typography.Title>
    </Layout.Footer>
  );
};
