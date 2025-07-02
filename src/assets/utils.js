import axios from "axios";
// This utility function fetches CSV data from a given URL and parses it into an array of objects.
/**
 * Fetches CSV data from a given URL and parses it into an array of objects.
 * @param {string} csvUrl - The URL of the CSV file to fetch.
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of objects representing the CSV data.
 */
export async function fetchCSVData(csvUrl) {
  const response = await axios.get(csvUrl); // Fetch the CSV data from the provided URL
  return parseCSV(response.data); // Parse the CSV data into an array of objects
}

export function parseCSV(csvText) {
  const rows = csvText.split(/\r?\n/); // Split the CSV text into rows while handling '\r'
  const headers = rows[0].split(","); // Extract headers (assumes the first row is the header row)
  const data = []; // Initialize an array to store the parsed data
  for (let i = 1; i < rows.length; i++) {
    const rowData = rows[i].split(","); // Split the row while handling '\r'
    const rowObject = {};
    for (let j = 0; j < headers.length; j++) {
      rowObject[headers[j]] = rowData[j];
    }
    data.push(rowObject);
  }
  console.log("Parsed CSV Data:", data); // Log the parsed data for debugging
  return data;
}

/**
 * Calculates the total visits for a specific year from the provided CSV data.
 * @param {Array<Object>} csvData - The parsed CSV data as an array of objects.
 * @param {number|string} year - The year for which to calculate the total visits.
 * @returns {number} The total visits for the specified year, or 0 if no valid data is found.
 */
// export function getYearTotal(csvData, year) {
//   if (!Array.isArray(csvData)) return 0;
//   return csvData
//     .filter(
//       (row) =>
//         row.year &&
//         row.year.trim() === String(year) &&
//         !isNaN(Number(row.visits)) &&
//         Number(row.visits) !== 0 // Exclude zero visits if needed
//     )
//     .map((row) => Number(row.visits))
//     .reduce(
//       (sum, visits) => sum + (isNaN(visits) || visits === 0 ? 0 : visits),
//       0
//     );
// }
export function getYearTotal(csvData, selectors) {
  const { year } = selectors; // Destructure year from selectors
  if (!Array.isArray(csvData)) return 0; // Check if csvData is an array and is not empty
  if (csvData.length === 0) return 0;
  return Math.round(
    csvData
      .filter((row) => row.Year && row.Year.trim() === String(year)) // Filter by year
      .map((row) => Number(row.Visits)) // Convert visits to numbers
      .filter((visits) => !isNaN(visits) && visits !== 0) // Exclude NaN and zero visits
      .reduce((sum, visits) => sum + visits, 0) // Sum all valid visits
  );
}

// monthly avg function for the selected year
/**
 * Calculates the average monthly visits for a specific year from the provided CSV data.
 * @param {Array<Object>} csvData - The parsed CSV data as an array of objects.
 * @param {string} year - The year for which to calculate the average monthly visits.
 * @returns {number} The average monthly visits for the specified year, rounded to the nearest integer.
 */
export function monthlyAvgVisitsForYear(csvData, selectors) {
  const { year } = selectors; // Destructure year from selectors
  if (!Array.isArray(csvData)) return 0;
  const arryDataForselectedYear = csvData.filter(
    (row) => row.Year && row.Year.trim() === year
  );
  const monthlyTotals = {};
  for (const row of arryDataForselectedYear) {
    if (!monthlyTotals[row.Month]) {
      monthlyTotals[row.Month] = Number(row.Visits);
    } else {
      monthlyTotals[row.Month] += Number(row.Visits);
    }
  }
  const monthSums = Object.values(monthlyTotals);
  const avg = monthSums.reduce((sum, val) => sum + val, 0) / monthSums.length;
  const roundedAvg = Math.round(avg);
  return roundedAvg;
}

/**
 * function for getting avg visits per day by filter by year and month
 * Calculates the average visits per day for a specific month and year from the provided CSV data.
 * @param {Array<Object>} csvData - The parsed CSV data as an array of objects.
 * @param {number|string} year - The year for which to calculate the average visits.
 * @param {number|string} month - The month for which to calculate the average visits.
 * @returns {number} The average visits per day for the specified month and year, rounded to the nearest integer.
 */
export function avgVistsByDay(csvData, selectors) {
  const { year, month } = selectors; // Destructure year and month from selectors
  if (!Array.isArray(csvData)) return 0;
  const filteredData = csvData.filter(
    (row) =>
      row.Year &&
      row.Year.trim() === String(year) &&
      row.Month &&
      row.Month.trim() === String(month)
  );
  const convertVisitsToNum = filteredData.map((row) => Number(row.Visits));
  const numberOfDaysForTheMonth = convertVisitsToNum.length;
  const sumNums = convertVisitsToNum.reduce((sum, visits) => sum + visits, 0);
  const avg = Math.round(sumNums / numberOfDaysForTheMonth);
  return avg;
}

// function to get the array data for avg vists per day for each month
/**
 * Calculates the average visits per day for each month of a specific year from the provided CSV data.
 * @param {Array<Object>} csvData - The parsed CSV data as an array of objects.
 * @param {number|string} year - The year for which to calculate the average visits per day by month.
 * @returns {Array<Object>} An array of objects, each containing the month and its corresponding average visits per day.
 */
// Calculates the average visits per day for each month of a specific year from the provided CSV data.
export function avgVistsPerDayByMonth(csvData, selectors) {
  const { year } = selectors; // Destructure year from selectors
  // Step 1: Return an empty array if the input data is not an array
  if (!Array.isArray(csvData)) return [];

  // Step 2: Define all months in order
  const months = [
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

  // Step 3: For each month, calculate the average visits per day
  return (
    months
      .map((month) => {
        // Step 3a: Filter data for the selected year and current month
        // Returns: an array of objects for the given month and year, or [] if no data
        const filteredData = csvData.filter(
          (row) =>
            row.Year &&
            row.Year.trim() === String(year) &&
            row.Month &&
            row.Month.trim() === month
        );

        // Step 3b: Convert Visits to numbers and filter out invalid values (NaN)
        // Returns: an array of numbers (visits) for the month, or [] if no valid data
        const visitsArr = filteredData
          .map((row) => Number(row.Visits))
          .filter((v) => !isNaN(v));

        // Step 3c: If there is no data for this month, return null (will be filtered out later)
        // Returns: null if no data for this month
        if (visitsArr.length === 0) return null;

        // Step 3d: Sum all visits for the month
        // Returns: a number representing the total visits for the month
        const sum = visitsArr.reduce((a, b) => a + b, 0);

        // Step 3e: Calculate and return the rounded average for this month
        // Returns: an object { month, avg } for this month
        return { month, avg: Math.round(sum / visitsArr.length) };
      })
      // Step 4: Remove months with no data (null values)
      // Returns: an array of { month, avg } objects, only for months with data
      .filter(Boolean)
  );
}

// Fuction for getting the Avg Visits By Day of The Week
export function avgVisitsByDayOfTheWeek(csvData, selectors) {
  const { year } = selectors; // Destructure year from selectors
  // Step 1: Return an empty array if the input data is not an array
  if (!Array.isArray(csvData)) return [];
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  return days
    .map((day) => {
      const filteredData = csvData.filter(
        (row) =>
          row.Year &&
          row.Year.trim() === String(year) &&
          row["Day of the week"] &&
          row["Day of the week"].trim() === day
      );
      const visitsArr = filteredData
        .map((row) => Number(row.Visits))
        .filter((v) => !isNaN(v));
      if (visitsArr.length === 0) return null;
      const sum = visitsArr.reduce((a, b) => a + b, 0);
      return { day, avg: Math.round(sum / visitsArr.length) };
    })
    .filter(Boolean);
}

// for the line chart. gets data for the trend line form csvData.
export function getYearsAndTotals(csvData) {
  if (!Array.isArray(csvData)) return 0;
  let allYears = csvData.map((row) => row.Year); // get all years
  // console.log(allYears);
  allYears = allYears.filter((year) => Boolean(year));
  const yearsSet = new Set(allYears); // make unique set of years
  // console.log(yearsSet);
  const years = [...yearsSet]; // turn set back to array
  // console.log(years);
  const yearTotals = years.map((y) => {
    const total = Math.round(
      csvData
        .filter((row) => row.Year === y)
        .map((row) => Number(row.Visits))
        .reduce((sum, current) => sum + current, 0)
    );
    return { year: y, total };
  });

  // console.log(yearTotals);
  return yearTotals;
}

/**
 * The utility functions found below will be for the Question Sheet Pages for both MED and HSL.
 */
