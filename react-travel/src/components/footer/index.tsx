import React from "react";
import styles from "./index.module.css";
import { Layout, Typography } from "antd";
import { useTranslation } from "react-i18next";

export const Footer: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Layout.Footer className={styles["footer-wrap"]}>
      <Typography.Title style={{ textAlign: "center" }} level={3}>
        {t("footer.detail")}
      </Typography.Title>
    </Layout.Footer>
  );
};
