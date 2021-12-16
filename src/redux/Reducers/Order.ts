import { createAction, handleActions } from "redux-actions";
import {
  requestSuccess,
  requestFail,
  requestPending,
} from "redux/ApiCaller/RequestStatus";

import {
  DO_GET_INTENT,
  DO_STRIPE_PAY,
  DO_CREATE_ORDER,
  DO_DELETE_ORDER,
  DO_SEND_EMAIL,
} from "constants/index";

const getInitialState = () => ({
  status: "init_state",
  payload: null,
  error: null,
});

export const getIntentAction = createAction(DO_GET_INTENT);
export const stripePayAction = createAction(DO_STRIPE_PAY);
export const createOrderAction = createAction(DO_CREATE_ORDER);
export const deleteOrderAction = createAction(DO_DELETE_ORDER);
export const sendEmailAction = createAction(DO_SEND_EMAIL);

export const order_reducer = handleActions(
  {
    [requestPending(DO_GET_INTENT)]: (state) => ({
      ...state,
      status: requestPending(DO_GET_INTENT),
    }),
    [requestSuccess(DO_GET_INTENT)]: (state, { payload }) => ({
      ...state,
      status: requestSuccess(DO_GET_INTENT),
      payload,
    }),
    [requestFail(DO_GET_INTENT)]: (state, { payload }) => ({
      ...state,
      status: requestFail(DO_GET_INTENT),
      payload: null,
      error: payload,
    }),
    [requestPending(DO_STRIPE_PAY)]: (state) => ({
      ...state,
      status: requestPending(DO_STRIPE_PAY),
    }),
    [requestSuccess(DO_STRIPE_PAY)]: (state, { payload }) => ({
      ...state,
      status: requestSuccess(DO_STRIPE_PAY),
      payload,
    }),
    [requestFail(DO_STRIPE_PAY)]: (state, { payload }) => ({
      ...state,
      status: requestFail(DO_STRIPE_PAY),
      payload: null,
      error: payload,
    }),
    [requestPending(DO_CREATE_ORDER)]: (state) => ({
      ...state,
      status: requestPending(DO_CREATE_ORDER),
    }),
    [requestSuccess(DO_CREATE_ORDER)]: (state, { payload }) => ({
      ...state,
      status: requestSuccess(DO_CREATE_ORDER),
      payload,
    }),
    [requestFail(DO_CREATE_ORDER)]: (state, { payload }) => ({
      ...state,
      status: requestFail(DO_CREATE_ORDER),
      payload: null,
      error: payload,
    }),
    [requestPending(DO_DELETE_ORDER)]: (state) => ({
      ...state,
      status: requestPending(DO_DELETE_ORDER),
    }),
    [requestSuccess(DO_DELETE_ORDER)]: (state, { payload }) => ({
      ...state,
      status: requestSuccess(DO_DELETE_ORDER),
      payload,
    }),
    [requestFail(DO_DELETE_ORDER)]: (state, { payload }) => ({
      ...state,
      status: requestFail(DO_DELETE_ORDER),
      payload: null,
      error: payload,
    }),
    [requestPending(DO_SEND_EMAIL)]: (state) => ({
      ...state,
      status: requestPending(DO_SEND_EMAIL),
    }),
    [requestSuccess(DO_SEND_EMAIL)]: (state, { payload }) => ({
      ...state,
      status: requestSuccess(DO_SEND_EMAIL),
      payload,
    }),
    [requestFail(DO_SEND_EMAIL)]: (state, { payload }) => ({
      ...state,
      status: requestFail(DO_SEND_EMAIL),
      payload: null,
      error: payload,
    }),
  },
  getInitialState()
);