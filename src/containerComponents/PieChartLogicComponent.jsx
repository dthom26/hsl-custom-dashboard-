import PieChart from "../components/PieChart";

function PieChartLogicComponent({ title, calfunction, csvData }) {
  const resultArr = calfunction(csvData);
  const labels = resultArr.map((item) => item.category);
  const data = resultArr.map((item) => item.count);
  return (
    <div className="graph-ui-component">
      <PieChart title={title} labels={labels} data={data} />
    </div>
  );
}

export default PieChartLogicComponent;
