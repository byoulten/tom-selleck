export const AUTHENTICATE = "AUTHENTICATE";
export type AUTHENTICATE = typeof AUTHENTICATE;

export const UNAUTHENTICATE = "UNAUTHENTICATE";
export type UNAUTHENTICATE = typeof UNAUTHENTICATE;

export const SET_USERNAME = "SET_USERNAME";
export type SET_USERNAME = typeof SET_USERNAME;

export const SET_PASSWORD = "SET_PASSWORD";
export type SET_PASSWORD = typeof SET_PASSWORD;

export const SEARCH = "SEARCH";
export type SEARCH = typeof SEARCH;

export const SET_SEARCH = "SET_SEARCH";
export type SET_SEARCH = typeof SET_SEARCH;

export const API_URL = process.env.REACT_APP_API_SCHEME + "://" + process.env.REACT_APP_API_HOSTNAME + ":" + process.env.REACT_APP_API_PORT;
