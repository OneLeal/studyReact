import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.svg";
import styles from "./index.module.css";
import jwt_decode, { JwtPayload as defaultJwtPayload } from "jwt-decode";
import { menuList } from "./opts";
import { GlobalOutlined } from "@ant-design/icons";
import { Layout, Typography, Input, Button, Dropdown, Menu } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useSelector } from "../../redux/hooks";
import { useDispatch } from "react-redux";
import { signInSlice } from "../../redux/signIn/slice";
import {
  changeLanguageActionCreator,
  addLanguageActionCreator,
} from "../../redux/language/languageActions";

interface jwtInfoType extends defaultJwtPayload {
  username: string;
}

export const Header: React.FC = () => {
  // 获取国际化配置函数
  const { t } = useTranslation();

  // 获取 router 中的数据 / 方法
  const navigate = useNavigate();

  // 获取 store 中的数据 / 方法
  const language = useSelector((state) => state.language.language);
  const languageList = useSelector((state) => state.language.languageList);
  const token = useSelector((state) => state.signIn.token);
  const dispatch = useDispatch();

  // 设置组件的 state
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (token) {
      const jwt = jwt_decode<jwtInfoType>(token);
      setUsername(jwt.username);
    }
  }, [token]);

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

  // 注销
  const onLogout = () => {
    dispatch(signInSlice.actions.logOut());
    navigate("/");
    window.location.reload();
  };

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

          {token ? (
            <Button.Group className={styles["button-group"]}>
              <span>
                {t("header.welcome")}
                <Typography.Text strong>{username}</Typography.Text>
              </span>

              <Button>{t("header.shoppingCart")}</Button>
              <Button onClick={onLogout}>{t("header.signOut")}</Button>
            </Button.Group>
          ) : (
            <Button.Group className={styles["button-group"]}>
              <Button onClick={() => navigate("/signIn")}>
                {t("header.signin")}
              </Button>

              <Button onClick={() => navigate("/register")}>
                {t("header.register")}
              </Button>
            </Button.Group>
          )}
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
          onSearch={(keyword) => keyword && navigate(`/search/${keyword}`)}
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
