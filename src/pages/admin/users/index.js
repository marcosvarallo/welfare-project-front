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
import MenuAdmin from "../../../components/menu-admin";
import Footer from "../../../components/footer-admin";
import AuthContext from "../../../components/Context";
import DeleteIcon from "@mui/icons-material/Delete";
import Search from "@mui/icons-material/Search";
import OutlinedInput from "@mui/material/OutlinedInput";
import { GeneralStateContext, ModalContext } from "../../../App";
import { Link } from "react-router-dom";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import StraightenIcon from "@mui/icons-material/Straighten";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import RestaurantIcon from "@mui/icons-material/Restaurant";

const drawerWidth = 240;

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [Users, setUsers] = React.useState([]);
  const [Measures, setMeasures] = React.useState([]);
  const { setModalState } = useContext(ModalContext);
  const { setUserId, setUserRole, userId, userRole } = useContext(AuthContext);

  useEffect(() => {
    async function loadUsers() {
      const response = await api.get("/api/v1/user/healthProId/" + userId);
      const responseMeasures = await api.get(
        "/api/v1/newInfos/getMeasuresByUserId/" + row.id
      );
      setUsers(response.data);
      setMeasures(responseMeasures.data);
    }
    loadUsers();
  }, []);

  async function handleDelete() {
    async function deleteUser() {
      await api.delete("/api/v1/user/" + row.id);
      return (window.location.href = "/admin/users");
    }
    setModalState({
      isOpen: true,
      title: "Atenção!",
      description: "Tem certeza que deseja deletar este cliente?",
      handleClose: deleteUser,
    });
  }

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
          {row.firstName + " " + row.lastName}
        </TableCell>
        <TableCell align="center">{row.age}</TableCell>
        <TableCell align="center">{row.phoneNumber}</TableCell>
        <TableCell align="center">
          <ButtonGroup
            color="primary"
            aria-label="outlined primary button group"
            size="small"
          >
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to={"/admin/users/newInfos/" + row.id}
            >
              Adicionar
            </Button>
          </ButtonGroup>
        </TableCell>
        <TableCell align="center">
          <ButtonGroup
            color="primary"
            aria-label="outlined primary button group"
            size="small"
          >
            <Button
              variant="contained"
              color="success"
              component={Link}
              to={"/admin/users/view/" + row.id}
            >
              <StraightenIcon />
            </Button>
            <Button
              variant="contained"
              color="secondary"
              component={Link}
              to={"/admin/users/view/diet/" + row.id}
            >
              <RestaurantIcon />
            </Button>
            <Button
              variant="contained"
              color="error"
              component={Link}
              to={"/admin/users/view/training/" + row.id}
            >
              <FitnessCenterIcon />
            </Button>
          </ButtonGroup>
        </TableCell>
        <TableCell align="center">
          <ButtonGroup
            color="primary"
            aria-label="outlined primary button group"
            size="small"
          >
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to={"/admin/users/edit/" + row.id}
            >
              Atualizar
            </Button>
          </ButtonGroup>
        </TableCell>
        <TableCell>
          <IconButton aria-label="delete" onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Histórico
              </Typography>
              <Table size="large" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Data</TableCell>
                    <TableCell align="center">Peso</TableCell>
                    <TableCell align="center">Altura</TableCell>
                    <TableCell align="center">% Massa Gorda</TableCell>
                    <TableCell align="center">% Massa Magra</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Measures.map((historyRow) => (
                    <TableRow key={historyRow.id}>
                      <TableCell component="th" scope="row" align="center">
                        {historyRow.date}
                      </TableCell>
                      <TableCell align="center">{historyRow.weight}</TableCell>
                      <TableCell align="center">{historyRow.height}</TableCell>
                      <TableCell align="center">
                        {historyRow.fatMassPercentage}
                      </TableCell>
                      <TableCell align="center">
                        {historyRow.leanMassPercentage}
                      </TableCell>
                    </TableRow>
                  ))}
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

export default function UsersList() {
  const { setUserId, setUserRole, userId, userRole } = useContext(AuthContext);
  const [Users, setUsers] = useState([]);
  const [allClients, setAllClients] = useState();
  const [filterText, setFilterText] = useState("");

  const onFilter = ({ target: { value: firstName } }) => {
    setFilterText(firstName);
    if (!firstName) {
      setUsers(allClients);
      return;
    }
    setUsers(
      allClients?.filter((item) =>
        item.firstName.toLowerCase().includes(firstName.toLowerCase())
      )
    );
  };

  useEffect(() => {
    async function loadUsers() {
      const response = await api.get("/api/v1/user/healthProId/" + userId);
      console.log(response);
      setUsers(response.data);
      setAllClients(response.data);
    }
    loadUsers();
  }, []);

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <MenuAdmin title={"Meus Clientes"} />
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
                Procurar cliente
              </InputLabel>
              <OutlinedInput
                label="Procurar clientes"
                value={filterText}
                onChange={onFilter}
                disabled={allClients?.length === 0}
                placeholder={allClients?.length === 0 && "Bloqueado"}
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
                              <TableCell align="center">Nome</TableCell>
                              <TableCell align="center">Idade</TableCell>
                              <TableCell align="center">Celular</TableCell>
                              <TableCell align="center">
                                Nova Medida/Dieta/Treino
                              </TableCell>
                              <TableCell align="center">
                                Visualizar Medida/Dieta/Treino
                              </TableCell>
                              <TableCell align="center">
                                Informações do Cliente
                              </TableCell>
                              <TableCell align="center"> </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {Users.map((row) => (
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
