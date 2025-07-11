import { useEffect, useState } from "react";
import CardLogic from "../containerComponents/CardLogic";
import GraphLogicCompoenet from "../containerComponents/GraphLogicCompoenet";
import LineGraphLogicCompoenet from "../containerComponents/LineGraphLogicComponent";
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

function MedGateCount() {
  const csvURLMedGateCount =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vTij0JoEjrIiPPgfZAr3Xtz0vXAyr7HouEX2DTRjns2lnYeapDMwd4kGzAlYL6RJeX3txkyd98Re9vb/pub?gid=0&single=true&output=csv";

  const [csvData, setCsvData] = useState([]);
  useEffect(() => {
    fetchCSVData(csvURLMedGateCount).then(setCsvData);
  }, [csvURLMedGateCount]);

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
          title={"MED Year Total"}
          csvData={csvData}
          calfunction={getYearTotal}
          selectorConfigs={yearOnlySelector}
        />
        <CardLogic
          title={"MED Monthly Avg"}
          csvData={csvData}
          calfunction={monthlyAvgVisitsForYear}
          selectorConfigs={yearOnlySelector}
        />
        <CardLogic
          title={"MED Daily Avg"}
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
        <LineGraphLogicCompoenet
          title={"Trend Line For Visits By Year"}
          csvData={csvData}
          calfunction={getYearsAndTotals}
        />
      </section>
    </div>
  );
}

export default MedGateCount;
