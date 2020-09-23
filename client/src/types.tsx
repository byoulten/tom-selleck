export interface ICurrent {
  isAuthenticated: boolean | null;
  uuid: string | null;
}

export interface ILogin {
  username: string | null;
  password: string | null;
}

export interface ISearch {
  rows: any;
  term: string | null;
}

