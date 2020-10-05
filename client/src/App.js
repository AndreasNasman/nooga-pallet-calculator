import axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";
import { DeliveryInformation } from "./components/DeliveryInformation/DeliveryInformation";

const BASE_URL = "http://localhost:4000";

export const App = () => {
  const [pallet, setPallet] = useState({});

  const fetchPallet = async () => {
    const response = await axios(`${BASE_URL}/pallets`);

    if (response.status === 200) {
      const currentPallet = response.data.pop();
      if (currentPallet) setPallet(currentPallet);
    }
  };

  useEffect(() => {
    fetchPallet();
  }, [setPallet]);

  const addBox = async (box) => {
    const response = await axios.post(
      `${BASE_URL}/pallets/${pallet.id}/add-box`,
      box
    );

    if (response.status === 200) fetchPallet();
  };

  return <DeliveryInformation addBox={addBox} pallet={pallet} />;
};
