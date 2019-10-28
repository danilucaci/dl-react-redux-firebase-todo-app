import {
  format,
  addDays,
  isFuture,
  isSameDay,
  isPast,
  isToday,
  isTomorrow,
  formatRelative,
  parseJSON,
} from "date-fns";

export function parseDate(date) {
  return parseJSON(date);
}

export function getNthDate(date, dateCount = 0) {
  const dateAdded = addDays(new Date(), dateCount);

  return isSameDay(parseDate(date), dateAdded);
}

export function formatTodoDueDate(date) {
  if (isToday(parseDate(date)) || isTomorrow(parseDate(date))) {
    return formatRelative(parseDate(date), new Date(), { weekStartsOn: 1 });
  }

  return format(parseDate(date), "EEE dd MMM kk:mm", { weekStartsOn: 1 });
}

export function formatTodaySectionDate() {
  const todayDate = new Date();
  const todayFormattedDate = format(todayDate, "EEE dd MMM", {
    weekStartsOn: 1,
  });

  return { todayDate, todayFormattedDate };
}

export function formatAndAddDate(dateCount = 0) {
  const dateAdded = addDays(new Date(), dateCount);

  // @returns Tue 15 Oct
  const formattedDate = format(dateAdded, "EEE dd MMM", {
    weekStartsOn: 1,
  });

  return { dateAdded, formattedDate };
}

export function formatAndAddDay(dateCount = 0) {
  const dateAdded = addDays(new Date(), dateCount);

  // @returns Thursday | Monday | Friday | etc
  const formattedDate = format(dateAdded, "cccc", {
    weekStartsOn: 1,
  });

  return formattedDate;
}

export function isPastDate(date) {
  return isPast(parseDate(date));
}

export function isFutureDate(date) {
  return isFuture(parseDate(date));
}

export function isTodayDate(date) {
  return isToday(parseDate(date));
}
