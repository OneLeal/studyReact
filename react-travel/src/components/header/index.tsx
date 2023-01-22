import React from "react";
import logo from "../../assets/logo.svg";
import styles from "./index.module.css";
import { menuList } from "./opts";
import { GlobalOutlined } from "@ant-design/icons";
import { Layout, Typography, Input, Button, Dropdown, Menu } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useSelector } from "../../redux/hooks";
import { useDispatch } from "react-redux";
import {
  changeLanguageActionCreator,
  addLanguageActionCreator,
} from "../../redux/language/languageActions";

export const Header: React.FC = () => {
  // 获取国际化配置函数
  const { t } = useTranslation();

  // 获取 router 中的数据 / 方法F
  const navigate = useNavigate();

  // 获取 store 中的数据 / 方法
  const language = useSelector((state) => state.language.language);
  const languageList = useSelector((state) => state.language.languageList);
  const dispatch = useDispatch();

  // 设置语言菜单列表 / 点击事件
  const menuProps = {
    items: languageList.map((item) => ({ label: item.name, key: item.code })),
    onClick: (e: any) => {
      const key = e.key;
      if (key !== language) {
        console.log("切换语言 / 新增语言: ", e.key);
        key === "add"
          ? dispatch(addLanguageActionCreator("新语言", "new_key"))
          : dispatch(changeLanguageActionCreator(key));
      }
    },
  };

  // 获取语言代码所对应的名称
  const languageName = () => {
    const target = languageList.find((item) => item.code === language);
    return target ? target.name || "" : "";
  };

  // 设置主导航菜单
  const mainMenuList = menuList.map(({ label, key }) => ({
    key,
    label: t(`header.${label}`),
  }));

  return (
    <div className={styles["app-header"]}>
      {/* 顶部功能导航 */}
      <div className={styles["top-header"]}>
        <div className={styles.inner}>
          <Typography.Text>{t("header.slogan")}</Typography.Text>

          <Dropdown.Button
            className={styles["button-menu"]}
            menu={menuProps}
            icon={<GlobalOutlined />}
          >
            {languageName()}
          </Dropdown.Button>

          <Button.Group className={styles["button-group"]}>
            <Button onClick={() => navigate("/signIn")}>
              {t("header.signin")}
            </Button>

            <Button onClick={() => navigate("/register")}>
              {t("header.register")}
            </Button>
          </Button.Group>
        </div>
      </div>

      {/* 主导航 */}
      <Layout.Header className={styles["main-header"]}>
        <span style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
          <img className={styles["App-logo"]} src={logo} alt="logo" />

          <Typography.Title className={styles.title} level={3}>
            {t("header.title")}
          </Typography.Title>
        </span>

        {/* 搜索栏 */}
        <Input.Search
          className={styles["search-input"]}
          placeholder={t("header.placeholder") || ""}
        />
      </Layout.Header>

      {/* 主菜单 */}
      <Menu
        className={styles["main-menu"]}
        mode={"horizontal"}
        items={mainMenuList}
      />
    </div>
  );
};
