export const yearOptions = [
  "2019",
  "2020",
  "2021",
  "2022",
  "2023",
  "2024",
  "2025",
];
const monthOptions = [
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
const questionOptions = [
  "reference",
  "directional/operational",
  "ILL/Holds/Reserves",
  "Printer/Computer",
];

// For a card that needs year and category selectors:
export const yearAndCategorySelectors = [
  { key: "year", options: yearOptions, default: "2024" },
  { key: "category", options: questionOptions, default: "reference" },
];

// For a card that needs year and month selectors:
export const yearAndMonthSelectors = [
  { key: "year", options: yearOptions, default: "2024" },
  { key: "month", options: monthOptions, default: "January" },
];

// For a card that only needs year:
export const yearOnlySelector = [
  { key: "year", options: yearOptions, default: "2024" },
];

// for card that only needs month
export const monthOnlySelector = [
  { key: "month", options: monthOptions, default: "January" },
];
