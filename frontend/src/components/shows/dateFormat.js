async function formatDate(stDate, edDate) {
  // Stringify date.
  let startYear = stDate.getFullYear().toString();
  let startMonth = (stDate.getMonth() + 1).toString();
  let startDay = stDate.getDate().toString();
  let endYear = edDate.getFullYear().toString();
  let endMonth = (edDate.getMonth() + 1).toString();
  let endDay = edDate.getDate().toString();

  // Format shifting to YYYY-MM-DD.
  startYear = startYear >= 10 ? startYear : "0" + startYear;
  startMonth = startMonth >= 10 ? startMonth : "0" + startMonth;
  startDay = startDay >= 10 ? startDay : "0" + startDay;
  endYear = endYear >= 10 ? endYear : "0" + endYear;
  endMonth = endMonth >= 10 ? endMonth : "0" + endMonth;
  endDay = endDay >= 10 ? endDay : "0" + endDay;
  // Get completely formatted date.
  const startDateResult = startYear + startMonth + startDay;
  const endDateResult = endYear + endMonth + endDay;
  return { startDateResult, endDateResult };
}

module.exports = { formatDate };
