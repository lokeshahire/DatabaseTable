export const processData = (jsonData) => {
  const data = jsonData;

  const yearData = {};
  const cropData = {};

  data.forEach((row) => {
    const year = row.Year.split(", ")[1];
    const crop = row["Crop Name"];
    const production = parseFloat(row["Crop Production (UOM:t(Tonnes))"]) || 0;
    const area =
      parseFloat(row["Area Under Cultivation (UOM:Ha(Hectares))"]) || 0;

    if (!yearData[year]) {
      yearData[year] = {
        maxCrop: crop,
        minCrop: crop,
        maxProduction: production,
        minProduction: production,
      };
    } else {
      if (production > yearData[year].maxProduction) {
        yearData[year].maxCrop = crop;
        yearData[year].maxProduction = production;
      }
      if (production < yearData[year].minProduction) {
        yearData[year].minCrop = crop;
        yearData[year].minProduction = production;
      }
    }

    if (!cropData[crop]) {
      cropData[crop] = { totalYield: production, totalArea: area, count: 1 };
    } else {
      cropData[crop].totalYield += production;
      cropData[crop].totalArea += area;
      cropData[crop].count += 1;
    }
  });

  const yearTable = Object.keys(yearData).map((year) => ({
    year,
    maxCrop: yearData[year].maxCrop,
    minCrop: yearData[year].minCrop,
  }));

  const cropTable = Object.keys(cropData).map((crop) => ({
    crop,
    avgYield: (cropData[crop].totalYield / cropData[crop].count).toFixed(3),
    avgArea: (cropData[crop].totalArea / cropData[crop].count).toFixed(3),
  }));

  return { yearTable, cropTable };
};
