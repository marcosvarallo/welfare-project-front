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
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Collapse from "@mui/material/Collapse";
import ButtonGroup from "@mui/material/ButtonGroup";
import api from "../../../services/api";
import api_2 from "../../../services/api_2";
import Footer from "../../../components/footer-admin";
import AuthContext from "../../../components/Context";
import DeleteIcon from "@mui/icons-material/Delete";
import Search from "@mui/icons-material/Search";
import OutlinedInput from "@mui/material/OutlinedInput";
import { GeneralStateContext, ModalContext } from "../../../App";
import { useParams } from "react-router-dom";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuAdmin from "../../../components/menu-admin";
const drawerWidth = 240;

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [Users, setUsers] = React.useState([]);
  const [Trainings, setTrainings] = React.useState([]);
  const { setModalState } = useContext(ModalContext);
  const { setUserId, setUserRole, userId, userRole } = useContext(AuthContext);

  useEffect(() => {
    async function loadUsers() {
      //const response = await api.get("/api/v1/user/healthProId/" + userId);
      const responseTrainings = await api.get(
        "/api/v1/newInfos/getTrainingByUserId/" + row.id
      );
      //setUsers(response.data);
      setTrainings(responseTrainings.data);
      console.log(responseTrainings.data);
    }
    loadUsers();
  }, []);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" align="center">
          {row.startDate}
        </TableCell>
        <TableCell align="center">{row.endDate}</TableCell>
        <TableCell align="center">{row.objetiveType}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Informações do Treino
              </Typography>
              <Table size="large" aria-label="purchases">
                <TableBody>
                  <TableCell component="th" scope="row" align="center">
                    {row.informations}
                  </TableCell>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      })
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

const mdTheme = createTheme();

export default function UserViewTraining() {
  const { setUserId, setUserRole, userId, userRole } = useContext(AuthContext);
  const [Tranings, setTrainings] = useState([]);
  const [allTrainings, setAllTrainings] = useState();
  const [filterText, setFilterText] = useState("");
  const { idUser } = useParams();

  const onFilter = ({ target: { value: informations } }) => {
    setFilterText(informations);
    if (!informations) {
      setTrainings(allTrainings);
      return;
    }
    setTrainings(
      allTrainings?.filter((item) =>
        item.informations.toLowerCase().includes(informations.toLowerCase())
      )
    );
  };

  useEffect(() => {
    async function loadTrainings() {
      const response = await api.get(
        "/api/v1/newInfos/getTrainingByUserId/" + idUser
      );
      console.log(response);
      setTrainings(response.data);
      setAllTrainings(response.data);
    }
    loadTrainings();
  }, []);

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <MenuAdmin title={"Treinos do Cliente"} />
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
            <FormControl fullWidth sx={{ p: 0.1, mb: 5, display: "flex" }}>
              <InputLabel htmlFor="outlined-adornment-amount">
                Procurar treino
              </InputLabel>
              <OutlinedInput
                label="Procurar treinos"
                value={filterText}
                onChange={onFilter}
                disabled={allTrainings?.length === 0}
                placeholder={allTrainings?.length === 0 && "Bloqueado"}
                startAdornment={
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                }
              />
            </FormControl>
            <Grid container spacing={3}>
              <Grid item sm={12}>
                <Paper className={ClassNames.Paper}>
                  <Grid container spacing={3}>
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      marginLeft="60px"
                      marginRight="60px"
                      marginBottom="30px"
                    >
                      <TableContainer component={Paper}>
                        <Table aria-label="collapsible table">
                          <TableHead>
                            <TableRow>
                              <TableCell />
                              <TableCell align="center">
                                Data de Início
                              </TableCell>
                              <TableCell align="center">
                                Data de Término
                              </TableCell>
                              <TableCell align="center">Objetivo</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {Tranings.map((row) => (
                              <Row key={row.id} row={row} />
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Grid>
                  </Grid>
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
