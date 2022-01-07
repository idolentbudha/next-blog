export const mysqlDateTime = () => {
  // local timezone provided by user's device
  let d = new Date();
  console.log("JavaScript timestamp: " + d.toLocaleString());

  // add 30 minutes
  let add30Minutes = new Date(
    d.getFullYear(),
    d.getMonth(),
    d.getDate(),
    d.getHours(),
    d.getMinutes() + 30, // add 30 minutes
    d.getSeconds(),
    d.getMilliseconds()
  );
  console.log("Add 30 mins: " + add30Minutes.toLocaleString());

  // ISO formatted UTC timestamp
  // timezone is always zero UTC offset, as denoted by the suffix "Z"
  let isoString = add30Minutes.toISOString();
  console.log("ISO formatted UTC timestamp: " + isoString);

  // MySQL formatted UTC timestamp: YYYY-MM-DD HH:MM:SS
  let mySqlTimestamp = isoString.slice(0, 19).replace("T", " ");
  console.log("MySQL formatted UTC timestamp: " + mySqlTimestamp);
  return mySqlTimestamp;
};
