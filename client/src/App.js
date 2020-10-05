import axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";

export const App = () => {
  const [pallet, setPallet] = useState({});

  useEffect(() => {
    const fetchPallet = async () => {
      const result = await axios("http://localhost:4000/pallets");

      if (result.status === 200) {
        const currentPallet = result.data.pop();
        setPallet(currentPallet);
      }
    };

    fetchPallet();
  }, []);

  return (
    <div>
      <div>
        Current pallet
        <pre>{JSON.stringify(pallet, null, 2)}</pre>
      </div>
    </div>
  );
};
