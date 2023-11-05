import React, { Fragment, Suspense, lazy } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { Loader } from "../../components/loading";
import Notfound from "../../pages/notfound/NotFound";
import { ROUTER_CONST } from "../paramsConst/RouterConst";
import PrivateRoute from "./privateRouter";

const Home = lazy(() => import("../../pages/home"));
const Game = lazy(() => import("../../pages/games"));
const Oauth = lazy(() => import("../../pages/oauth"));
const Dashboard = lazy(() => import("../../pages/dashboard/Dashboard"));
// const History = lazy(() => import("../../pages/history/History"))
const Profile = lazy(() => import("../../pages/profile/Profile"))

const AppRoutes = () => {
  return (
    <Fragment>
      <Suspense fallback={Loader}>
        <Switch>
          <PrivateRoute exact path={ROUTER_CONST.home} component={Home} />
          <Route exact path={ROUTER_CONST.login} component={Oauth} />
         
          <PrivateRoute exact path={ROUTER_CONST.game} component={Game} />
          <PrivateRoute
            exact
            path={ROUTER_CONST.dashboard}
            component={Dashboard}
          />
          <PrivateRoute
            exact
            path={ROUTER_CONST.dashboard + "/:id"}
            component={Dashboard}
          />
          {/* <PrivateRoute
            exact
            path={ROUTER_CONST.history + "/:id"}
            component={History}
          /> */}
           <PrivateRoute
            exact
            path={ROUTER_CONST.profile}
            component={Profile}
          />
           <Route exact path="*" component={Notfound} />
        </Switch>
      </Suspense>
    </Fragment>
  );
};
export default withRouter(AppRoutes);
