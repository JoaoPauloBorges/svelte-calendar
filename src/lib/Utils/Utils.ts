export function getWeekNames(locale = "en-US") {
  var baseDate = new Date(Date.UTC(2017, 0, 2));
  var weekDays: any[] = [];
  for (let i = 1; i <= 7; i++) {
    const weekName = baseDate.toLocaleDateString(locale, { weekday: "short" });
    weekDays.push(weekName);
    baseDate.setDate(baseDate.getUTCDate() + 1);
  }
  return weekDays;
}

export const getMonthName = (month: number) => {
  const date = new Date();
  date.setMonth(month);
  return date.toLocaleDateString("default", { month: "long" });
};

export const getMonthDays = (month: number, year: number) => {
  return new Date(year, month + 1, 0).getUTCDate();
};
export const getFirstDayOfTheWeek = (month: number, year: number) => {
  return new Date(year, month, 1).getUTCDay() + 1;
};

export const getLastDayOfTheWeek = (month: number, year: number) => {
  return new Date(year, month, getMonthDays(month, year)).getUTCDay() + 1;
};

export const isDocumentBiggerThanView = () => {
  let scrollHeight = Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.body.clientHeight,
    document.documentElement.clientHeight
  );

  const clientHeight = document.documentElement.clientHeight;
  return clientHeight < scrollHeight;
};

export const getContrastingFontColor = (color) => {
  color=color.slice(1, -1);
  const red = color.slice(0, 2);
  const green = color.slice(3, 5);
  const blue = color.slice(4, 6)
  return (red*0.299 + green*0.587 + blue*0.114) > 150 ? '#000' : '#fff'
}
