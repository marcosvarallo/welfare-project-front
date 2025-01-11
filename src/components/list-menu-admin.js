import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import PeopleIcon from "@mui/icons-material/People";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import InfoIcon from "@mui/icons-material/Info";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import HttpsIcon from "@mui/icons-material/Https";

export const mainListItems = (
  <div>
    <ListItem button component={Link} to="/admin">
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="Menu" />
    </ListItem>
    <ListItem button component={Link} to="/admin/users">
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Meus Clientes" />
    </ListItem>
    <ListItem button component={Link} to="/admin/users/register">
      <ListItemIcon>
        <PersonAddAlt1Icon />
      </ListItemIcon>
      <ListItemText primary="Cadastrar Cliente" />
    </ListItem>
  </div>
);
// todo: fazer healthpro edit
export const secondaryListItems = (
  <div>
    <ListSubheader inset>Opções</ListSubheader>
    <ListItem button component={Link} to="/admin/healthProfessional/edit">
      <ListItemIcon>
        <InfoIcon />
      </ListItemIcon>
      <ListItemText primary="Minhas Informações" />
    </ListItem>
    <ListItem
      button
      component={Link}
      to="/admin/healthProfessional/newPassword"
    >
      <ListItemIcon>
        <HttpsIcon />
      </ListItemIcon>
      <ListItemText primary="Nova Senha" />
    </ListItem>
    <ListItem button onClick={confirmExit}>
      <ListItemIcon>
        <LogoutIcon />
      </ListItemIcon>
      <ListItemText primary="Sair" />
    </ListItem>
  </div>
);

async function confirmExit() {
  localStorage.clear();
  window.location.href = "/";
}
