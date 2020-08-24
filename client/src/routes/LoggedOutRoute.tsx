import * as React from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";

import history from "../history";

interface IProps {
  exact?: boolean;
  isAuthenticated: boolean | null;
  path: string;
  component: React.ComponentType<any>;
}

const LoggedOutRoute = ({
  component: Component,
  isAuthenticated,
  ...otherProps
}: IProps) => {
  if (isAuthenticated === true) {
    history.push("/search");
  }

  return (
    <>
      <Route
        render={otherProps => (
          <>
            <Component {...otherProps} />
          </>
        )}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps
)(LoggedOutRoute);
