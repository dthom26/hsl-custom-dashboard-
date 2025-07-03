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

  // Show loading if data is not loaded yet
  const isLoading = !csvData || csvData.length === 0;
  const value = isLoading ? "Loading..." : calfunction(csvData, selectors);
  // Prepare selector props for CardUi
  const selectorProps = selectorConfigs.map((cfg) => ({
    ...cfg,
    value: selectors[cfg.key],
    onChange: (e) => handleSelectorChange(cfg.key, e.target.value),
  }));

  return (
    <CardUi title={title} calfunctionValue={value} selectors={selectorProps} />
  );
}

export default CardLogic;
