import React, { useEffect, useState } from "react";
import CardUi from "../components/CardUi";

function CardLogic({ title, csvData, calfunction, showMonthSelector }) {
  const [selectedYear, setSelectedYear] = useState("2024");
  const [selectedMonth, setSelectedMonth] = useState("January");

  // handler for year selection change
  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };
  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  let value = calfunction(csvData, selectedYear, selectedMonth);

  // const testData = getYearTotal(csvData, selectedYear);
  // monthlyAvgVisitsForYear(csvData, "2019");
  return (
    <>
      <CardUi
        title={title}
        testData={value}
        yearChangeHandler={handleYearChange}
        handleMonthChange={handleMonthChange}
        showMonthSelector={showMonthSelector}
      />
    </>
  );
}

export default CardLogic;
