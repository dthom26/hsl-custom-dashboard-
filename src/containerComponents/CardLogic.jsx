import React, { useEffect, useState } from "react";
import CardUi from "../components/CardUi";

function CardLogic({ title, csvData, calfunction, selectorConfigs }) {
  const initialSelectors = {};
  selectorConfigs.forEach((cfg) => {
    initialSelectors[cfg.key] = cfg.default;
  });
  const [selectors, setSelectors] = useState(initialSelectors);

  // Handler for any selector change
  const handleSelectorChange = (key, value) => {
    setSelectors((prev) => ({ ...prev, [key]: value }));
  };
  const value = calfunction(csvData, selectors);

  // const testData = getYearTotal(csvData, selectedYear);
  // monthlyAvgVisitsForYear(csvData, "2019");
  return (
    <>
      <CardUi
        title={title}
        calfunctionValue={value}
        selectors={selectorConfigs.map((cfg) => ({
          ...cfg,
          value: selectors[cfg.key],
          onChange: (e) => handleSelectorChange(cfg.key, e.target.value),
        }))}
      />
    </>
  );
}

export default CardLogic;
