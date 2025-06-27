import React from "react";
import { useEffect, useState } from "react";
import CardLogic from "../containerComponents/CardLogic";
import GraphLogicCompoenet from "../containerComponents/GraphLogicCompoenet";
import {
  fetchCSVData,
  getYearTotal,
  monthlyAvgVisitsForYear,
  avgVistsByDay,
  avgVistsPerDayByMonth,
  avgVisitsByDayOfTheWeek,
  getYearsAndTotals,
} from "../assets/utils";
import LineGraphLogicComponent from "../containerComponents/LineGraphLogicComponent";
// Uncomment the line below to import FetchCSVData for testing purposes
// import FetchCSVData from "../test";

function HslGateCount() {
  const csvURLHslGateCount =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vTfw9nHek7CcbfwwvafJ3lrC4FwPdAQqJ9upHuLGvdRJ3D3KFrPA9LXjQclS7UkRg0x6fAqdKV2Gxfm/pub?output=csv";

  const [csvData, setCsvData] = useState([]);
  useEffect(() => {
    fetchCSVData(csvURLHslGateCount).then(setCsvData);
  }, [csvURLHslGateCount]);
  getYearsAndTotals(csvData);
  // calling the useEffect hook to fetch the CSV data when the component mounts.
  // doing this in the HslGateCount component so that the data is available for all child components.
  // the csvData state variable will hold the parsed CSV data, which can be passed to child components like CardLogic.
  // each card can then use this data to display relevant information, such as monthly or daily averages.
  return (
    <div className="page-container">
      <section className="container-for-cards">
        <CardLogic
          title={"HSL Year Total"}
          csvData={csvData}
          calfunction={getYearTotal} // pass a function as the prop so we can reuse the component with other cal functions.
        />
        <CardLogic
          title={"HSL Monthly Avg"}
          csvData={csvData}
          calfunction={monthlyAvgVisitsForYear}
        />
        <CardLogic
          title={"HSL Daily Avg"}
          csvData={csvData}
          calfunction={avgVistsByDay}
          showMonthSelector={true} // this prop can be used to show or hide the month selector in the CardLogic component
          // if the calfunction requires a month selector, we can pass this prop to show the month selector in the CardLogic component.
        />
      </section>
      <section className="container-for-graphs">
        <GraphLogicCompoenet
          title={"Avg Visits Per Day By Month"}
          csvData={csvData}
          calfunction={avgVistsPerDayByMonth}
        />
        <GraphLogicCompoenet
          title={"Avg Visits By Day of The Week"}
          csvData={csvData}
          calfunction={avgVisitsByDayOfTheWeek}
        />
        <LineGraphLogicComponent
          title={"Trend Line For Visits By Year"}
          csvData={csvData}
          calfunction={getYearsAndTotals}
        />
      </section>
    </div>
  );
}

export default HslGateCount;
