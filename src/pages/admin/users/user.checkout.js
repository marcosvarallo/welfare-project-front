import React, { useImperativeHandle, useState, useContext } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import UserRegister from "../../../pages/admin/users/user.register";
import UserMeasures from "../../../pages/admin/users/user.measures";
import UserTraining from "../../../pages/admin/users/user.training";
import UserDiet from "../../../pages/admin/users/user.diet";
import MenuAdmin from "../../../components/menu-admin";
import api from "../../../services/api";
import Footer from "../../../components/footer-admin";
import Toolbar from "@mui/material/Toolbar";
import AuthContext from "../../../components/Context";
import { ModalContext } from "../../../App";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

const steps = ["Informações do Cliente", "Medidas", "Treino", "Dieta"];

const Mdtheme = createTheme();

export default function Checkout() {
  const [activeStep, setActiveStep] = React.useState(0);
  const { setModalState } = useContext(ModalContext);
  const { setUserId, setUserRole, userId, userRole } = useContext(AuthContext);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    appUserRole: "USER",
    username: "",
    password: "",
    cellphone: "",
  });
  const [measuresData, setMeasuresData] = useState({
    date: "",
    weight: "",
    height: "",
    imc: "",
    fatMassPercentage: "",
    leanMassPercentage: "",
  });
  const [trainingData, setTrainingData] = useState({
    startDate: "",
    endDate: "",
    objetiveType: "",
    informations: "",
  });
  const [dietData, setDietData] = useState({
    startDate: "",
    endDate: "",
    objetiveType: "",
    informations: "",
  });

  function handleNext() {
    if (
      userData.firstName != "" &&
      userData.lastName != "" &&
      userData.age != "" &&
      userData.username != "" &&
      userData.password != ""
    ) {
      const containsWhiteSpace = (str) => /\s/g.test(str);
      var op = containsWhiteSpace(userData.username);
      if (op == false) {
        setActiveStep(activeStep + 1);
      } else {
        setModalState({
          isOpen: true,
          title: "Erro!",
          description: "Nome de usuário possui espaço.",
        });
      }
    } else {
      setModalState({
        isOpen: true,
        title: "Erro!",
        description: "Campo obrigatório não preenchido.",
      });
    }
  }

  async function userRegister() {
    const userDataPayload = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      appUserRole: userData.appUserRole,
      age: userData.age,
      username: userData.username,
      password: userData.password,
      phoneNumber: userData.cellphone,
    };
    const response = await api.post(
      "api/v1/user/createUser/" + userId,
      userDataPayload
    );
    var clientId = response.data;
    console.log(clientId);
    if (response.status == 200 || response.status == 201) {
    } else {
      setModalState({
        isOpen: true,
        title: "Erro!",
        description: "Erro ao cadastrar o usuário, tente novamente.",
      });
    }

    const measuresDataPayload = {
      date: measuresData.date,
      weight: measuresData.weight,
      height: measuresData.height,
      imc: measuresData.imc,
      fatMassPercentage: measuresData.fatMassPercentage,
      leanMassPercentage: measuresData.leanMassPercentage,
    };
    const responseMeasures = await api.post(
      "api/v1/newInfos/newMeasures/" + clientId,
      measuresDataPayload
    );
    if (responseMeasures.status == 200 || responseMeasures.status == 201) {
    } else {
      setModalState({
        isOpen: true,
        title: "Erro!",
        description: "Erro ao cadastrar o usuário, tente novamente.",
      });
    }

    const dietDataPayload = {
      startDate: dietData.startDate,
      endDate: dietData.endDate,
      objetiveType: dietData.objetiveType,
      informations: dietData.informations,
    };
    const responseDiet = await api.post(
      "api/v1/newInfos/newDiet/" + clientId,
      dietDataPayload
    );
    if (responseDiet.status == 200 || responseDiet.status == 201) {
    } else {
      setModalState({
        isOpen: true,
        title: "Erro!",
        description: "Erro ao cadastrar o usuário, tente novamente.",
      });
    }

    const trainingDataPayload = {
      startDate: trainingData.startDate,
      endDate: trainingData.endDate,
      objetiveType: trainingData.objetiveType,
      informations: trainingData.informations,
    };
    const responseTraining = await api.post(
      "api/v1/newInfos/newTraining/" + clientId,
      trainingDataPayload
    );
    if (responseTraining.status == 200 || responseTraining.status == 201) {
    } else {
      setModalState({
        isOpen: true,
        title: "Erro!",
        description: "Erro ao cadastrar o usuário, tente novamente.",
      });
    }
  }

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  async function handleSubmit() {
    userRegister();
    async function createUser() {
      return (window.location.href = "/admin/users");
    }
    setModalState({
      isOpen: true,
      title: "Sucesso!",
      description:
        "Usuário cadastrado com sucesso, clique em ok para ir aos seus clientes.",
      handleClose: createUser,
    });
  }

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <UserRegister setData={setUserData} data={userData} />;
      case 1:
        return <UserMeasures setData={setMeasuresData} data={measuresData} />;
      case 2:
        return <UserTraining setData={setTrainingData} data={trainingData} />;
      case 3:
        return <UserDiet setData={setDietData} data={dietData} />;
      default:
        throw new Error("Unknown step");
    }
  }

  return (
    <ThemeProvider theme={Mdtheme}>
      <Box sx={{ display: "flex" }}>
        <MenuAdmin title={"Cadastro de Cliente"} />
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
                Cadastro de Cliente
              </Typography>
              <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              <React.Fragment>
                {activeStep === steps.length ? (
                  <React.Fragment>
                    <Typography variant="h5" gutterBottom>
                      Informações preenchidas com sucesso.
                    </Typography>
                    <Typography variant="subtitle1">
                      Para finalizar clique em "Cadastrar Cliente".
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                      {activeStep !== 0 && (
                        <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                          Voltar
                        </Button>
                      )}
                      <Button
                        onClick={handleSubmit}
                        sx={{ mt: 3, ml: 1 }}
                        variant="contained"
                      >
                        Cadastrar Cliente
                      </Button>
                    </Box>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    {getStepContent(activeStep)}
                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                      {activeStep !== 0 && (
                        <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                          Voltar
                        </Button>
                      )}

                      <Button
                        variant="contained"
                        onClick={handleNext}
                        sx={{ mt: 3, ml: 1 }}
                      >
                        Avançar
                      </Button>
                    </Box>
                  </React.Fragment>
                )}
              </React.Fragment>
            </Paper>
            <Footer />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
