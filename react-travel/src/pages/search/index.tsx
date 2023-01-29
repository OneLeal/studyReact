import React, { useEffect } from "react";
import styles from "./index.module.css";
import stylesCommon from "../../styles/index.module.css";
import { MainLayout } from "../../layouts/main";
import { fetchSearchInfo } from "../../redux/search/slice";
import { useParams, useLocation } from "react-router-dom";
import { useSelector, useAppDispatch } from "../../redux/hooks";
import { FilterArea } from "../../components/filter/filterArea";
import { ProductList } from "../../components/searchList";
import { Spin } from "antd";

export const SearchPage: React.FC = () => {
  const params = useParams();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const loading = useSelector((state) => state.searchInfo.loading);
  const error = useSelector((state) => state.searchInfo.error);
  const page = useSelector((state) => state.searchInfo.pagination);
  const searchInfoList = useSelector((state) => state.searchInfo.data);

  useEffect(() => {
    const keywords = params.keywords;
    keywords && dispatch(fetchSearchInfo({ keywords, page: 1, pageSize: 10 }));
  }, [location, params.keywords, dispatch]);

  // 页数切换
  const onPageChange = (page, pageSize) => {
    const keywords = params.keywords;
    keywords && dispatch(fetchSearchInfo({ keywords, page, pageSize }));
  };

  if (loading) {
    return <Spin className={stylesCommon["common-spin"]} size="large" />;
  }

  if (error) {
    return <div>网站出错: {error}</div>;
  }

  return (
    <MainLayout>
      {/* 分类过滤器 */}
      <div className={styles["product-list-container"]}>
        <FilterArea />
      </div>

      {/* 产品列表 */}
      <div className={styles["product-list-container"]}>
        <ProductList
          data={searchInfoList}
          paging={page}
          onPageChange={onPageChange}
        />
      </div>
    </MainLayout>
  );
};
