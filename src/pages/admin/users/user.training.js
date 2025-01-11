import React from "react";
import { styled, createTheme } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MuiPaper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { ClassNames } from "@emotion/react";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { InputLabel } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { DateTime } from "luxon";

const Paper = styled(MuiPaper)(function () {
  return { padding: "20px" };
});

const mdTheme = createTheme();

export default function UserTraining(props) {
  return (
    <React.Fragment>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item sm={12}>
            <Paper className={ClassNames.Paper}>
              <Typography variant="h6" gutterBottom>
                Treino
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="startDate"
                    name="startDate"
                    label="Data Inicial"
                    fullWidth
                    type="date"
                    sx={{ width: 220 }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    autoComplete="given-name"
                    variant="standard"
                    //value={props.data.startDate}
                    value={DateTime.fromFormat(
                      props.data.startDate,
                      "dd/MM/yyyy"
                    ).toISODate()}
                    onChange={(e) => {
                      const startDate = DateTime.fromFormat(
                        e.target.value,
                        "yyyy-MM-dd"
                      );
                      props.setData((datas) => ({
                        ...datas,
                        startDate: startDate.toLocaleString(),
                      }));
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="endDate"
                    name="endDate"
                    label="Data Final"
                    fullWidth
                    inputFormat="dd/MM/yyyy"
                    type="date"
                    sx={{ width: 220 }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    autoComplete="family-name"
                    variant="standard"
                    //value={props.data.endDate}
                    value={DateTime.fromFormat(
                      props.data.endDate,
                      "dd/MM/yyyy"
                    ).toISODate()}
                    onChange={(e) => {
                      const endDate = DateTime.fromFormat(
                        e.target.value,
                        "yyyy-MM-dd"
                      );
                      props.setData((datas) => ({
                        ...datas,
                        endDate: endDate.toLocaleString(),
                      }));
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="objetive-type">Objetivo</InputLabel>
                    <Select
                      id="objetive-type"
                      labelId="objetive-type"
                      name="objetiveType"
                      label={"Objetivo"}
                      fullWidth
                      autoComplete="family-name"
                      variant="outlined"
                      value={props.data.objetiveType}
                      onChange={(e) =>
                        props.setData((datas) => ({
                          ...datas,
                          objetiveType: e.target.value,
                        }))
                      }
                    >
                      <MenuItem value={"HIPERTROFIA"}>HIPERTROFIA</MenuItem>
                      <MenuItem value={"EMAGRECIMENTO"}>EMAGRECIMENTO</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="informations"
                    name="informations"
                    label="Treino"
                    multiline
                    rows={8}
                    fullWidth
                    autoComplete="family-name"
                    value={props.data.informations}
                    onChange={(e) =>
                      props.setData((datas) => ({
                        ...datas,
                        informations: e.target.value,
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
