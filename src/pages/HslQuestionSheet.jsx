import { useEffect, useState } from "react";
import CardLogic from "../containerComponents/CardLogic";
import GraphLogicCompoenet from "../containerComponents/GraphLogicCompoenet";
import {
  fetchCSVData,
  getUniqueOptions,
  getQuestionTotalByDate,
  addYearandMonthToCsvData,
  getTimeSlotTotal,
  getMostAskedQuestionOverAll,
  QuestionCountByDayOfTheWeek,
  QuestionCountByTimeSlot,
  getCategoryTotals,
} from "../assets/utils";
import PieChartLogicComponent from "../containerComponents/PieChartLogicComponent";
function HslGateCount() {
  const csvURLHslQuestionSheetData =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vQWRfABt-CD3hOE4JEDfyRznx6MoRrnq1i97bN2SVd-Wu0lQ5E6YQVl3fIQ1vtin_ne2Lk_KOhFfP4t/pub?output=csv";

  const [csvData, setCsvData] = useState([]);
  useEffect(() => {
    fetchCSVData(csvURLHslQuestionSheetData)
      .then(addYearandMonthToCsvData)
      .then(setCsvData);
  }, [csvURLHslQuestionSheetData]);

  const timeSlotOptions = getUniqueOptions(csvData, "Time Slot");
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
  const timeSlotSelector = [
    { key: "timeSlot", options: timeSlotOptions, default: timeSlotOptions[0] },
  ];
  // const yearOnlySelector = [
  //   { key: "year", options: yearOptions, default: yearOptions[0] },
  // ];
  const yearAndMonthSelectors = [
    { key: "year", options: yearOptions, default: yearOptions[0] },
    { key: "month", options: monthOrder, default: monthOrder[0] },
  ];

  return (
    <div className="page-container">
      <section className="container-for-cards">
        <CardLogic
          title={"Most Common Question Category (Year & Month)"}
          csvData={csvData}
          calfunction={getQuestionTotalByDate} // pass a function as the prop so we can reuse the component with other cal functions.
          selectorConfigs={yearAndMonthSelectors}
        />
        <CardLogic
          title={"Time Slot Totals"}
          csvData={csvData}
          calfunction={getTimeSlotTotal}
          selectorConfigs={timeSlotSelector}
        />
        <CardLogic
          title={"Top Question Category (All Time)"}
          csvData={csvData}
          calfunction={getMostAskedQuestionOverAll}
          selectorConfigs={[]}
        />
      </section>
      <section className="container-for-graphs">
        <GraphLogicCompoenet
          title={"Question Count By Day of The Week"}
          csvData={csvData}
          calfunction={QuestionCountByDayOfTheWeek}
          yearOptions={yearOptions}
        />
        <GraphLogicCompoenet
          title={"Question Count by Time Slot"}
          csvData={csvData}
          calfunction={QuestionCountByTimeSlot}
          yearOptions={yearOptions}
        />
        <PieChartLogicComponent
          title={"Totals for Each Category"}
          csvData={csvData}
          calfunction={getCategoryTotals}
        />
      </section>
    </div>
  );
}

export default HslGateCount;
