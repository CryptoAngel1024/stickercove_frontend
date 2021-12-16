import { takeLatest } from "redux-saga/effects";

import {
  DO_GET_INTENT,
  DO_STRIPE_PAY,
  DO_CREATE_ORDER,
  DO_DELETE_ORDER,
  DO_SEND_EMAIL,
} from "constants/index";
import { apiCaller } from "redux/ApiCaller";

const doGetIndent = apiCaller({
  type: DO_GET_INTENT,
  method: "post",
  path: () => "/stripe",
});

const doStripePay = apiCaller({
  type: DO_STRIPE_PAY,
  method: "get",
  path: () => "/stripe",
});

const doCreateOrder = apiCaller({
  type: DO_CREATE_ORDER,
  method: "post",
  path: () => "/order",
});

const doDeleteOrder = apiCaller({
  type: DO_DELETE_ORDER,
  method: "delete",
  path: () => "/order",
});

const doSendReceiptByEmail = apiCaller({
  type: DO_SEND_EMAIL,
  method: "post",
  path: () => "/email",
});

export function* rootOrderSaga() {
  yield takeLatest(DO_GET_INTENT, doGetIndent);
  yield takeLatest(DO_STRIPE_PAY, doStripePay);
  yield takeLatest(DO_CREATE_ORDER, doCreateOrder);
  yield takeLatest(DO_DELETE_ORDER, doDeleteOrder);
  yield takeLatest(DO_SEND_EMAIL, doSendReceiptByEmail);
}
