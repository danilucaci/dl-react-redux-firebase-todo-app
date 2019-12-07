import {
  getTimeStringFromDate,
  formatHour,
  restoreDateTime,
  addTimeToDate,
  getHoursFromTime,
  getMinutesFromTime,
  getNthDate,
  getMaxNextDays,
  isBetweenNextDaysInverval,
  formatRelativeDate,
  formatDateWithTime,
  formatDateWithoutTime,
  formatTodoDueDateWithoutTime,
  formatTodoDueDateWithTime,
  formatNextDaysTodoDueDateWithTime,
  formatShortDate,
  formatTodaySectionDate,
  formatAndAddDate,
  formatAndAddDay,
  isFutureDate,
  isPastDate,
} from "../dates";
import {
  getTestDatePlusNDays,
  getTestDateMinusNDays,
  getTestDateMinusNHours,
  getTestDateMinusNMinutes,
  getTestDatePlusNHours,
} from "../tests";

import { MAX_NEXT_DAYS_COUNT } from "../../constants/ui";

test("getTimeStringFromDate returns '' when called with an invalid date", () => {
  const date = {
    raw: null,
    expected: "",
  };

  const result = getTimeStringFromDate(date.raw);

  expect(result).toEqual(date.expected);
});

describe("compares nth dates", () => {
  test(`compares date with current date plus 1`, () => {
    const datePlus1 = getTestDatePlusNDays(1);

    expect(getNthDate(datePlus1, 1)).toEqual(true);
  });

  test(`compares date with current date plus 2`, () => {
    const datePlus2 = getTestDatePlusNDays(2);

    expect(getNthDate(datePlus2, 2)).toEqual(true);
  });

  test(`compares date with current date plus 5`, () => {
    const datePlus5 = getTestDatePlusNDays(5);

    expect(getNthDate(datePlus5, 5)).toEqual(true);
  });

  test(`compares past date with current date minus 3`, () => {
    const dateMinus3 = getTestDateMinusNDays(3);

    expect(getNthDate(dateMinus3, 3)).toEqual(false);
  });

  test(`compares past date with current date minus 5`, () => {
    const dateMinus5 = getTestDateMinusNDays(5);

    expect(getNthDate(dateMinus5, 5)).toEqual(false);
  });
});

test(`compares the max next days date`, () => {
  const testDateMaxDays = getTestDatePlusNDays(MAX_NEXT_DAYS_COUNT);
  const testDateYear = testDateMaxDays.getUTCFullYear();
  const testDateMonth = testDateMaxDays.getUTCMonth();
  const testDateDate = testDateMaxDays.getUTCDate();
  const testDateHour = testDateMaxDays.getUTCHours();
  const testDateMinutes = testDateMaxDays.getUTCMinutes();

  const fnDateMaxDays = getMaxNextDays();
  const fnDateYear = fnDateMaxDays.getUTCFullYear();
  const fnDateMonth = fnDateMaxDays.getUTCMonth();
  const fnDateDate = fnDateMaxDays.getUTCDate();
  const fnDateHour = fnDateMaxDays.getUTCHours();
  const fnDateMinutes = fnDateMaxDays.getUTCMinutes();

  // Can’t compare the entire date string because
  // it could be off by a couple of ms on execution time
  expect(testDateYear).toEqual(fnDateYear);
  expect(testDateMonth).toEqual(fnDateMonth);
  expect(testDateDate).toEqual(fnDateDate);
  expect(testDateHour).toEqual(fnDateHour);
  expect(testDateMinutes).toEqual(fnDateMinutes);
});

describe("date is between next days inverval", () => {
  test(`today plus 1 days date is between next days inverval`, () => {
    const todayPlus1 = getTestDatePlusNDays(1);

    expect(isBetweenNextDaysInverval(todayPlus1)).toBe(true);
  });

  test(`today plus 2 days date is between next days inverval`, () => {
    const todayPlus2 = getTestDatePlusNDays(2);

    expect(isBetweenNextDaysInverval(todayPlus2)).toBe(true);
  });

  test(`today plus 5 days date is between next days inverval`, () => {
    const todayPlus5 = getTestDatePlusNDays(5);

    expect(isBetweenNextDaysInverval(todayPlus5)).toBe(true);
  });

  test(`today plus 10 days date is not between next days inverval`, () => {
    const todayPlus10 = getTestDatePlusNDays(10);

    expect(isBetweenNextDaysInverval(todayPlus10)).toBe(false);
  });

  test(`today minus 1 days date is not between next days inverval`, () => {
    const todayMinus1 = getTestDateMinusNDays(1);

    expect(isBetweenNextDaysInverval(todayMinus1)).toBe(false);
  });

  test(`today minus 2 days date is not between next days inverval`, () => {
    const todayMinus2 = getTestDateMinusNDays(2);

    expect(isBetweenNextDaysInverval(todayMinus2)).toBe(false);
  });
});

describe("formats relative dates", () => {
  test("renders 2 hours ago", () => {
    const pastDate = getTestDateMinusNHours(2);
    expect(formatRelativeDate(pastDate)).toBe("2 hours ago");
  });

  test("renders 5 hours ago", () => {
    const pastDate = getTestDateMinusNHours(5);
    expect(formatRelativeDate(pastDate)).toBe("5 hours ago");
  });

  test("renders 20 minutes ago", () => {
    const pastDate = getTestDateMinusNMinutes(20);
    expect(formatRelativeDate(pastDate)).toBe("20 minutes ago");
  });

  test("renders 35 minutes ago", () => {
    const pastDate = getTestDateMinusNMinutes(35);
    expect(formatRelativeDate(pastDate)).toBe("35 minutes ago");
  });
});

describe("formats dates with time", () => {
  test("formats 2019/12/10 22:33 date with time", () => {
    const date = new Date("2019/12/10 22:33");
    const formattedDate = formatDateWithTime(date);
    expect(formattedDate).toBe("Tue Dec 10 2019 22:33");
  });
  test("formats 2019/05/10 12:32 date with time", () => {
    const date = new Date("2019/05/10 12:32");
    const formattedDate = formatDateWithTime(date);
    expect(formattedDate).toBe("Fri May 10 2019 12:32");
  });
  test("formats 2019/05/11 16:20 date with time", () => {
    const date = new Date("2019/05/11 16:20");
    const formattedDate = formatDateWithTime(date);
    expect(formattedDate).toBe("Sat May 11 2019 16:20");
  });
});

describe("formats dates without time", () => {
  test("formats 2019/12/10 22:33 date without time", () => {
    const date = new Date("2019/12/10 22:33");
    const formattedDate = formatDateWithoutTime(date);
    expect(formattedDate).toBe("Tue Dec 10 2019");
  });
  test("formats 2019/05/10 12:32 date without time", () => {
    const date = new Date("2019/05/10 12:32");
    const formattedDate = formatDateWithoutTime(date);
    expect(formattedDate).toBe("Fri May 10 2019");
  });
  test("formats 2019/05/11 16:20 date without time", () => {
    const date = new Date("2019/05/11 16:20");
    const formattedDate = formatDateWithoutTime(date);
    expect(formattedDate).toBe("Sat May 11 2019");
  });
});

describe("formats todo date without time", () => {
  test("formats todo 2019/12/10 22:33 date without time", () => {
    const date = new Date("2019/12/10 22:33");
    const formattedDate = formatTodoDueDateWithoutTime(date);
    expect(formattedDate).toMatch(/Tue Dec 10 2019/);
  });
  test("formats todo Date.now()() without time", () => {
    const today = new Date();
    const formattedToday = formatTodoDueDateWithoutTime(today);
    expect(formattedToday).toMatch(/Today|Yesterday|Tomorrow/);
  });
});

describe("formats todo date with time", () => {
  test("formats todo relative date as 2 hours ago", () => {
    const pastDate = getTestDateMinusNHours(2);
    expect(formatTodoDueDateWithTime(pastDate)).toBe("2 hours ago");
  });
  test("formats todo relative date as 20 minutes ago", () => {
    const pastDate = getTestDateMinusNMinutes(20);
    expect(formatTodoDueDateWithTime(pastDate)).toBe("20 minutes ago");
  });
  test("formats todo full date with time", () => {
    const futureDate = getTestDatePlusNHours(2);

    expect(formatTodoDueDateWithTime(futureDate)).toMatch(
      /Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec/,
    );
  });
});

describe("formats next days todo date with time", () => {
  test("formats next days todo date as 14:43 in next days interval", () => {
    const futureDate = getTestDatePlusNDays(2);
    futureDate.setHours(14);
    futureDate.setMinutes(43);

    const hours = futureDate.getHours();
    const minutes = futureDate.getMinutes();

    expect(formatNextDaysTodoDueDateWithTime(futureDate)).toBe(
      `${hours}:${minutes}`,
    );
  });
  test("formats next days todo date as 18:21 in next days interval", () => {
    const futureDate = getTestDatePlusNDays(4);
    futureDate.setHours(18);
    futureDate.setMinutes(21);

    const hours = futureDate.getHours();
    const minutes = futureDate.getMinutes();

    expect(formatNextDaysTodoDueDateWithTime(futureDate)).toBe(
      `${hours}:${minutes}`,
    );
  });
  test("formats next days todo relative date as 2 hours ago", () => {
    const pastDate = getTestDateMinusNHours(2);
    expect(formatNextDaysTodoDueDateWithTime(pastDate)).toBe("2 hours ago");
  });
  test("formats next days todo as full date", () => {
    const date = new Date("2019/11/10 22:33");
    const formattedDate = formatNextDaysTodoDueDateWithTime(date);
    expect(formattedDate).toBe("Sun Nov 10 2019 22:33");
  });
});

test("formats next days todo date without time", () => {
  const date = new Date("2019/12/10 22:33");
  const formattedDate = formatDateWithoutTime(date);
  expect(formattedDate).toBe("Tue Dec 10 2019");
});

describe("formats short dates", () => {
  test("formats 2019-12-10 date", () => {
    const date = new Date("2019-12-10");

    expect(formatShortDate(date)).toBe("Tue 10 Dec");
  });
  test("formats 2019-5-12 date", () => {
    const date = new Date("2019-5-12");

    expect(formatShortDate(date)).toBe("Sun 12 May");
  });
  test("returns null if date is invalid", () => {
    expect(formatShortDate(null)).toBe(null);
  });
});

describe("formats next days section short dates", () => {
  test("formats 2019-6-13 date", () => {
    const initialDate = new Date("2019-6-13");

    const { baseDate, todayFormattedDate } = formatTodaySectionDate(
      initialDate,
    );

    // I can compare the entire date string because it doesn’t have a time value
    expect(baseDate).toBe(initialDate);
    expect(todayFormattedDate).toBe("Thu 13 Jun");
  });
  test("formats 2020-1-20 date", () => {
    const initialDate = new Date("2020-1-20");

    const { baseDate, todayFormattedDate } = formatTodaySectionDate(
      initialDate,
    );

    // I can compare the entire date string because it doesn’t have a time value
    expect(baseDate).toBe(initialDate);
    expect(todayFormattedDate).toBe("Mon 20 Jan");
  });
});

describe("formats and adds next days section full dates", () => {
  test("adds 1 day to 2019-6-13 and formats full date", () => {
    const dateString = "2019-6-13";
    const testDate = new Date(dateString);
    const prevDay = testDate.getUTCDate();

    const prevDayPlus1 = prevDay + 1;
    const testDatePlus1 = new Date(dateString);
    testDatePlus1.setUTCDate(prevDayPlus1);

    const { dateAdded, formattedDate } = formatAndAddDate(1, testDate);

    // I can compare the entire date string because it doesn’t have a time value
    expect(testDatePlus1).toEqual(dateAdded);
    expect(formattedDate).toBe("Fri 14 Jun");
  });
  test("adds 5 days to 2019-11-22 and formats full date", () => {
    const dateString = "2019-11-22";
    const testDate = new Date(dateString);
    const prevDay = testDate.getUTCDate();

    const prevDayPlus1 = prevDay + 5;
    const testDatePlus1 = new Date(dateString);
    testDatePlus1.setUTCDate(prevDayPlus1);

    const { dateAdded, formattedDate } = formatAndAddDate(5, testDate);

    // I can compare the entire date string because it doesn’t have a time value
    expect(testDatePlus1).toEqual(dateAdded);
    expect(formattedDate).toBe("Wed 27 Nov");
  });
  test("adds 3 days to 2019-7-15 and formats full date", () => {
    const dateString = "2019-7-15";
    const testDate = new Date(dateString);
    const prevDay = testDate.getUTCDate();

    const prevDayPlus1 = prevDay + 3;
    const testDatePlus1 = new Date(dateString);
    testDatePlus1.setUTCDate(prevDayPlus1);

    const { dateAdded, formattedDate } = formatAndAddDate(3, testDate);

    // I can compare the entire date string because it doesn’t have a time value
    expect(testDatePlus1).toEqual(dateAdded);
    expect(formattedDate).toBe("Thu 18 Jul");
  });
});

describe("formats and adds next days section week days", () => {
  test("adds 1 day to 2019-6-13 and formats week day", () => {
    const dateString = "2019-6-13";
    const testDate = new Date(dateString);
    const prevDay = testDate.getUTCDate();

    const prevDayPlus1 = prevDay + 1;
    const testDatePlus1 = new Date(dateString);
    testDatePlus1.setUTCDate(prevDayPlus1);

    const formattedDate = formatAndAddDay(1, testDate);

    expect(formattedDate).toBe("Friday");
  });
  test("adds 2 days to 2019-7-22 and formats week day", () => {
    const dateString = "2019-7-22";
    const testDate = new Date(dateString);
    const prevDay = testDate.getUTCDate();

    const prevDayPlus1 = prevDay + 2;
    const testDatePlus1 = new Date(dateString);
    testDatePlus1.setUTCDate(prevDayPlus1);

    const formattedDate = formatAndAddDay(2, testDate);

    expect(formattedDate).toBe("Wednesday");
  });
  test("adds 5 days to 2019-11-20 and formats week day", () => {
    const dateString = "2019-11-20";
    const testDate = new Date(dateString);
    const prevDay = testDate.getUTCDate();

    const prevDayPlus1 = prevDay + 5;
    const testDatePlus1 = new Date(dateString);
    testDatePlus1.setUTCDate(prevDayPlus1);

    const formattedDate = formatAndAddDay(5, testDate);

    expect(formattedDate).toBe("Monday");
  });
});

describe("checks past dates", () => {
  test("2019-10-22 is a past date", () => {
    const testDate = new Date("2019-10-22");

    expect(isPastDate(testDate)).toBe(true);
  });
  test("Date.now() plus 1 day is not a past date", () => {
    const testDate = new Date();
    const prevDay = testDate.getUTCDate();

    const prevDayPlus1 = prevDay + 1;
    const testDatePlus1 = new Date();
    testDatePlus1.setUTCDate(prevDayPlus1);

    expect(isPastDate(testDatePlus1)).toBe(false);
  });
});

describe("checks future dates", () => {
  test("2019-10-22 is not a future date", () => {
    const testDate = new Date("2019-10-22");

    expect(isFutureDate(testDate)).toBe(false);
  });
  test("Date.now() plus 1 day is a future date", () => {
    const testDate = new Date();
    const prevDay = testDate.getUTCDate();

    const prevDayPlus1 = prevDay + 1;
    const testDatePlus1 = new Date();
    testDatePlus1.setUTCDate(prevDayPlus1);

    expect(isFutureDate(testDatePlus1)).toBe(true);
  });
});

describe("converts dates to hour strings", () => {
  const validDates = [
    {
      raw: new Date("2019-12-03 12:00"),
      expected: "12:00",
    },
    {
      raw: new Date("2019-12-03 10:22"),
      expected: "10:22",
    },
    {
      raw: new Date("2019-12-03 16:50"),
      expected: "16:50",
    },
    {
      raw: new Date("2019-12-03 21:11"),
      expected: "21:11",
    },
  ];

  validDates.forEach((date) => {
    const result = formatHour(date.raw);

    test(`formats time: ${date.expected} from date`, () => {
      expect(result).toEqual(date.expected);
    });
  });
});

describe("restores hours and minutes in dates", () => {
  const validDates = [
    {
      previous: new Date("2019-12-03 22:23"),
      newDate: new Date("2019-10-22 12:00"),
      expected: new Date("2019-10-22 22:23"),
    },
    {
      previous: new Date("2019-12-14 14:15"),
      newDate: new Date("2019-11-22 12:00"),
      expected: new Date("2019-11-22 14:15"),
    },
    {
      previous: new Date("2019-12-14 11:33"),
      newDate: new Date("2019-10-13 12:00"),
      expected: new Date("2019-10-13 11:33"),
    },
  ];

  validDates.forEach((date) => {
    const result = restoreDateTime(date.previous, date.newDate);

    test(`restores the previous time in date: ${date.expected.toISOString()}`, () => {
      expect(result).toEqual(date.expected);
    });
  });
});

describe("adds hours and minutes to each date", () => {
  const validDates = [
    {
      previous: new Date("2019-12-03 22:23"),
      time: "11:20",
      expected: new Date("2019-12-03 11:20"),
    },
    {
      previous: new Date("2019-12-14 14:15"),
      time: "17:25",
      expected: new Date("2019-12-14 17:25"),
    },
    {
      previous: new Date("2019-12-14 11:33"),
      time: "22:23",
      expected: new Date("2019-12-14 22:23"),
    },
  ];

  validDates.forEach((date) => {
    const result = addTimeToDate(date.previous, date.time);

    test(`adds: ${date.time} to previous time`, () => {
      expect(result).toEqual(date.expected);
    });
  });
});

describe("gets hours from each hh:mm", () => {
  const entries = [
    {
      time: "11:20",
      expected: 11,
    },
    {
      time: "17:25",
      expected: 17,
    },
    {
      time: "22:23",
      expected: 22,
    },
  ];

  entries.forEach((entry) => {
    const result = getHoursFromTime(entry.time);

    test(`gets hour: ${entry.expected} from time: ${entry.time}`, () => {
      expect(result).toEqual(entry.expected);
    });
  });
});

describe("gets minutes from each hh:mm", () => {
  const entries = [
    {
      time: "11:20",
      expected: 20,
    },
    {
      time: "17:25",
      expected: 25,
    },
    {
      time: "22:23",
      expected: 23,
    },
  ];

  entries.forEach((entry) => {
    const result = getMinutesFromTime(entry.time);

    test(`gets minutes: ${entry.expected} from time: ${entry.time}`, () => {
      expect(result).toEqual(entry.expected);
    });
  });
});
