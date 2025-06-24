import React from "react";

function CardUi({
  title,
  testData,
  yearChangeHandler,
  showMonthSelector,
  handleMonthChange,
}) {
  return (
    <div className="card-container">
      <div className="title-and-text-container">
        <span className="card-title">{title}</span>
        <p className="card-text">{testData}</p>
      </div>
      <select
        onChange={yearChangeHandler}
        name="year"
        id="year"
        defaultValue={"2024"}
      >
        <option value="2025">2025</option>
        <option value="2024">2024</option>
        <option value="2023">2023</option>
        <option value="2022">2022</option>
        <option value="2021">2021</option>
        <option value="2020">2020</option>
        <option value="2019">2019</option>
      </select>

      {showMonthSelector && (
        <select
          onChange={handleMonthChange}
          name="month"
          id="month"
          defaultValue={"2024"}
        >
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="May">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
          <option value="August">August</option>
          <option value="September">September</option>
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>
        </select>
      )}
    </div>
  );
}

export default CardUi;
