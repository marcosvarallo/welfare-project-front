import React, { useEffect, useState, useContext } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import MenuAdmin from "../../../components/menu-admin";
import api from "../../../services/api";
import Footer from "../../../components/footer-admin";
import Toolbar from "@mui/material/Toolbar";
import { useParams } from "react-router-dom";
import { ClassNames } from "@emotion/react";
import Grid from "@mui/material/Grid";
import MuiPaper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { ModalContext } from "../../../App";

const Mdtheme = createTheme();

const Paper = styled(MuiPaper)(function () {
  return { padding: "20px" };
});

export default function UserEdit() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [appUserRole, setAppUserRole] = useState("");
  const { setModalState } = useContext(ModalContext);
  const { idUser } = useParams();

  useEffect(() => {
    async function getUser() {
      var response = await api.get("/api/v1/user/" + idUser);
      setFirstName(response.data.firstName);
      setLastName(response.data.lastName);
      setAge(response.data.age);
      setPhoneNumber(response.data.phoneNumber);
      setUsername(response.data.username);
      setPassword(response.data.password);
    }
    getUser();
  }, []);

  async function handleSubmit() {
    const data = {
      id: idUser,
      firstName: firstName,
      lastName: lastName,
      age: age,
      phoneNumber: phoneNumber,
      username: username,
      password: password,
    };
    console.log(data);
    const response = await api.post("/api/v1/user/editUser/" + idUser, data);

    if (response.status == 200 || response.status == 201) {
      setModalState({
        isOpen: true,
        title: "Sucesso!",
        description: "Usuário editado com sucesso.",
      });
    } else {
      setModalState({
        isOpen: true,
        title: "Erro!",
        description:
          "Erro ao editar os dados do cliente, tente novamente ou contacte o suporte.",
      });
    }
  }

  return (
    <ThemeProvider theme={Mdtheme}>
      <Box sx={{ display: "flex" }}>
        <MenuAdmin title={"Atualização de Cliente"} />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container component="main" maxWidth="lg" sx={{ mb: 4 }}>
            <Paper
              variant="outlined"
              sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
            >
              <Typography component="h1" variant="h4" align="center">
                Atualização de Cliente
              </Typography>
              <React.Fragment>
                <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                  <Grid container spacing={3}>
                    <Grid item sm={12}>
                      <Paper className={ClassNames.Paper}>
                        <Typography variant="h6" gutterBottom>
                          Informações
                        </Typography>
                        <Grid container spacing={3}>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              required
                              id="firstName"
                              name="firstName"
                              label="Nome"
                              fullWidth
                              autoComplete="given-name"
                              variant="standard"
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              required
                              id="lastName"
                              name="lastName"
                              label="Sobrenome"
                              fullWidth
                              autoComplete="family-name"
                              variant="standard"
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              required
                              id="age"
                              name="age"
                              label="Idade"
                              fullWidth
                              autoComplete="family-name"
                              variant="standard"
                              value={age}
                              onChange={(e) => setAge(e.target.value)}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              id="cellphone"
                              name="cellphone"
                              label="Celular"
                              helperText="Ex: 51999999999"
                              fullWidth
                              autoComplete="cellphone"
                              variant="standard"
                              value={phoneNumber}
                              onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              required
                              id="username"
                              name="username"
                              label="Nome de Usuário"
                              fullWidth
                              autoComplete="family-name"
                              variant="standard"
                              value={username}
                              onChange={(e) => setUsername(e.target.value)}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              required
                              id="senha"
                              name="senha"
                              label="Senha"
                              fullWidth
                              autoComplete="senha"
                              variant="standard"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                            />
                          </Grid>
                        </Grid>
                      </Paper>
                    </Grid>
                  </Grid>
                </Container>
                <React.Fragment>
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button
                      variant="contained"
                      onClick={handleSubmit}
                      sx={{ mt: 3, ml: 1 }}
                    >
                      Atualizar
                    </Button>
                  </Box>
                </React.Fragment>
              </React.Fragment>
            </Paper>
            <Footer />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
