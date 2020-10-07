const camelCaseToWords = (string) => string.split(/(?=[A-Z])/).join(" ");

const capitalizeOnlyFirstLetter = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();

const formatTableHeader = (header) => {
  if (header === "id") return header.toUpperCase();
  else return capitalizeOnlyFirstLetter(camelCaseToWords(header));
};

const buildHeaderRow = (headers) => {
  return headers.map((header) => ({
    style: "headerCell",
    text: formatTableHeader(header),
  }));
};

const buildRows = (headers, rows) => {
  return rows.reduce((result, row) => {
    return [
      ...result,
      headers.map((header) => {
        const value = row[header];

        if (typeof header === "string" && header.toLowerCase().includes("date"))
          return new Date(value).toLocaleDateString("fi-FI");
        else return value;
      }),
    ];
  }, []);
};

const buildTable = (headers, rows) => {
  return {
    table: {
      body: [buildHeaderRow(headers), ...buildRows(headers, rows)],
    },
  };
};

const filterKeys = (key) => key.charAt(0) !== "_" && key !== "boxes";

const stylesPDF = {
  header: {
    bold: true,
    fontSize: 18,
    margin: [0, 20, 0, 10],
  },
  headerCell: {
    bold: true,
    fontSize: 14,
  },
  subHeader: {
    bold: true,
    fontSize: 16,
    margin: [0, 10, 0, 10],
  },
};

export const generatePDFContent = (pallets) => {
  const content = [];

  for (const pallet of pallets) {
    content.push({ text: `Pallet: ${pallet.id}`, style: "header" });
    const palletHeaders = Object.keys(pallet).filter(filterKeys);
    content.push(buildTable(palletHeaders, [pallet]));

    content.push({ text: "Boxes", style: "subHeader" });
    const { boxes } = pallet;
    const boxHeaders = Object.keys(boxes[0]).filter(filterKeys);
    content.push(buildTable(boxHeaders, boxes));
  }

  return {
    content,
    styles: stylesPDF,
  };
};
