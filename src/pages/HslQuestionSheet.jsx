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

function HslQuestionSheetPage() {
  const csvURLHslQuestionSheetData =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vQWRfABt-CD3hOE4JEDfyRznx6MoRrnq1i97bN2SVd-Wu0lQ5E6YQVl3fIQ1vtin_ne2Lk_KOhFfP4t/pub?output=csv";
  const csvURLHslGateCount =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vTfw9nHek7CcbfwwvafJ3lrC4FwPdAQqJ9upHuLGvdRJ3D3KFrPA9LXjQclS7UkRg0x6fAqdKV2Gxfm/pub?output=csv";

  const [csvData, setCsvData] = useState([]);

  useEffect(() => {
    fetchCSVData(csvURLHslQuestionSheetData).then(setCsvData);
  }, [csvURLHslQuestionSheetData]);

  return (
    <div className="page-container">
      <section className="container-for-cards">
        <CardLogic
          title={"Category Totals By Question types"}
          csvData={csvData}
          calfunction={getYearTotal}
        />
        <CardLogic
          title={"Time Slot Totals"}
          csvData={csvData}
          calfunction={monthlyAvgVisitsForYear}
        />
        <CardLogic
          title={"Most Asked Question"}
          csvData={csvData}
          calfunction={avgVistsByDay}
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

export default HslQuestionSheetPage;
