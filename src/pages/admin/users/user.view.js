import React, { useEffect, useContext, useState } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { ClassNames } from "@emotion/react";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Collapse from "@mui/material/Collapse";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import api from "../../../services/api";
import MenuAdmin from "../../../components/menu-admin";
import Footer from "../../../components/footer-admin";
import AuthContext from "../../../components/Context";
import { useParams } from "react-router-dom";
import LineChart from "../../../utils/firstChartMeasures";
import SecondLineChart from "../../../utils/secondChartMeasures";

const drawerWidth = 240;

const mdTheme = createTheme();

export default function UserViewChart() {
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <MenuAdmin title={"Medidas do Cliente"} />
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
          <Container maxWidth="lg" sx={{ mt: 6, mb: 6 }}>
            <Grid container spacing={3}>
              <Grid item sm={12}>
                <Paper>
                  <LineChart />
                </Paper>
              </Grid>
              <Grid item sm={12}>
                <Paper>
                  <SecondLineChart />
                </Paper>
              </Grid>
            </Grid>
            <Footer />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
