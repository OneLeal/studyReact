import React from "react";
import styles from "./index.module.css";
import { Header } from "../../components/header";
import { Footer } from "../../components/footer";

interface PropsType {
  children?: React.ReactNode;
}

export const MainLayout: React.FC<PropsType> = ({ children }) => {
  return (
    <div>
      <Header />
      <div className={styles["page-content"]}>{children}</div>
      <Footer />
    </div>
  );
};
