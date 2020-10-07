import axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";
import styles from "./App.module.css";
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
    <div className={styles.container}>
      <DeliveryInformation
        addBox={addBox}
        newPallet={newPallet}
        pallet={pallet}
      />

      <BarChart pallet={pallet} />
    </div>
  );
};
