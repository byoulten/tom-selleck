import { LoginAction } from "../actions/login";
import { SET_USERNAME, SET_PASSWORD, CLEAR_PASSWORD } from "../constants";
import { ILogin } from "../types";

export default function loginReducer(
    state: ILogin = {
        username: "",
        password: ""
    },
    action: LoginAction
): ILogin {
    switch (action.type) {
        case SET_USERNAME:
            return { ...state, username: action.text } 
        case SET_PASSWORD:
            return { ...state, password: action.text } 
        case CLEAR_PASSWORD:
            return { ...state, password: '' } 
    }

    return state
}
