import React, { useState } from "react";
import BarChart from "../components/BarChart";
import { yearOptions } from "../assets/dataForComponentOptions";

function GraphLogicCompoenet({ title, calfunction, csvData }) {
  const [selectedYear, setSelectedYear] = useState("2024");

  // Build selectors object to match your calculation function's expectations
  const selectors = { year: selectedYear };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  // Pass selectors object to calfunction
  const resultArr = calfunction(csvData, selectors);
  const labels = resultArr.map((item) => (item.month ? item.month : item.day));
  const data = resultArr.map((item) => item.avg);

  return (
    <div className="graph-ui-component">
      <BarChart title={title} labels={labels} data={data} />
      <select
        className="selectBtn-graph"
        onChange={handleYearChange}
        name="year"
        id="year"
        value={selectedYear}
      >
        {yearOptions.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
}

export default GraphLogicCompoenet;
