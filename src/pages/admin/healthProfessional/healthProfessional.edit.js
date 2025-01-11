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
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { InputLabel } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import useStorage from "../../../utils/useStorage";

const Mdtheme = createTheme();

const Paper = styled(MuiPaper)(function () {
  return { padding: "20px" };
});

export default function HealthProfessionalEdit() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [type, setType] = useState("");
  const [email, setEmail] = useState("");
  const [enabled, setEnabled] = useState("");
  const [password, setPassword] = useState("");
  const { setModalState } = useContext(ModalContext);
  const [userId, setUserIdStorage] = useStorage("userId");

  useEffect(() => {
    async function getHealthPro() {
      var response = await api.get("/api/v1/healthPro/" + userId);
      console.log(response);
      setFirstName(response.data.firstName);
      setLastName(response.data.lastName);
      setAge(response.data.age);
      setType(response.data.type);
      setEmail(response.data.email);
      setEnabled(response.data.enabled);
      setPassword(response.data.password);
    }
    getHealthPro();
  }, []);

  async function handleSubmit() {
    const data = {
      id: userId,
      firstName: firstName,
      lastName: lastName,
      age: age,
      type: type,
      email: email,
      enabled: true,
      password: password,
      appUserRole: "ADMIN",
    };
    console.log(data);
    const response = await api.put("/api/v1/healthPro/" + userId, data);

    if (response.status == 200 || response.status == 201) {
      setModalState({
        isOpen: true,
        title: "Sucesso!",
        description: "Informações editadas com sucesso.",
      });
    } else {
      setModalState({
        isOpen: true,
        title: "Erro!",
        description:
          "Erro ao editar os seus dados, tente novamente ou contacte o suporte.",
      });
    }
  }

  return (
    <ThemeProvider theme={Mdtheme}>
      <Box sx={{ display: "flex" }}>
        <MenuAdmin title={"Minhas Informações"} />
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
                Atualizar Informações
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
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                              >
                                <MenuItem value={"NUTRICIONISTA"}>
                                  NUTRICIONISTA
                                </MenuItem>
                                <MenuItem value={"PERSONAL"}>PERSONAL</MenuItem>
                              </Select>
                            </FormControl>
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
