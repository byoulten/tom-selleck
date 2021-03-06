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

export function goSearch(term, username) {
  return async (dispatch: Dispatch<SearchAction, {}, any>) => {
    axios.post(process.env.REACT_APP_SEARCH_ENDPOINT, { term: term }, { withCredentials: true })
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
              pdf: process.env.REACT_APP_FILES_ENDPOINT + "?id=" + doc.attachmentId
            }

            console.log(row.pdf)

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
    dispatch(setSearch(event.target.value));
  };
}
