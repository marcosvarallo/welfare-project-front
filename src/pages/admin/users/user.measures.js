import React from "react";
import { styled, createTheme } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MuiPaper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { ClassNames } from "@emotion/react";
import Typography from "@mui/material/Typography";
import { ImportContacts } from "@mui/icons-material";
import { DateTime } from "luxon";

const Paper = styled(MuiPaper)(function () {
  return { padding: "20px" };
});

const mdTheme = createTheme();

export default function UserMeasures(props) {
  function calculaIMC(height, weight) {
    if (height != 0 || weight != 0) {
      const calculate = weight / (height * height);
      props.setData((datas) => ({
        ...datas,
        imc: calculate.toFixed(2),
      }));
    }
  }

  return (
    <React.Fragment>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item sm={12}>
            <Paper className={ClassNames.Paper}>
              <Typography variant="h6" gutterBottom>
                Medidas
              </Typography>
              <Grid id="form" container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="weight"
                    name="weight"
                    label="Peso (Kg)"
                    fullWidth
                    helperText="Ex: 71.5"
                    autoComplete="family-name"
                    variant="standard"
                    value={props.data.weight}
                    onChange={(e) => {
                      calculaIMC(props.data.height, e.target.value);
                      props.setData((datas) => ({
                        ...datas,
                        weight: e.target.value,
                      }));
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="height"
                    name="height"
                    label="Altura (Metros)"
                    fullWidth
                    helperText="Ex: 1.80"
                    autoComplete="family-name"
                    variant="standard"
                    value={props.data.height}
                    onChange={(e) => {
                      calculaIMC(e.target.value, props.data.weight);
                      props.setData((datas) => ({
                        ...datas,
                        height: e.target.value,
                      }));
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="imc"
                    name="imc"
                    label="IMC"
                    fullWidth
                    autoComplete="family-name"
                    variant="standard"
                    value={props.data.imc}
                    onChange={(e) =>
                      props.setData((datas) => ({
                        ...datas,
                        imc: e.target.value,
                      }))
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="fatMassPercentage"
                    name="fatMassPercentage"
                    label="Percentual de Massa Gorda"
                    fullWidth
                    helperText="Ex: 40"
                    autoComplete="family-name"
                    variant="standard"
                    value={props.data.fatMassPercentage}
                    onChange={(e) =>
                      props.setData((datas) => ({
                        ...datas,
                        fatMassPercentage: e.target.value,
                      }))
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="leanMassPercentage"
                    name="leanMassPercentage"
                    label="Percentual de Massa Magra"
                    fullWidth
                    helperText="Ex: 25.5"
                    autoComplete="senha"
                    variant="standard"
                    value={props.data.leanMassPercentage}
                    onChange={(e) =>
                      props.setData((datas) => ({
                        ...datas,
                        leanMassPercentage: e.target.value,
                      }))
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="date"
                    name="date"
                    label="Data atual"
                    fullWidth
                    type="date"
                    sx={{ width: 220 }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    autoComplete="given-name"
                    variant="standard"
                    //value={props.data.date}
                    value={DateTime.fromFormat(
                      props.data.date,
                      "dd/MM/yyyy"
                    ).toISODate()}
                    onChange={(e) => {
                      const date = DateTime.fromFormat(
                        e.target.value,
                        "yyyy-MM-dd"
                      );
                      props.setData((datas) => ({
                        ...datas,
                        date: date.toLocaleString(),
                      }));
                    }}
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
