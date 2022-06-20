<script lang="ts">
  import {
    getFirstDayOfTheWeek,
    getMonthDays,
    getLastDayOfTheWeek,
  } from "../Utils/Utils";
  import Day from "./Day.svelte";
  export let month: number;
  export let year: number;

  const fillPastMonth = (year: number, month: number) => {
    const startDayOfTheWeak = getFirstDayOfTheWeek(month, year);
    const pastMonthTotalDays = getMonthDays(
      month - 1 === -1 ? 0 : month - 1,
      year
    );

    const daysPastMonth: any[] = [];
    for (let i = startDayOfTheWeak - 1; i >= 1; i--) {
      daysPastMonth.push(new Date(year, month - 1, pastMonthTotalDays + 1 - i));
    }
    return daysPastMonth;
  };

  const fillCurrentMonth = (year: number, month: number) => {
    const isCurrentDay = (dayToEvaluate: number) => {
      const day = new Date(year, month, dayToEvaluate);
      return day.toDateString() === new Date().toDateString();
    };

    const currentMonthTotaldays = getMonthDays(month, year);

    const daysCurrentMonth: any[] = [];
    for (let i = 1; i <= currentMonthTotaldays; i++) {
      daysCurrentMonth.push({
        current: isCurrentDay(i),
        date: new Date(year, month, i),
      });
    }
    return daysCurrentMonth;
  };

  const fillNextMonth = (year: number, month: number) => {
    const lastDayOfTheWeak = getLastDayOfTheWeek(month, year);

    const daysNextMonth: any[] = [];
    for (let i = 1; i <= 7 - lastDayOfTheWeak; i++) {
      daysNextMonth.push(new Date(year, month + 1, i));
    }

    return daysNextMonth;
  };
</script>

{#each fillPastMonth(year, month) as date}
  <Day disable {date} />
{/each}
{#each fillCurrentMonth(year, month) as day}
  <Day current={day.current} date={day.date} />
{/each}
{#each fillNextMonth(year, month) as date}
  <Day disable {date} />
{/each}
