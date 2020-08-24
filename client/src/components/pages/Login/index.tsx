import * as React from "react";
import { connect, useDispatch } from "react-redux";
import './styles.scss'

import { setUsername, setPassword  } from "../../../actions/login";
import { logIn } from "../../../actions/current";

interface IProps {
  logInConnect: (username, password) => void;
  setUsernameConnect: (event) => void;
  setPasswordConnect: (event) => void;
  username: string;
  password: string;
}

const LogIn = ({ logInConnect, setUsernameConnect, setPasswordConnect, username, password }: IProps) => (
  <div className="login">
    <h2>I'm gonna need to see some identification</h2>

    <input
        placeholder="Username"
        onChange={setUsernameConnect}
      />
      <input
        placeholder="Password"
        type="password"
        onChange={setPasswordConnect}
      />

    <button onClick={() => logInConnect(username, password)}>Login</button>
  </div>
);

const mapStateToProps = (state) => {
  return {
    username: state.login.username,
    password: state.login.password
  }
};

const mapDispatchToProps = {
  logInConnect: logIn,
  setUsernameConnect: setUsername,
  setPasswordConnect: setPassword
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LogIn);
