import React from "react";

function CardUi({ title, calfunctionValue, selectors = [] }) {
  return (
    <div className="card-container">
      <div className="title-and-text-container">
        <span className="card-title">{title}</span>
        <p className="card-text">{calfunctionValue}</p>
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
