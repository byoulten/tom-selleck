import * as React from "react";
import { connect } from "react-redux";

import { logOut } from "../../../actions/current";

interface IProps {
  logOutConnect: () => void;
}

const LogOut = ({ logOutConnect }: IProps) => (
  <>
    <a href="#" onClick={logOutConnect}>Logout</a>
  </>
);

const mapDispatchToProps = {
  logOutConnect: logOut
};

export default connect(
  null,
  mapDispatchToProps,
)(LogOut);
