import { Backdrop, CircularProgress } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./App.module.css";
import { BarChart } from "./components/BarChart/BarChart";
import { DeliveryInformation } from "./components/DeliveryInformation/DeliveryInformation";

const BASE_URL = "http://localhost:4000";

export const App = () => {
  const [pallets, setPallets] = useState([]);
  const activePallet = pallets[pallets.length - 1];

  const fetchPallets = async () => {
    const response = await axios(`${BASE_URL}/pallets`);

    if (response.status === 200) setPallets(response.data);
  };

  useEffect(() => {
    fetchPallets();
  }, [setPallets]);

  const newPallet = async () => {
    const response = await axios.post(`${BASE_URL}/pallets/new`, {
      user: "Andreas Näsman",
    });

    if (response.status === 200) fetchPallets();
  };

  const addBox = async (box) => {
    const response = await axios.post(
      `${BASE_URL}/pallets/${activePallet.id}/add-box`,
      box
    );

    if (response.status === 200) fetchPallets();
  };

  if (pallets.length === 0) {
    return (
      <Backdrop open>
        <CircularProgress />
      </Backdrop>
    );
  }

  return (
    <div className={styles.container}>
      <DeliveryInformation
        addBox={addBox}
        newPallet={newPallet}
        pallet={activePallet}
        pallets={pallets}
      />

      <BarChart pallet={activePallet} />
    </div>
  );
};
