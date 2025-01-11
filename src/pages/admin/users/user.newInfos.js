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
import { useParams } from "react-router-dom";
import { ModalContext } from "../../../App";
import { Link } from "react-router-dom";

const steps = ["Medidas", "Treino", "Dieta"];
const mutanteButton = "";
const Mdtheme = createTheme();

export default function NewInfos() {
  const [activeStep, setActiveStep] = React.useState(0);
  const { setModalState } = useContext(ModalContext);
  const { setUserId, setUserRole, userId, userRole } = useContext(AuthContext);
  const { idUser } = useParams();
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
    setActiveStep(activeStep + 1);
  }

  async function userNewMeasure() {
    const measuresDataPayload = {
      date: measuresData.date,
      weight: measuresData.weight,
      height: measuresData.height,
      imc: measuresData.imc,
      fatMassPercentage: measuresData.fatMassPercentage,
      leanMassPercentage: measuresData.leanMassPercentage,
    };
    const responseMeasures = await api.post(
      "api/v1/newInfos/newMeasures/" + idUser,
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
  }

  async function userNewDiet() {
    const dietDataPayload = {
      startDate: dietData.startDate,
      endDate: dietData.endDate,
      objetiveType: dietData.objetiveType,
      informations: dietData.informations,
    };
    const responseDiet = await api.post(
      "api/v1/newInfos/newDiet/" + idUser,
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
  }

  async function userNewTraining() {
    const trainingDataPayload = {
      startDate: trainingData.startDate,
      endDate: trainingData.endDate,
      objetiveType: trainingData.objetiveType,
      informations: trainingData.informations,
    };
    const responseTraining = await api.post(
      "api/v1/newInfos/newTraining/" + idUser,
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

  function handleRegister() {
    switch (activeStep) {
      case 0:
        userNewMeasure();
        setModalState({
          isOpen: true,
          title: "Sucesso!",
          description: "Nova medida cadastrada com sucesso.",
        });
        break;
      case 1:
        userNewTraining();
        setModalState({
          isOpen: true,
          title: "Sucesso!",
          description: "Novo treino cadastrado com sucesso.",
        });
        break;
      case 2:
        userNewDiet();
        setModalState({
          isOpen: true,
          title: "Sucesso!",
          description: "Nova dieta cadastrada com sucesso.",
        });
        break;
    }
  }

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <UserMeasures setData={setMeasuresData} data={measuresData} />;
      case 1:
        return <UserTraining setData={setTrainingData} data={trainingData} />;
      case 2:
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
                Nova Medida/Treino/Dieta
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
                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                      {activeStep !== 0 && (
                        <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                          Voltar
                        </Button>
                      )}
                      <Button
                        button
                        component={Link}
                        to={"/admin/users/view/" + idUser}
                        sx={{ mt: 3, ml: 1 }}
                        variant="contained"
                      >
                        Visualizar Cliente
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
                        variant="outlined"
                        onClick={handleNext}
                        sx={{ mt: 3, ml: 50 }}
                      >
                        Avançar
                      </Button>
                      <Button
                        variant="contained"
                        onClick={handleRegister}
                        sx={{ mt: 3, ml: 50 }}
                      >
                        Cadastrar
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
