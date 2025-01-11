import React from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import RoutesPrivateAdmin from "../Private";
import RoutesPrivateClient from "../ClientPrivate";

// IMPORTS ADMIN
import Dashboard from "../../pages/admin/dashboard";

import HealthProfessional from "../../pages/admin/healthProfessional";
import HealthProfessionalEdit from "../../pages/admin/healthProfessional/healthProfessional.edit";
import HealthProfessionalRegister from "../../pages/admin/healthProfessional/healthProfessional.register";
import HealthProfessionalRecoverPassword from "../../pages/admin/healthProfessional/healthProfessional.forgotPassword";
import HealthProfessionalNewPassword from "../../pages/admin/healthProfessional/healthProfessional.newPassword";
import Users from "../../pages/admin/users";
import UserEdit from "../../pages/admin/users/user.edit";
import UserRegister from "../../pages/admin/users/user.register";
import UserCheckout from "../../pages/admin/users/user.checkout";
import UserNewInfos from "../../pages/admin/users/user.newInfos";
import UserViewChart from "../../pages/admin/users/user.view";
import UserViewDiet from "../../pages/admin/users/user.viewDiet";
import UserViewTraining from "../../pages/admin/users/user.viewTraining";

//IMPORTS USER/CLIENT
import Home from "../../pages/client/home";
import ClientDetails from "../../pages/client/clients/client.measures";
import Login from "../../pages/login/login";
import AuthProvider from "../AuthProvider";
import MyTranings from "../../pages/client/clients/client.trainings";
import MyDiets from "../../pages/client/clients/client.diets";

export default function Routes() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Switch>
          <Route
            path="/forgotPassword"
            exact
            component={HealthProfessionalRecoverPassword}
          />
          <Route
            path="/register"
            exact
            component={HealthProfessionalRegister}
          />
          <Route path="/" exact component={Login} />
          {/* Rota Cliente */}
          <RoutesPrivateClient path="/user" exact component={ClientDetails} />
          <RoutesPrivateClient
            path="/user/myTrainings"
            exact
            component={MyTranings}
          />
          <RoutesPrivateClient path="/user/myDiets" exact component={MyDiets} />
          {/* Rota Admin */}
          <RoutesPrivateAdmin path="/admin" exact component={Dashboard} />
          <RoutesPrivateAdmin
            path="/admin/healthProfessional"
            exact
            component={HealthProfessional}
          />
          <RoutesPrivateAdmin
            path="/admin/healthProfessional/edit"
            exact
            component={HealthProfessionalEdit}
          />
          <RoutesPrivateAdmin
            path="/admin/healthProfessional/newPassword"
            exact
            component={HealthProfessionalNewPassword}
          />
          <RoutesPrivateAdmin path="/admin/users" exact component={Users} />
          <RoutesPrivateAdmin
            path="/admin/users/register"
            exact
            component={UserCheckout}
          />
          <RoutesPrivateAdmin
            path="/admin/users/edit/:idUser"
            exact
            component={UserEdit}
          />
          <RoutesPrivateAdmin
            path="/admin/users/newInfos/:idUser"
            exact
            component={UserNewInfos}
          />
          <RoutesPrivateAdmin
            path="/admin/users/view/:idUser"
            exact
            component={UserViewChart}
          />
          <RoutesPrivateAdmin
            path="/admin/users/view/diet/:idUser"
            exact
            component={UserViewDiet}
          />
          <RoutesPrivateAdmin
            path="/admin/users/view/training/:idUser"
            exact
            component={UserViewTraining}
          />
        </Switch>
      </AuthProvider>
    </BrowserRouter>
  );
}
