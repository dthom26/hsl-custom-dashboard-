import { useEffect, useState } from "react";
import CardUi from "../components/CardUi";

function CardLogic({ title, csvData, calfunction, selectorConfigs }) {
  // Build initial selectors from configs
  const getInitialSelectors = () => {
    const obj = {};
    selectorConfigs.forEach((cfg) => {
      obj[cfg.key] =
        cfg.options && cfg.options.length > 0 ? cfg.options[0] : "";
    });
    return obj;
  };
  // then initialize state with the initial selectors
  // This allows us to dynamically generate the options for selectors based on the data
  const [selectors, setSelectors] = useState(getInitialSelectors());

  // Update selectors when options change (e.g., after csvData loads). Used copilot for the useEffect here.
  useEffect(() => {
    setSelectors(getInitialSelectors());
    // eslint-disable-next-line
  }, [JSON.stringify(selectorConfigs.map((cfg) => cfg.options))]);

  const handleSelectorChange = (key, value) => {
    setSelectors((prev) => ({ ...prev, [key]: value }));
  };

  // Dynamic month options if both year and month selectors are present
  let dynamicSelectorConfigs = selectorConfigs;
  const hasYear = selectorConfigs.some((cfg) => cfg.key === "year");
  const hasMonth = selectorConfigs.some((cfg) => cfg.key === "month");

  if (hasYear && hasMonth && selectors.year && csvData.length > 0) {
    // Get all months for the selected year
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
    const monthsForSelectedYear = [
      ...new Set(
        csvData
          .filter((row) => row.Year === selectors.year)
          .map((row) => row.Month)
          .filter(Boolean)
      ),
    ];
    const monthOptions = monthOrder.filter((month) =>
      monthsForSelectedYear.includes(month)
    );

    // Replace month selector's options with filtered options
    dynamicSelectorConfigs = selectorConfigs.map((cfg) =>
      cfg.key === "month"
        ? { ...cfg, options: monthOptions, default: monthOptions[0] }
        : cfg
    );
    // If the current selected month is not in the new options, reset it
    if (!monthOptions.includes(selectors.month)) {
      setSelectors((prev) => ({
        ...prev,
        month: monthOptions[0] || "",
      }));
    }
  }

  // Show loading if data is not loaded yet
  const isLoading = !csvData || csvData.length === 0;
  const value = isLoading ? "Loading..." : calfunction(csvData, selectors);

  // Prepare selector props for CardUi
  const selectorProps = dynamicSelectorConfigs.map((cfg) => ({
    ...cfg,
    value: selectors[cfg.key],
    onChange: (e) => handleSelectorChange(cfg.key, e.target.value),
  }));

  return (
    <CardUi title={title} calfunctionValue={value} selectors={selectorProps} />
  );
}

export default CardLogic;
