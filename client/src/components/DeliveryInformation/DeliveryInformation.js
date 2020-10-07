import { Button, Paper } from "@material-ui/core";
import { Add, Print } from "@material-ui/icons";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import * as React from "react";
import styles from "./DeliveryInformation.module.css";
import { Form } from "./Form/Form";
import { generatePDFContent } from "./utilities";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export const DeliveryInformation = ({
  activePallet,
  addBox,
  newPallet,
  pallets,
}) => {
  const print = () => {
    const docDefinition = generatePDFContent(pallets);
    pdfMake.createPdf(docDefinition).download("Pallets Log");
  };

  return (
    <Paper className={styles.container}>
      <Button
        color="primary"
        onClick={newPallet}
        startIcon={<Add />}
        variant="contained"
      >
        New pallet
      </Button>

      <Form activePallet={activePallet} addBox={addBox} />

      <Button
        color="primary"
        onClick={print}
        startIcon={<Print />}
        variant="contained"
      >
        Print list
      </Button>
    </Paper>
  );
};
