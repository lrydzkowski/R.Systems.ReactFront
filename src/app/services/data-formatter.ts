export const formatDate = (date: string): string => {
  date = date?.trim();

  if (date === null || date === undefined || date.length === 0) {
    return "";
  }

  const dateObj = new Date(date);
  const dateFormatted =
    dateObj.getFullYear() +
    "-" +
    (dateObj.getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    (dateObj.getDay() + 1).toString().padStart(2, "0") +
    " " +
    dateObj.getHours().toString().padStart(2, "0") +
    ":" +
    dateObj.getMinutes().toString().padStart(2, "0") +
    ":" +
    dateObj.getSeconds().toString().padStart(2, "0");

  return dateFormatted;
};
