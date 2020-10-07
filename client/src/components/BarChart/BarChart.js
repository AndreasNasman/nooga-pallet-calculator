import { Animation, ValueScale } from "@devexpress/dx-react-chart";
import {
  BarSeries,
  Chart,
  Title,
  ValueAxis,
} from "@devexpress/dx-react-chart-material-ui";
import Paper from "@material-ui/core/Paper";
import { scaleLinear } from "d3-scale";
import * as React from "react";
import styles from "./BarChart.module.css";

const MAX_BOXES = 25;

const scale = scaleLinear();
scale.ticks = () => [0, 5, 10, 15, 20, 25];

const modifyDomain = () => [0, MAX_BOXES];

export const BarChart = ({ pallet }) => {
  const numberOfBoxes = pallet.boxes.length;
  const { id } = pallet;

  const data = [{ id, numberOfBoxes }];

  return (
    <Paper>
      <Chart data={data}>
        <ValueAxis />
        <ValueScale factory={() => scale} modifyDomain={modifyDomain} />

        <BarSeries valueField="numberOfBoxes" argumentField="id" />

        <Animation />
        <Title text={`Pallet: ${id}`} />
      </Chart>

      <p className={styles.number_of_boxes}>
        <strong>Number of boxes on pallet: {numberOfBoxes}</strong>
        <br />
        (max {MAX_BOXES})
      </p>
    </Paper>
  );
};
