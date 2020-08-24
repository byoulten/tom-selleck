import * as React from "react";
import { connect } from "react-redux";
import { Route, Router } from "react-router-dom";
import logo from './tom_selleck_logo.png';

import history from "./history";
import Nav from "./components/Nav";
import Pages from "./routes/Pages";
import { checkAuthentication } from "./actions/current";

interface IProps {
  checkAuthenticationConnect: (username, token) => void;
  isAuthenticated: boolean | null;
  token: string;
  username: string;
}

const App = ({
  checkAuthenticationConnect,
  isAuthenticated,
  token,
  username
}: IProps) => {
  React.useEffect(() => {
    checkAuthenticationConnect(username, token);
  }, []);

  const app = isAuthenticated !== null ? (
    <Router history={history}>
      <Nav />
      <h1><img src={logo} alt="Logo" /></h1>
      <Route component={Pages} />
    </Router>
  ) : null;

  return (
    <div className="App">
      {app}
    </div>
  );
}

const mapStateToProps = (state) => ({
  username: state.login.username,
  token: state.auth.token,
  isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = {
  checkAuthenticationConnect: checkAuthentication
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
