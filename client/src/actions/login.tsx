import { ThunkDispatch as Dispatch } from "redux-thunk";

import * as constants from "../constants";

export interface ISetUsername {
  type: constants.SET_USERNAME;
  text: string
}

export interface ISetPassword {
  type: constants.SET_PASSWORD;
  text: string
}

function username(text: string): ISetUsername {
  return {
    type: constants.SET_USERNAME,
    text: text
  };
}

function password(text: string): ISetPassword {
  return {
    type: constants.SET_PASSWORD,
    text: text
  };
}

export type LoginAction = ISetUsername | ISetPassword;

export function setUsername(event) {
  return async (dispatch: Dispatch<LoginAction, {}, any>) => {
    dispatch(username(event.target.value));
  };
}

export function setPassword(event) {
  return async (dispatch: Dispatch<LoginAction, {}, any>) => {
    dispatch(password(event.target.value));
  };
}
