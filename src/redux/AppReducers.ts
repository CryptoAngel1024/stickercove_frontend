import { TypedUseSelectorHook, useSelector as useReduxSelector } from "react-redux";
import { combineReducers } from "redux";
import { abandon_reducer as abandon } from "./Reducers/Abandon";
import { checkout_reducer as checkout } from "./Reducers/Checkout";
import { comment_reducer as comment } from "./Reducers/Comment";
import { order_reducer as order } from "./Reducers/Order";

export const appReducers = combineReducers({
  order,
  comment,
  checkout,
  abandon,
});

type RootState = ReturnType<typeof appReducers>
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;