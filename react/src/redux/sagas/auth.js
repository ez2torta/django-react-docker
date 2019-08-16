import { put, takeEvery, call } from 'redux-saga/effects'
import axios from 'axios'

function loginCall (userData) {
  // console.log(userData)
  // userData  => user, pass
  const loginURL = process.env.REACT_APP_API_URL + '/api/login'
  var querystring = require('querystring')
  return axios.post(loginURL, querystring.stringify({ username: userData.user, password: userData.pass }))
}

export function * loginSaga (action) {
  try {
    const userdata = action.payload // user, pass
    yield put({ type: 'LOGIN_STATUS', status: 'loading' })
    const resp = yield call(loginCall, userdata)
    yield put({
      type: 'USER_DATA_RECEIVE',
      payload: resp.data
    })
    yield put({ type: 'LOGIN_STATUS', status: 'complete' })
    // Hacer la redirección? (la va a hacer el componente)
  } catch (err) {
    yield put({ type: 'LOGIN_STATUS', status: 'error', err })
  }
}

export function * logoffSaga (action) {
  yield put({
    type: 'USER_DATA_RECEIVE',
    payload: null
  })
}

export const authSagas = [
  takeEvery('LOGIN', loginSaga),
  takeEvery('LOGOFF', logoffSaga)
]
