import {
  format,
  addDays,
  isFuture,
  isSameDay,
  isPast,
  isToday,
  startOfYesterday,
  parseJSON,
  isWithinInterval,
} from "date-fns";

import TimeAgo from "javascript-time-ago";

// Load locale-specific relative date/time formatting rules.
import en from "javascript-time-ago/locale/en";

// Add locale-specific relative date/time formatting rules.
TimeAgo.addLocale(en);

// Create relative date/time formatter.
const timeAgo = new TimeAgo("en-US");

/**
 * Parses the provided date in json format with date-fns parseJSON
 * @param {Date} date
 * @returns {Date}
 */
export function parseDate(date) {
  return parseJSON(date);
}

/**
 * Checks if the provided date is the same on as Date.now + dateCount
 * @param {Date} date
 * @param {number} dateCount
 * @returns {Boolean}
 */
export function getNthDate(date, dateCount = 0) {
  const dateAdded = addDays(new Date(), dateCount);

  return isSameDay(parseDate(date), dateAdded);
}

/**
 * Get the latest date the app allows for the next days section
 * @returns {Date} Max number of days from `new Date()`
 */
export function getMaxNextDays() {
  return addDays(new Date(), 7);
}

/**
 * Check if the provided date is between `new Date()`
 * and the max amount of days from the next days section.
 * @param {Date} date The date to be compare if it is within the range.
 * @returns {Boolean}
 */
export function isBetweenNextDaysInverval(date) {
  return isWithinInterval(parseDate(date), {
    start: new Date(),
    end: getMaxNextDays(),
  });
}

/**
 * Check if the provided date is between `new Date()`
 * and the max amount of days from the next days section.
 * @param {Date} date The date to be compare if it is within the range.
 * @returns {Boolean}
 */
export function isPastDateUntilYesterday(date) {
  return isWithinInterval(parseDate(date), {
    start: startOfYesterday(),
    end: new Date(),
  });
}

/**
 * @link https://github.com/catamphetamine/javascript-time-ago/
 * @param {Date} date
 * @returns Relative formatted date
 * @example
 *
 */
export function formatRelativeDate(date) {
  return timeAgo.format(parseDate(date));
}

/**
 * @link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
 * @param {Date} date
 * @returns Formatted date
 * @example
 * Sat Nov 9 2019 10:05
 */
export function formatDate(date) {
  const options = {
    hour12: false,
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  return new Intl.DateTimeFormat("en-US", options)
    .format(parseDate(date))
    .split(",")
    .join(" ");
}

/**
 * @param {Date} date
 * @returns Formatted hour
 * @example
 * 15:00
 */
export function formatHour(date) {
  const options = {
    hour12: false,
    hour: "numeric",
    minute: "numeric",
  };

  return new Intl.DateTimeFormat("en-US", options).format(parseDate(date));
}

/**
 * Formats the due dates of the `<Todo />` components.
 *
 * @param {Date} date
 * If the provided `date` is between the current date
 * and the max number of days in the next days section,
 * it returns the formatted time (hour).
 *
 * If the provided `date` is between the start of yesterday
 * and the current time, it returns the formatted date.
 *
 *
 * @returns {Date} `formatHour(date)`
 * @example
 * 15:00
 *
 * @returns {Date} `formatRelativeDate(date)`
 * @example
 * Sat Nov 9 2019 10:05
 */
export function formatTodoDueDate(date) {
  if (isBetweenNextDaysInverval(date)) {
    return formatHour(date);
  }
  if (isPastDateUntilYesterday(parseDate(date))) {
    return formatRelativeDate(date);
  }

  return formatDate(date);
}

/**
 * Formats the date for the `Today` section and page
 * @returns {Date} The current date
 * @returns {string} The current date formatted
 * @example
 * Wed 06 Nov
 */
export function formatTodaySectionDate() {
  const todayDate = new Date();
  const todayFormattedDate = format(todayDate, "EEE dd MMM", {
    weekStartsOn: 1,
  });

  return { todayDate, todayFormattedDate };
}

/**
 * Formats the date for the `Next Days` sections
 * @param {number} dateCount The number of days to add to the current date
 * @returns {Date} The current date with the `dateCount` added
 * @returns {string} The current date with the `dateCount` added and formatted
 * @example
 * Tue 15 Oct
 */
export function formatAndAddDate(dateCount = 0) {
  const dateAdded = addDays(new Date(), dateCount);

  const formattedDate = format(dateAdded, "EEE dd MMM", {
    weekStartsOn: 1,
  });

  return { dateAdded, formattedDate };
}

/**
 * Formats the weekday for the `Next Days` sections
 * @param {number} dateCount The number of days to add to the current date
 * @returns {string} The weekday of current date plus the `dateCount` added
 * @example
 * Monday | Tuesday | Wednesday | ...
 */
export function formatAndAddDay(dateCount = 0) {
  const dateAdded = addDays(new Date(), dateCount);

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
  return isToday(parseDate(date)) && !isPastDate(date);
}
