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

export type FetchRecommendProductsActionTypes =
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
