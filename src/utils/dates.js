import {
  format,
  addDays,
  isFuture,
  isSameDay,
  isPast,
  isToday,
  isTomorrow,
  formatRelative,
} from "date-fns";

export function getNthDate(date, dateCount = 0) {
  const dateAdded = addDays(new Date(), dateCount);

  return isSameDay(date, dateAdded);
}

export function formatTodoDueDate(date) {
  if (isToday(date) || isTomorrow(date)) {
    return formatRelative(date, new Date(), { weekStartsOn: 1 });
  }

  return format(date, "EEE dd MMM kk:mm", { weekStartsOn: 1 });
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
  return isPast(date);
}

export function isFutureDate(date) {
  return isFuture(date);
}

export function isTodayDate(date) {
  return isToday(date);
}
