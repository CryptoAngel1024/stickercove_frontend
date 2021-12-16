import { all } from "redux-saga/effects"
import { rootCommentSaga } from "./Comment"
import { rootOrderSaga } from "./Order"

export const appSagas = function* () {
  yield all([rootCommentSaga(), rootOrderSaga()])
}
