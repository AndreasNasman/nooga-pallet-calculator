import { Animation, ValueScale } from "@devexpress/dx-react-chart";
import {
  BarSeries,
  Chart,
  ValueAxis,
} from "@devexpress/dx-react-chart-material-ui";
import Paper from "@material-ui/core/Paper";
import { scaleLinear } from "d3-scale";
import * as React from "react";

const scale = scaleLinear();
scale.ticks = () => [0, 5, 10, 15, 20, 25];

const MAX_BOXES = 25;
const modifyDomain = () => [0, MAX_BOXES];

export const BarChart = ({ pallet }) => {
  const data = [{ id: pallet.id, boxesAmount: pallet.boxes.length }];

  return (
    <Paper>
      <Chart data={data}>
        <ValueAxis />
        <ValueScale factory={() => scale} modifyDomain={modifyDomain} />

        <BarSeries valueField="boxesAmount" argumentField="id" />
        <Animation />
      </Chart>
    </Paper>
  );
};
