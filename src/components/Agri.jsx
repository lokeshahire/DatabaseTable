import React, { useEffect, useState } from "react";
import { Table } from "@mantine/core";
import jsonData from "../ManufacData.json";
import { processData } from "../data";

const Agri = () => {
  const [yearTable, setYearTable] = useState([]);
  const [cropTable, setCropTable] = useState([]);

  useEffect(() => {
    const { yearTable, cropTable } = processData(jsonData);
    setYearTable(yearTable);
    setCropTable(cropTable);
  }, []);

  return (
    <div className="table-wrapper">
      <h2>Yearly Crop Production</h2>
      <Table>
        <thead>
          <tr>
            <th>Year</th>
            <th>Crop with Maximum Production</th>
            <th>Crop with Minimum Production</th>
          </tr>
        </thead>
        <tbody>
          {yearTable.map((row, index) => (
            <tr key={index}>
              <td>{row.year}</td>
              <td>{row.maxCrop}</td>
              <td>{row.minCrop}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h2>Crop Averages (1950-2020)</h2>
      <Table>
        <thead>
          <tr>
            <th>Crop</th>
            <th>Average Yield</th>
            <th>Average Cultivation Area</th>
          </tr>
        </thead>
        <tbody>
          {cropTable.map((row, index) => (
            <tr key={index}>
              <td>{row.crop}</td>
              <td>{row.avgYield}</td>
              <td>{row.avgArea}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Agri;
