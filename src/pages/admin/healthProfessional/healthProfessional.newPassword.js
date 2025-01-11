import React, { useEffect, useState, useContext } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import MenuAdmin from "../../../components/menu-admin";
import api from "../../../services/api";
import Footer from "../../../components/footer-admin";
import Toolbar from "@mui/material/Toolbar";
import { useParams, Redirect } from "react-router-dom";
import { ClassNames } from "@emotion/react";
import Grid from "@mui/material/Grid";
import MuiPaper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { ModalContext } from "../../../App";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { InputLabel } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import useStorage from "../../../utils/useStorage";

const Mdtheme = createTheme();

const Paper = styled(MuiPaper)(function () {
  return { padding: "20px" };
});

export default function HealthProfessionalNewPassword() {
  const [password, setPassword] = useState("");
  const { setModalState } = useContext(ModalContext);
  const [userId, setUserIdStorage] = useStorage("userId");

  async function handleSubmit() {
    const data = {
      id: userId,
      password: password,
    };
    console.log(data);
    const response = await api.post("/api/v1/healthPro/newPassword", data);

    if (response.status == 200 || response.status == 201) {
      setModalState({
        isOpen: true,
        title: "Sucesso!",
        description: "Nova senha cadastrada com sucesso.",
        handleClose: redirect,
      });
    } else {
      setModalState({
        isOpen: true,
        title: "Erro!",
        description:
          "Erro ao definir uma nova senha, tente novamente ou contacte o suporte.",
      });
    }
  }

  function redirect() {
    return (window.location.href = "/admin");
  }

  return (
    <ThemeProvider theme={Mdtheme}>
      <Box sx={{ display: "flex" }}>
        <MenuAdmin title={"Nova Senha"} />
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
                Nova Senha
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
                              id="password"
                              name="password"
                              label="Senha"
                              type="password"
                              fullWidth
                              autoComplete="given-name"
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
