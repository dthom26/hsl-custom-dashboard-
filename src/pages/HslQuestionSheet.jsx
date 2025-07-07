import { useEffect, useState } from "react";
import CardLogic from "../containerComponents/CardLogic";
import GraphLogicCompoenet from "../containerComponents/GraphLogicCompoenet";
import {
  fetchCSVData,
  monthlyAvgVisitsForYear,
  avgVistsByDay,
  avgVistsPerDayByMonth,
  avgVisitsByDayOfTheWeek,
  getYearsAndTotals,
  getUniqueOptions,
  getMostAskedQuestion,
  extractYearAndMonthFromQuestionSheetDataAddProps,
} from "../assets/utils";

import LineGraphLogicComponent from "../containerComponents/LineGraphLogicComponent";

function HslGateCount() {
  const csvURLHslQuestionSheetData =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vQWRfABt-CD3hOE4JEDfyRznx6MoRrnq1i97bN2SVd-Wu0lQ5E6YQVl3fIQ1vtin_ne2Lk_KOhFfP4t/pub?output=csv";

  const [csvData, setCsvData] = useState([]);
  useEffect(() => {
    fetchCSVData(csvURLHslQuestionSheetData)
      .then(extractYearAndMonthFromQuestionSheetDataAddProps)
      .then(setCsvData);
  }, [csvURLHslQuestionSheetData]);
  console.log(csvData);
  console.log(getMostAskedQuestion(csvData));

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
  const yearOnlySelector = [
    { key: "year", options: yearOptions, default: yearOptions[0] },
  ];
  const yearAndMonthSelectors = [
    { key: "year", options: yearOptions, default: yearOptions[0] },
    { key: "month", options: monthOrder, default: monthOrder[0] },
  ];

  return (
    <div className="page-container">
      <section className="container-for-cards">
        <CardLogic
          title={"Category Totals By Question types"}
          csvData={csvData}
          calfunction={getMostAskedQuestion} // pass a function as the prop so we can reuse the component with other cal functions.
          selectorConfigs={yearAndMonthSelectors}
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
