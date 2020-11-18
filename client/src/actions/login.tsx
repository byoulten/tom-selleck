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

export interface IClearPassword {
  type: constants.CLEAR_PASSWORD
}

function un(text: string): ISetUsername {
  return {
    type: constants.SET_USERNAME,
    text: text
  };
}

function pw(text: string): ISetPassword {
  return {
    type: constants.SET_PASSWORD,
    text: text
  };
}

function clearPw(): IClearPassword {
  return {
    type: constants.CLEAR_PASSWORD
  };
}

export type LoginAction = ISetUsername | ISetPassword | IClearPassword;

export function setUsername(event) {
  return async (dispatch: Dispatch<LoginAction, {}, any>) => {
    dispatch(un(event.target.value));
  };
}

export function setPassword(event) {
  return async (dispatch: Dispatch<LoginAction, {}, any>) => {
    dispatch(pw(event.target.value));
  };
}

export function clearPassword() {
  return async (dispatch: Dispatch<LoginAction, {}, any>) => {
    dispatch(clearPw());
  };
}
