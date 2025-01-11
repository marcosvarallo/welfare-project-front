import React, { useContext, useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Footer from "../../../components/footer-admin";
import api from "../../../services/api_2";
import { ModalContext } from "../../../App";
import CircularProgress from "@mui/material/CircularProgress";
import LogoSystem from "../../../assets/logo_welfare.png";

const theme = createTheme();

const HealthProfessionalRecoverPassword = () => {
  const [loading, setLoading] = useState(false);
  const { setModalState } = useContext(ModalContext);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setLoading(true);
    api("/healthPro/recoverPassword?email=" + data.get("email"), {
      method: "GET",
    })
      .then(setLoading(true))
      .then((data) => {
        if (!data.ok) {
          setModalState({
            isOpen: true,
            title: "Endereço de email não encontrado!",
            description:
              "Revise os dados enviados ou entre em contato com o suporte.",
          });
          setLoading(false);
        }
      })
      .then((data) => {
        setModalState({
          isOpen: true,
          title: "Um email foi enviado com a sua nova senha!",
          description: "Não esqueça de olhar a caixa de spam.",
          handleClose: redirect,
        });
        setLoading(false);
      })
      .catch(() => {
        setModalState({
          isOpen: true,
          title: "Recuperação de senha não efetuada, tente novamente!",
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
            marginTop: 20,
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
            Recuperar Senha
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{ mt: 3 }}
            onSubmit={handleSubmit}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
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
              {loading ? <CircularProgress /> : "Enviar"}
            </Button>
            <Grid container justifyContent="flex-end"></Grid>
          </Box>
        </Box>
        <Footer sx={{ mt: 54 }} />
      </Container>
    </ThemeProvider>
  );
};

export default HealthProfessionalRecoverPassword;
