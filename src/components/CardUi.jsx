import React from "react";

function CardUi({ title, calfunctionValue, selectors = [] }) {
  // Try to split value into label and count if possible
  let label = calfunctionValue;
  let count = "";
  if (
    typeof calfunctionValue === "string" &&
    calfunctionValue !== "No Data" &&
    calfunctionValue.includes(" ")
  ) {
    const lastSpace = calfunctionValue.lastIndexOf(" ");
    label = calfunctionValue.slice(0, lastSpace);
    count = calfunctionValue.slice(lastSpace + 1);
  }

  return (
    <div className="card-container">
      <div className="title-and-text-container">
        <span className="card-title">{title}</span>
        <div className="card-text">
          <span className="card-label">{label}</span>
          {count && <span className="card-count"> {count}</span>}
        </div>
      </div>
      {/* Dynamically render selectors */}
      {selectors.map((sel) => (
        <select
          key={sel.key}
          className="selectBtn"
          name={sel.key}
          value={sel.value}
          onChange={sel.onChange}
        >
          {sel.options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ))}
    </div>
  );
}

export default CardUi;
