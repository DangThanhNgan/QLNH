import { all } from 'redux-saga/effects'
import globalSaga from 'pages/Global/globalSaga'
import authSaga from 'pages/Auth/authSaga'

export default function* rootSaga() {
  yield all([globalSaga(), authSaga()])
}
