import { format, addDays } from "date-fns";

export function formatTodoDueDate(date) {
  return format(date, "EEE dd MMM", { weekStartsOn: 1 });
}

export function formatSectionDate() {
  const todayDate = new Date();
  const todayFormattedDate = format(todayDate, "EEE dd MMM", {
    weekStartsOn: 1,
  });

  return { todayDate, todayFormattedDate };
}

export function formatTomorrowDate() {
  const tomorrowDate = addDays(new Date(), 1);
  const tomorrowFormattedDate = format(tomorrowDate, "EEE dd MMM", {
    weekStartsOn: 1,
  });

  return { tomorrowDate, tomorrowFormattedDate };
}
