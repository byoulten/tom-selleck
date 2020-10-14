import { ThunkDispatch as Dispatch } from "redux-thunk";

import * as constants from "../constants";
import axios from "axios"

export interface IAuthenticate {
  type: constants.AUTHENTICATE;
}

function authenticate(): IAuthenticate {
  return {
    type: constants.AUTHENTICATE
  };
}

export interface IUnauthenticate {
  type: constants.UNAUTHENTICATE;
}

function unauthenticate(): IUnauthenticate {
  return {
    type: constants.UNAUTHENTICATE,
  };
}

export type AuthenticationAction = IAuthenticate | IUnauthenticate;

export function logIn(username, password) {
  return async (dispatch: Dispatch<IAuthenticate, {}, any>) => {
    await axios.post(process.env.REACT_APP_LOGIN_ENDPOINT,
      {
        username: username,
        password: password
      })
      .then(async (res) => {
        if (res.status == 200 && res.data.auth) {
          await window.localStorage.setItem("authenticated", res.data.auth);
          dispatch(authenticate());
        } else {
          await window.localStorage.setItem("authenticated", "false");
        }
      })
      .catch(err => {
        console.log(err)
      })
  };
}

export function logOut() {
  return async (dispatch: Dispatch<AuthenticationAction, {}, any>) => {
    await window.localStorage.setItem("authenticated", "false");
    dispatch(unauthenticate());
  };
}

export function checkAuthentication(username) {
  return async (dispatch: Dispatch<AuthenticationAction, {}, any>) => {
    await axios.post(process.env.REACT_APP_AUTH_ENDPOINT, { username: username }, { withCredentials: true })
    .then(async (res) => {
        console.log(res)
        if (res.status == 200 && res.data.id && res.data.auth) {
          await window.localStorage.setItem("authenticated", "true");
          dispatch(authenticate())
        } else {
          await window.localStorage.setItem("authenticated", "false");
          dispatch(unauthenticate())
        }
      })
      .catch(async (err) => {
        console.log(err)
        await window.localStorage.setItem("authenticated", "false");
        dispatch(unauthenticate())
      })

  };
}
