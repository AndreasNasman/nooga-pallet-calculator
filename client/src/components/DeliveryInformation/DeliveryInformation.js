import { Button, Grid, MenuItem, Select, TextField } from "@material-ui/core";
import { Save } from "@material-ui/icons";
import * as React from "react";
import { useState } from "react";
import styles from "./DeliveryInformation.module.css";

const initialState = {
  amount: "",
  articleName: "",
  batchNumber: "",
  boxNumber: "",
  daysToDueDate: 0,
  recordDate: new Date(),
};

export const DeliveryInformation = ({ addBox, pallet }) => {
  const [
    { amount, articleName, batchNumber, boxNumber, daysToDueDate, recordDate },
    setState,
  ] = useState(initialState);

  const dueDate = new Date(recordDate);
  dueDate.setDate(dueDate.getDate() + daysToDueDate);

  const clearState = () => {
    setState(initialState);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((previousState) => ({ ...previousState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await addBox({
        amount,
        articleName,
        batchNumber,
        boxNumber,
        dueDate,
        registrationDate: recordDate,
      });

      clearState();
    } catch (error) {
      console.error(error.response);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid
        alignItems="center"
        className={styles.container}
        container
        spacing={3}
      >
        <Grid item xs={6}>
          Pallet ID:
        </Grid>
        <Grid item xs={6}>
          <span>{pallet.id}</span>
        </Grid>

        <Grid item xs={6}>
          Box number:
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="boxNumber"
            onChange={handleChange}
            required
            type="number"
            value={boxNumber}
          />
        </Grid>

        <Grid item xs={6}>
          Article name:
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="articleName"
            onChange={handleChange}
            required
            value={articleName}
          />
        </Grid>

        <Grid item xs={6}>
          Amount:
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="amount"
            onChange={handleChange}
            required
            type="number"
            value={amount}
          />
        </Grid>

        <Grid item xs={6}>
          Batch number:
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="batchNumber"
            onChange={handleChange}
            required
            type="number"
            value={batchNumber}
          />
        </Grid>

        <Grid item xs={6}>
          Record date:
        </Grid>
        <Grid item xs={6}>
          <span>{recordDate.toLocaleDateString("fi-FI")}</span>
        </Grid>

        <Grid item xs={6}>
          Days until last use date:
        </Grid>
        <Grid item xs={6}>
          <Select
            name="daysToDueDate"
            onChange={handleChange}
            required
            value={daysToDueDate}
          >
            {Array.from({ length: 31 }, (_, index) => (
              <MenuItem key={index} value={index}>
                {index}
              </MenuItem>
            ))}
          </Select>
        </Grid>

        <Grid item xs={6}>
          Due date:
        </Grid>
        <Grid item xs={6}>
          <span>{dueDate.toLocaleDateString("fi-FI")}</span>
        </Grid>

        <Grid item xs={12}>
          <Button
            color="primary"
            startIcon={<Save />}
            type="submit"
            variant="contained"
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
