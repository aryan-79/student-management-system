"use client";
import { useState } from "react";
import Papa from "papaparse";

const CSVUpload = () => {
  const [csvData, setCsvData] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (csvData.length > 0) {
      csvData.map((item) => {
        // console.log(item.name, item["roll no"]);
        console.log(item);
        console.log("*****************");
      });
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      parseCSV(file);
    }
  };

  const parseCSV = (file) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        setCsvData(result.data);
      },
      error: (error) => {
        console.error("Error while parsing CSV: ", error);
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      {csvData.length > 0 && (
        <div>
          <h3>CSV Data:</h3>
          <table>
            <thead>
              <tr>
                {Object.keys(csvData[0]).map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {csvData.map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((value, i) => (
                    <td key={i}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <button type="submit">Submit</button>
    </form>
  );
};
export default CSVUpload;
