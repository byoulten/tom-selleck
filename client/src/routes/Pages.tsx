import * as React from "react";
import { Route, Switch } from "react-router-dom";

import About from "../components/pages/About";
import Home from "../components/pages/Home";
import NotFound from "../components/pages/NotFound";
import Terms from "../components/pages/Terms";
import Search from "../components/pages/Search";

import LoggedInRoute from "../routes/LoggedInRoute";
import LoggedOutRoute from "../routes/LoggedOutRoute";

const Pages = () => {
  return (
    <Switch>
      <LoggedOutRoute path="/" exact={true} component={Home} />
      <LoggedInRoute path="/search" exact={true} component={Search} />
      <Route path="/about" exact={true} component={About} />
      <Route path="/terms" exact={true} component={Terms} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default Pages;
