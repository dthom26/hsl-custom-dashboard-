import { useEffect, useState } from "react";
import CardLogic from "../containerComponents/CardLogic";
import GraphLogicCompoenet from "../containerComponents/GraphLogicCompoenet";
import PieChartLogicComponent from "../containerComponents/PieChartLogicComponent";
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
function HslGateCount() {
  const csvURL =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSqBBkikogtAYL30nQY8dhHGQ-Od8zjpy1WyOlSP6R1h9sCPg56P_bX2oqQAcdxnAl2GOkER6gVwkQq/pub?gid=0&single=true&output=csv";
  const [csvData, setCsvData] = useState([]);
  useEffect(() => {
    fetchCSVData(csvURL).then(addYearandMonthToCsvData).then(setCsvData);
  }, [csvURL]);

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
