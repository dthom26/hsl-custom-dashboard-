import React from "react";
import { useState } from "react";
import LineGraph from "../components/LineGraph";

function LineGraphLogicCompoenet({ title, calfunction, csvData }) {
  // const [selectedYear, setSelectedYear] = useState("2024"); // state for selected year
  // You can add more state variables for month or other selectors if needed.

  // hanlder functions will be found below
  // const handleYearChange = (e) => {
  //   setSelectedYear(e.target.value);
  // };

  // Call the calculation function with the CSV data
  // The calfunction is expected to return an array of objects with 'year' and 'total' properties.
  const resultArr = calfunction(csvData);
  const labels = resultArr.map((item) => item.year);
  const data = resultArr.map((item) => item.total);
  return (
    <div className="graph-ui-component">
      <LineGraph title={title} labels={labels} data={data} />
    </div>
  );
}

export default LineGraphLogicCompoenet;
