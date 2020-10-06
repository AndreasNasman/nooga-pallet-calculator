import { Button } from "@material-ui/core";
import { Add, Print } from "@material-ui/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";
import { BarChart } from "./components/BarChart/BarChart";
import { DeliveryInformation } from "./components/DeliveryInformation/DeliveryInformation";

const BASE_URL = "http://localhost:4000";

export const App = () => {
  const [pallet, setPallet] = useState({ boxes: [], id: "" });

  const fetchPallet = async () => {
    const response = await axios(`${BASE_URL}/pallets`);

    if (response.status === 200) {
      const currentPallet = response.data[response.data.length - 1];
      if (currentPallet) setPallet(currentPallet);
    }
  };

  useEffect(() => {
    fetchPallet();
  }, [setPallet]);

  const newPallet = async () => {
    const response = await axios.post(`${BASE_URL}/pallets/new`, {
      user: "Andreas Näsman",
    });

    if (response.status === 200) fetchPallet();
  };

  const addBox = async (box) => {
    const response = await axios.post(
      `${BASE_URL}/pallets/${pallet.id}/add-box`,
      box
    );

    if (response.status === 200) fetchPallet();
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        padding: "2rem",
      }}
    >
      <div>
        <Button
          color="primary"
          onClick={newPallet}
          startIcon={<Add />}
          variant="contained"
        >
          New pallet
        </Button>
        <DeliveryInformation addBox={addBox} pallet={pallet} />
        <Button color="primary" startIcon={<Print />} variant="contained">
          Print list
        </Button>
      </div>

      <div>
        <BarChart pallet={pallet} />
      </div>
    </div>
  );
};
