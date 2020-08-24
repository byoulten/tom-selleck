import { ThunkDispatch as Dispatch } from "redux-thunk";

import * as constants from "../constants";
import axios from "axios"
import { runInThisContext } from "vm";

export interface IAuthenticate {
  type: constants.AUTHENTICATE;
  token: string;
}

function authenticate(token): IAuthenticate {
  return {
    type: constants.AUTHENTICATE,
    token: token
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
    await axios.post(constants.API_URL + "/auth/login",
      {
        username: username,
        password: password
      })
      .then(async (res) => {
        if (res.status == 200 && res.data.token) {
          await window.localStorage.setItem("authenticated", "true");
          dispatch(authenticate(res.data.token));
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

export function checkAuthentication(username, token) {
  return async (dispatch: Dispatch<AuthenticationAction, {}, any>) => {
    await axios.post(constants.API_URL + "/auth/me",
      {
        username: username
      }, {
        headers: {
          "x-access-token": `${token}` 
        }
      })
      .then(async (res) => {
        console.log(res)
        if (res.status == 200 && res.data.id && res.data.auth) {
          await window.localStorage.setItem("authenticated", "true");
          dispatch(authenticate(token))
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
