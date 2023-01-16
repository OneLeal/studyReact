import { RootState } from "./store";
import {
  useSelector as useReduxSelector,
  TypedUseSelectorHook,
} from "react-redux";

// 包装 react-redux 中原有的钩子 useSelector
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
