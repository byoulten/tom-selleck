import { AuthenticationAction } from "../actions/current";
import { AUTHENTICATE, UNAUTHENTICATE } from "../constants";
import { ICurrent } from "../types";

export default function authReducer(
  state: ICurrent = {
    uuid: null,
    isAuthenticated: null
  },
  action: AuthenticationAction
): ICurrent {
  switch (action.type) {
    case AUTHENTICATE:
      return { ...state, uuid: "placeholder-uuid", isAuthenticated: true };
    case UNAUTHENTICATE:
      return { uuid: null, isAuthenticated: false }
  }

  return state
}
