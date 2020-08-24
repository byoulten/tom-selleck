import { SET_SEARCH, SEARCH } from "../constants";
import { ISearch } from "../types";
import { SearchAction } from "../actions/search";

export default function loginReducer(
    state: ISearch = {
        rows: null,
        term: ""
    },
    action: SearchAction
): ISearch {
    switch (action.type) {
        case SEARCH:
            return { ...state, rows: action.rows } 
        case SET_SEARCH:
            return { ...state, term: action.term } 
    }

    return state
}
