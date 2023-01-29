import axios from "axios";
import { productListApi } from "../../api";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";

// 事件派发类型
export const FETCH_RECOMMEND_PRODUCTS = "fetch_recommend_products";
export const FETCH_RECOMMEND_PRODUCTS_SUCCESS =
  "fetch_recommend_products_success";
export const FETCH_RECOMMEND_PRODUCTS_FAILED =
  "fetch_recommend_products_failed";

interface FetchRecommendProductsAction {
  type: typeof FETCH_RECOMMEND_PRODUCTS;
}

interface FetchRecommendProductsSuccessAction {
  type: typeof FETCH_RECOMMEND_PRODUCTS_SUCCESS;
  payload: any;
}

interface FetchRecommendProductsFailedAction {
  type: typeof FETCH_RECOMMEND_PRODUCTS_FAILED;
  payload: any;
}

export type RecommendProductsActionTypes =
  | FetchRecommendProductsAction
  | FetchRecommendProductsSuccessAction
  | FetchRecommendProductsFailedAction;

export const fetchRecommendProductsActionCreator =
  (): FetchRecommendProductsAction => ({
    type: FETCH_RECOMMEND_PRODUCTS,
  });

export const fetchRecommendProductsSuccessActionCreator = (
  payload: any
): FetchRecommendProductsSuccessAction => ({
  type: FETCH_RECOMMEND_PRODUCTS_SUCCESS,
  payload,
});

export const fetchRecommendProductsFailedActionCreator = (
  payload: any
): FetchRecommendProductsFailedAction => ({
  type: FETCH_RECOMMEND_PRODUCTS_FAILED,
  payload,
});

/**
 * thunk 可以返回一个函数，而不一定是 js 对象
 * 一个 thunk-action 中可以操作多个 action
 * 支持处理异步逻辑
 * 业务逻辑转移此处，代码分层更清晰
 */
export const apiActionCreator =
  (): ThunkAction<void, RootState, unknown, RecommendProductsActionTypes> =>
  async (dispatch, getState) => {
    try {
      dispatch(fetchRecommendProductsActionCreator());
      const { data } = await axios.get(productListApi);
      dispatch(fetchRecommendProductsSuccessActionCreator(data));
    } catch (error) {
      if (error instanceof Error) {
        dispatch(fetchRecommendProductsFailedActionCreator(error));
      }
    }
  };
