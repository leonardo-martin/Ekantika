import React, { useEffect, useState } from "react";
import { Switch, useLocation } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import Route from "./Routes";

import AppBar from "../components/AppBar";

import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import RedefinePassword from "../pages/RedefinePassword";

import Dashboard from "../pages/EKK/Dashboard";

import ClientManagement from "../pages/EKK/ClientManagement";
import ClientEditCreate from "../pages/EKK/ClientEditCreate";
import ClientPage from "../pages/EKK/ClientPage";
import ClientCollaborator from "../pages/EKK/ClientCollaborator";
import FaqPage from "../pages/EKK/Faq";

import UserList from "../pages/EKK/UserList";
import UserPage from "../pages/EKK/UserPage";

import Elements from "../pages/EKK/Elements";

import SystemProfiles from "../pages/EKK/SystemProfiles";

import Teams from "../pages/RH/Teams";
import Team from "../pages/RH/Team";
import AssessmentCenter from "../pages/RH/AssessmentCenter";
import NewAssessment from "../pages/RH/NewAsessment";

import { makeStyles } from "@material-ui/core/styles";
import RHHome from "../pages/RH/Home";

const useStyles = makeStyles((theme) => ({
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
    zIndex: 0,
  },
}));

const Routes: React.FC = () => {
  const [loadAppBar, setLoadAppBar] = useState(false);

  const classes = useStyles();
  const { pathname } = useLocation();

  useEffect(() => {
    const [, routeName] = pathname.split("/");

    if (
      routeName !== "sign-up" &&
      routeName !== "" &&
      routeName !== "redefine-password"
    ) {
      setLoadAppBar(true);
    } else {
      setLoadAppBar(false);
    }
  }, [pathname]);

  return (
    <div style={{ display: "flex" }}>
      <CssBaseline />
      {loadAppBar && <AppBar />}

      <main className={classes.content}>
        {loadAppBar && <div className={classes.appBarSpacer} />}

        <Switch>
          <Route component={Login} path="/" exact />
          <Route component={SignUp} path="/sign-up/:user_id" />
          <Route
            component={RedefinePassword}
            path="/redefine-password/:token"
          />

          <Route component={Dashboard} path="/ekk/dashboard" isPrivate />

          <Route
            component={ClientManagement}
            path="/ekk/client/management"
            isPrivate
          />
          <Route
            component={ClientPage}
            path="/ekk/client/page/:company_id"
            isPrivate
          />

          <Route component={FaqPage} path="/ekk/faq" isPrivate />

          <Route
            component={ClientEditCreate}
            path={["/ekk/client/edit/:company_id", "/ekk/client/new"]}
            isPrivate
          />

          <Route
            component={ClientCollaborator}
            path="/ekk/client/collaborator/:id"
            isPrivate
          />

          <Route component={UserList} path="/ekk/user/all" isPrivate />
          <Route
            component={UserPage}
            path={["/ekk/user/:id", "/ekk/user/new"]}
            isPrivate
          />

          <Route component={Elements} path="/ekk/elements" isPrivate />

          <Route component={SystemProfiles} path="/ekk/profiles" isPrivate />

          <Route component={RHHome} path="/rh" exact isPrivate />
          <Route component={Teams} path="/rh/teams" isPrivate />
          <Route component={Team} path="/rh/team/:team_id" isPrivate />

          <Route
            path="/rh/assessment-center"
            component={AssessmentCenter}
            exact
            isPrivate
          />
          <Route
            path="/rh/assessment-center/new/:step"
            component={NewAssessment}
            isPrivate
          />

          {/* <Route component={SignUp} path="/signup" />
            <Route component={Products} path="/products/:filter?" />
            <Route component={ProductDetail} path="/product-detail/:productId" /> */}
        </Switch>
      </main>
    </div>
  );
};

export default Routes;
