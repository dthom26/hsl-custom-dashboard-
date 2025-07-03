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
  getUniqueOptions,
} from "../assets/utils";

import LineGraphLogicComponent from "../containerComponents/LineGraphLogicComponent";
// Uncomment the line below to import FetchCSVData for testing purposes
// import FetchCSVData from "../test";

function HslGateCount() {
  const csvURLHslQuestionSheetData =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vQWRfABt-CD3hOE4JEDfyRznx6MoRrnq1i97bN2SVd-Wu0lQ5E6YQVl3fIQ1vtin_ne2Lk_KOhFfP4t/pub?output=csv";
  const csvURLHslGateCount =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vTfw9nHek7CcbfwwvafJ3lrC4FwPdAQqJ9upHuLGvdRJ3D3KFrPA9LXjQclS7UkRg0x6fAqdKV2Gxfm/pub?output=csv";

  const [csvData, setCsvData] = useState([]);
  useEffect(() => {
    fetchCSVData(csvURLHslGateCount).then(setCsvData);
  }, [csvURLHslGateCount]);
  /* calling the useEffect hook to fetch the CSV data when the component mounts.
   doing this in the HslGateCount component so that the data is available for all child components.
   the csvData state variable will hold the parsed CSV data, which can be passed to child components like CardLogic.
   each card can then use this data to display relevant information, such as monthly or daily averages.
  **/
  const yearOptions = getUniqueOptions(csvData, "Year");
  const monthOrder = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const rawMonthOptions = getUniqueOptions(csvData, "Month");
  const monthOptions = monthOrder.filter((month) =>
    rawMonthOptions.includes(month)
  );
  // Extracting unique year and month options from the CSV data for use in selectors.
  const yearOnlySelector = [
    { key: "year", options: yearOptions, default: yearOptions[0] },
  ];
  const yearAndMonthSelectors = [
    { key: "year", options: yearOptions, default: yearOptions[0] },
    { key: "month", options: monthOptions, default: monthOptions[0] },
  ];
  return (
    <div className="page-container">
      <section className="container-for-cards">
        <CardLogic
          title={"Category Totals By Question types"}
          csvData={csvData}
          calfunction={getYearTotal} // pass a function as the prop so we can reuse the component with other cal functions.
          selectorConfigs={yearOnlySelector}
        />
        <CardLogic
          title={"Time Slot Totals"}
          csvData={csvData}
          calfunction={monthlyAvgVisitsForYear}
          selectorConfigs={yearOnlySelector}
        />
        <CardLogic
          title={"Most Asked Question"}
          csvData={csvData}
          calfunction={avgVistsByDay}
          selectorConfigs={yearAndMonthSelectors}
        />
      </section>
      <section className="container-for-graphs">
        <GraphLogicCompoenet
          title={"Avg Visits Per Day By Month"}
          csvData={csvData}
          calfunction={avgVistsPerDayByMonth}
          yearOptions={yearOptions}
        />
        <GraphLogicCompoenet
          title={"Avg Visits By Day of The Week"}
          csvData={csvData}
          calfunction={avgVisitsByDayOfTheWeek}
          yearOptions={yearOptions}
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
