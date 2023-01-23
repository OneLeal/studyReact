import { RootState, AppDispatch } from "./store";
import {
  useSelector as useReduxSelector,
  useDispatch,
  TypedUseSelectorHook,
} from "react-redux";

// 包装 react-redux 中原有的钩子 useSelector
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

// 包装 react-redux 中原有的钩子 useDispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();
