import React from "react";
import { styled, createTheme } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MuiPaper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { ClassNames } from "@emotion/react";
import Typography from "@mui/material/Typography";

const Paper = styled(MuiPaper)(function () {
  return { padding: "20px" };
});

export default function UserRegister(props) {
  console.log(props.text);
  return (
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
                    value={props.data.firstName}
                    onChange={(e) =>
                      props.setData((datas) => ({
                        ...datas,
                        firstName: e.target.value,
                      }))
                    }
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
                    value={props.data.lastName}
                    onChange={(e) =>
                      props.setData((datas) => ({
                        ...datas,
                        lastName: e.target.value,
                      }))
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="age"
                    name="age"
                    label="Idade"
                    helperText="Ex: 25"
                    fullWidth
                    autoComplete="family-name"
                    variant="standard"
                    value={props.data.age}
                    onChange={(e) =>
                      props.setData((datas) => ({
                        ...datas,
                        age: e.target.value,
                      }))
                    }
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
                    value={props.data.cellphone}
                    onChange={(e) =>
                      props.setData((datas) => ({
                        ...datas,
                        cellphone: e.target.value,
                      }))
                    }
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
                    value={props.data.username}
                    onChange={(e) =>
                      props.setData((datas) => ({
                        ...datas,
                        username: e.target.value,
                      }))
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    type="password"
                    required
                    id="senha"
                    name="senha"
                    label="Senha"
                    fullWidth
                    autoComplete="senha"
                    variant="standard"
                    value={props.data.password}
                    onChange={(e) =>
                      props.setData((datas) => ({
                        ...datas,
                        password: e.target.value,
                      }))
                    }
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}
