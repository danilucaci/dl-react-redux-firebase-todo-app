import {
  format,
  addDays,
  isFuture,
  isSameDay,
  isPast,
  isToday,
  startOfYesterday,
  endOfTomorrow,
  isYesterday,
  isTomorrow,
  parseJSON,
  isWithinInterval,
  setHours,
  setMinutes,
  isValid,
  getHours,
  getMinutes,
} from "date-fns";

import TimeAgo from "javascript-time-ago";

// Load locale-specific relative date/time formatting rules.
import en from "javascript-time-ago/locale/en";

import { MAX_NEXT_DAYS_COUNT } from "../constants/ui";

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
 * Get the time string for the TimeInput field mask
 * @param {Date} date
 * @returns Formatted time
 * @example
 * 15:00
 */
export function getTimeStringFromDate(date) {
  if (!isValid(date)) return "";

  return formatHour(date);
}

/**
 * Restores the time of the previous date and adds it to the new date.
 * @param {Date} prevDate The previous date with a time added.
 * @param {Date} newDate The new date with the time values changed by the date picker.
 * @returns The new date with the hours and minutes restored.
 */
export function restoreDateTime(prevDate, newDate) {
  if (!isValid(prevDate) || !isValid(newDate)) return null;

  const prevHours = getHours(prevDate);
  const prevMinutes = getMinutes(prevDate);

  let dateWithTime = setHours(new Date(newDate), prevHours);
  dateWithTime = setMinutes(dateWithTime, prevMinutes);

  return dateWithTime;
}

/**
 * Get the hours from the `TimeInput` mask
 * @param {string} time
 * @returns hours The hours extracted from the `time`
 */
export function getHoursFromTime(time = "") {
  if (typeof time !== "string") return null;

  // Expects hh:mm => hh
  const hours = Number(time.split(":")[0]);

  if (!Number.isNaN(hours) && typeof hours === "number") {
    return hours;
  }

  return null;
}

/**
 * Get the minutes from the `TimeInput` mask
 * @param {string} time
 * @returns hours The minutes extracted from the `time`
 */
export function getMinutesFromTime(time = "") {
  if (typeof time !== "string") return null;

  // Expects hh:mm => mm
  const minutes = Number(time.split(":")[1]);

  if (!Number.isNaN(minutes) && typeof minutes === "number") {
    return minutes;
  }

  return null;
}

/**
 * Adds hours and minutes to a date.
 * @param {Date} date The date to add the hours and minutes to
 * @param {string} time The `time` from the input mask
 * @returns Date
 */
export function addTimeToDate(date, time) {
  if (typeof time !== "string") return null;

  // If the date is null, set the time to `Date.now()` plus 1 day (tomorrow)
  if (!date) {
    const parsedDate = addDays(new Date(), 1);
    const hours = getHoursFromTime(time);
    const minutes = getMinutesFromTime(time);

    if (hours !== null && minutes !== null) {
      let newDate = setHours(parsedDate, hours);
      newDate = setMinutes(newDate, minutes);

      return newDate;
    }
  } else {
    const parsedDate = parseDate(date);
    const hours = getHoursFromTime(time);
    const minutes = getMinutesFromTime(time);

    if (hours !== null && minutes !== null) {
      let newDate = setHours(parsedDate, hours);
      newDate = setMinutes(newDate, minutes);

      return newDate;
    }
  }

  return null;
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
  return addDays(new Date(), MAX_NEXT_DAYS_COUNT);
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
 * Check if the provided date is between yesterday and the current date.
 * @param {Date} date The date to be compare if it is within the range.
 * @returns {Boolean}
 */
export function isPastDateFromYesterday(date) {
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
export function formatDateWithTime(date) {
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
 * @link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
 * @param {Date} date
 * @returns Formatted date
 * @example
 * Sat Nov 9 2019
 */
export function formatDateWithoutTime(date) {
  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
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
 * Checks if the provided `date` is between `startOfYesterday` and `endOfTomorrow`
 * @param {Date} date
 */
export function isDateBetweenYesterdayOrTomorrow(date) {
  return isWithinInterval(parseDate(date), {
    start: startOfYesterday(),
    end: endOfTomorrow(),
  });
}

/**
 * Formats the due date of the `<Todo />` components that don’t have a time set.
 *
 * @param {Date} date
 * If the provided `date` is `yesterday` returns `Yesterday`.
 *
 * If the provided `date` is `tomorrow` returns `Tomorrow`.
 *
 * Otherwise returns the full `date` without a time value.
 *
 * @example
 * Sat Nov 9 2019
 */
export function formatTodoDueDateWithoutTime(date) {
  if (!isValid(date)) return null;

  if (isToday(date)) {
    return "Today";
  }

  if (isYesterday(date)) {
    return "Yesterday";
  }

  if (isTomorrow(date)) {
    return "Tomorrow";
  }

  return formatDateWithoutTime(date);
}

/**
 * Formats the due dates of the `<Todo />` components that have a time set.
 *
 * @param {Date} date
 * If the provided `date` is between the start of yesterday
 * and the current time, it returns the relative formatted date.
 *
 * Otherwise it returns the full date with a time value
 *
 * @returns {Date} `formatRelativeDate(date)`
 * @example
 * 2 hours ago
 *
 * @example
 * Sat Nov 9 2019 10:05
 */
export function formatTodoDueDateWithTime(date) {
  if (isPastDateFromYesterday(date)) {
    return formatRelativeDate(date);
  }

  return formatDateWithTime(date);
}

/**
 * Formats the due date of the `<Todo />` components
 * from the `next-days` page that have a time set.
 *
 * @param {Date} date
 * If the provided `date` is between the current date
 * and the max number of days in the next days section,
 * it returns the formatted time (hour and minutes).
 *
 * If the provided `date` is between the start of yesterday
 * and the current time, it returns the formatted date.
 *
 * @returns {Date} `formatHour(date)`
 * @example
 * 15:00
 *
 * @returns {Date} `formatRelativeDate(date)`
 * @example
 * Sat Nov 9 2019 10:05
 */
export function formatNextDaysTodoDueDateWithTime(date) {
  if (isBetweenNextDaysInverval(date)) {
    return formatHour(date);
  }

  if (isPastDateFromYesterday(date)) {
    return formatRelativeDate(date);
  }

  return formatDateWithTime(date);
}

/**
 * Formats the due date of the `<Todo />` components
 * from the `next-days` page that don’t have a time set.
 *
 * @param {Date} date Full date without a time value
 */
export function formatNextDaysTodoDueDateWithoutTime(date) {
  return formatDateWithoutTime(date);
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
