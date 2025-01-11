import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../components/Context";
import api from "../services/api_2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { ModalContext } from "../App";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const SecondLineChart = () => {
  const { setModalState } = useContext(ModalContext);
  const { idUser } = useParams();
  const [measures, setMeasures] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      //const response = await api.get("/api/v1/user/healthProId/" + userId);
      api("/newInfos/getMeasuresByUserId/" + idUser, {
        method: "GET",
      })
        .then((data) => {
          data.json().then((json) => {
            console.log(json);
            setMeasures(json);
          });
        })
        .catch(() => {
          setModalState({
            isOpen: true,
            title: "Medidas não encontrados para este usuário.",
            description:
              "Revise se medidas foram realmente cadastradas para este usuário ou entre em contato com o suporte.",
          });
        });
    };
    loadUsers();
  }, []);

  console.log(measures);

  var data = {
    labels: measures?.map((x) => x.date),
    datasets: [
      {
        label: "IMC",
        data: measures?.map((x) => x.imc),
        tension: 0.1,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 2,
      },
    ],
  };

  var options = {
    layout: {
      padding: 20,
    },
    maintainAspectRatio: false,
    scales: {
      x: {
        min: 0,
        max: 100,
      },
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Evolução do Índice de Massa Corporal",
      },
      lengend: {
        display: true,
        text: "test",
        labels: {
          fontSize: 26,
        },
      },
    },
  };

  return (
    <div>
      <Line data={data} options={options} height={400} />
    </div>
  );
};

export default SecondLineChart;
