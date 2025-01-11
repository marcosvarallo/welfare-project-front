import React, { useContext, useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Footer from "../../../components/footer-admin";
import api from "../../../services/api_2";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { InputLabel } from "@mui/material";
import { ModalContext } from "../../../App";
import CircularProgress from "@mui/material/CircularProgress";
import LogoSystem from "../../../assets/logo_welfare.png";
import { Redirect } from "react-router-dom";

const theme = createTheme();

const HealthProfessionalRegister = () => {
  const { setModalState } = useContext(ModalContext);
  const [loading, setLoading] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setLoading(true);
    api("/healthPro", {
      method: "POST",
      body: JSON.stringify({
        firstName: data.get("firstName"),
        lastName: data.get("lastName"),
        age: data.get("age"),
        email: data.get("email"),
        password: data.get("password"),
        type: data.get("professionalType"),
        appUserRole: "ADMIN",
      }),
    })
      .then(setLoading(true))
      .then((data) => {
        if (!data.ok) {
          setModalState({
            isOpen: true,
            title: "Cadastro não efetuado, tente novamente!",
            description:
              "Revise os dados enviados ou entre em contato com o suporte.",
          });
          setLoading(false);
        }
      })
      .then((data) => {
        setModalState({
          isOpen: true,
          title: "Sucesso!",
          description: "Cadastro realizado.",
          handleClose: redirect,
        });
        setLoading(false);
      })
      .catch(() => {
        setModalState({
          isOpen: true,
          title: "Cadastro não efetuado, tente novamente!",
          description:
            "Revise os dados enviados ou entre em contato com o suporte.",
        });
        setLoading(false);
      });
  };

  function redirect() {
    setLoading(false);
    return (window.location.href = "/");
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 12,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography>
            <img
              style={{
                width: 150,
                height: 150,
                display: true,
              }}
              src={LogoSystem}
              alt="Logo Sistema"
            />
          </Typography>
          <Typography component="h1" variant="h5">
            Cadastro
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{ mt: 3 }}
            onSubmit={handleSubmit}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  autoComplete="given-name"
                  name="firstName"
                  fullWidth
                  id="firstName"
                  label="Nome"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Sobrenome"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="age"
                  label="Idade"
                  name="age"
                  autoComplete="age"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel
                    id="healthpro-type"
                    labelWidth={"text".length * 4}
                  >
                    Profissão
                  </InputLabel>
                  <Select
                    labelWidth={"text".length * 4}
                    labelId="healthpro-type"
                    id="healthpro-type"
                    name="professionalType"
                    label={"Profissão"}
                    size="medium"
                    fullWidth
                    autoComplete="professional-type"
                    variant="outlined"
                    required
                  >
                    <MenuItem value={"NUTRICIONISTA"}>NUTRICIONISTA</MenuItem>
                    <MenuItem value={"PERSONAL"}>PERSONAL</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Endereço de Email"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? <CircularProgress /> : "Cadastrar"}
            </Button>
            <Grid container justifyContent="flex-end"></Grid>
          </Box>
        </Box>
        <Footer sx={{ mt: 36 }} />
      </Container>
    </ThemeProvider>
  );
};

export default HealthProfessionalRegister;
