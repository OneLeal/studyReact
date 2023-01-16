import {
  FetchRecommendProductsActionTypes,
  FETCH_RECOMMEND_PRODUCTS,
  FETCH_RECOMMEND_PRODUCTS_SUCCESS,
  FETCH_RECOMMEND_PRODUCTS_FAILED,
} from "./recommendProductsActions";

interface RecommendProductsState {
  loading: boolean;
  error: string | null;
  productList: any[];
}

// 设置初始化数据
const defaultState: RecommendProductsState = {
  loading: true,
  error: null,
  productList: [],
};

export const initRecommendProductsReducer = (
  state = defaultState,
  action: FetchRecommendProductsActionTypes
) => {
  switch (action.type) {
    // 开始请求
    case FETCH_RECOMMEND_PRODUCTS:
      return { ...state, loading: true, error: null, productList: [] };

    // 请求成功
    case FETCH_RECOMMEND_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        productList: action.payload,
      };

    // 请求异常
    case FETCH_RECOMMEND_PRODUCTS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
        productList: [],
      };

    default:
      return state;
  }
};
