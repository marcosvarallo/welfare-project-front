import React, { useState, useContext } from "react";
import { useHistory } from "react-router";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import api from "../../services/api";
import AuthContext from "../../components/Context";
import { AutoAwesome } from "@mui/icons-material";
import { Redirect } from "react-router-dom";
import Paper from "@mui/material/Paper";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { GeneralStateContext, ModalContext } from "../../App";
import LogoSystem from "../../assets/logo_welfare.png";
import ImageLogin from "../../../src/assets/1.jpg";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="">
        Welfare
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const initialState = { email: "", password: "" };

const theme = createTheme();

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setGeneralState } = useContext(GeneralStateContext);
  const { setModalState } = useContext(ModalContext);
  const { setUserId, setUserRole, userId, userRole } = useContext(AuthContext);

  async function handleSubmit(e) {
    e.preventDefault();
    await api
      .post("/api/v1/login", { email, password })
      .then((res) => {
        setGeneralState({ logged: true });
        if (res.status == 200 && res.data.userRole == "ADMIN") {
          setUserRole(res.data.userRole);
          setUserId(res.data.userId);
        } else if (res.status == 200 && res.data.userRole == "USER") {
          setUserRole(res.data.userRole);
          setUserId(res.data.userId);
        }
      })
      .catch(() => {
        setGeneralState({ logged: false });
        setModalState({
          isOpen: true,
          title: "Erro ao fazer login!",
          description:
            "Email ou senha incorreto, tente novamente ou entre em contato com o suporte.",
        });
        setEmail(initialState.email);
        setPassword(initialState.password);
      });
  }
  if (userId) {
    if (userRole === "ADMIN") return <Redirect to="/admin" />;
    else return <Redirect to="/user" />;
  }
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${ImageLogin})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
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
              Bem-vindo
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Senha"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSubmit}
              >
                Entrar
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/forgotPassword" variant="body2">
                    {"Esqueceu sua senha?"}
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/register" variant="body2">
                    {"Não tem uma conta? Cadastra-se"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
