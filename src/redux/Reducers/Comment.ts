import { createAction, handleActions } from "redux-actions"
import {
  requestSuccess,
  requestFail,
  requestPending,
} from "redux/ApiCaller/RequestStatus"

import { DO_CREATE_COMMENT } from "constants/index"

export const getInitialState = () => ({
  status: "init_state",
  payload: null,
  error: null,
})

export const crateCommentAction = createAction(DO_CREATE_COMMENT)

export const comment_reducer = handleActions(
  {
    [requestPending(DO_CREATE_COMMENT)]: (state) => ({
      ...state,
      status: requestPending(DO_CREATE_COMMENT),
    }),
    [requestSuccess(DO_CREATE_COMMENT)]: (state, { payload }) => ({
      ...state,
      status: requestSuccess(DO_CREATE_COMMENT),
      payload,
    }),
    [requestFail(DO_CREATE_COMMENT)]: (state, { payload }) => ({
      ...state,
      status: requestFail(DO_CREATE_COMMENT),
      payload: null,
      error: payload,
    }),
  },
  getInitialState()
)
