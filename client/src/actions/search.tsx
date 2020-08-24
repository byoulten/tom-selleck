import { ThunkDispatch as Dispatch } from "redux-thunk";

import * as constants from "../constants";
import axios from "axios";

export interface ISearch {
  type: constants.SEARCH;
  term: string;
  rows: any
}

function search(term, rows): ISearch {
  return {
    type: constants.SEARCH,
    term: term,
    rows: rows
  };
}

export interface ISetSearch {
  type: constants.SET_SEARCH;
  term: string;
}

function setSearch(term): ISetSearch {
  return {
    type: constants.SET_SEARCH,
    term: term
  };
}

export type SearchAction = ISearch | ISetSearch;

export function goSearch(term, username, token) {
  return async (dispatch: Dispatch<SearchAction, {}, any>) => {
    axios.post(`${constants.API_URL}/search/go`,
      {
        term: term
      },
      {
        headers: { "x-access-token": token, "username": username }
      })
      .then(response => {
        return response.data
      })
      .then(json => {
        if (json && json.response && json.response.docs) {
          //map the docs
          var rows = json.response.docs.map(doc => {

            var display = ""

            if (json.highlighting[doc.id] && json.highlighting[doc.id].hasOwnProperty("scrapeData")) {
              display = json.highlighting[doc.id].scrapeData.join()
            }

            var row = {
              recievedDateTime: new Intl.DateTimeFormat("default", {
                month: "numeric",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric"
              }).format(new Date(doc.recievedDateTime)),
              highlights: { __html: display },
              subject: doc.subject,
              email: doc.webLink,
              pdf: constants.API_URL + doc.attachmentUrl
            }

            return row
          })

          dispatch(search(term, rows.filter(row => !(!row.highlights.__html))))
        }
      })
      .catch(err => console.error(err))
  };
}

export function updateSearch(event) {
  return async (dispatch: Dispatch<SearchAction, {}, any>) => {
    console.log(event.target.value)
    dispatch(setSearch(event.target.value));
  };
}
