import { writable } from "svelte/store";
import { fetchHolidays } from "./eventsStore";

export const currentDate = writable(new Date());

function updateHolidays(current, newDate) {
  if (newDate.getUTCFullYear() !== current.getUTCFullYear()) {
    fetchHolidays(newDate);
  }
  return newDate;
}

export function increaseMonth() {
  currentDate.update((current) =>
    updateHolidays(
      current,
      new Date(current.getUTCFullYear(), current.getUTCMonth() + 1, 1)
    )
  );
}
export function decreaseMonth() {
  currentDate.update((current) =>
    updateHolidays(
      current,
      new Date(current.getUTCFullYear(), current.getUTCMonth() - 1, 1)
    )
  );
}
export function setCurrentYear(year: number) {
  currentDate.update((current) =>
    updateHolidays(current, new Date(new Date(current).setFullYear(year)))
  );
}

export function resetCurrentDate() {
  currentDate.set(new Date());
  fetchHolidays(new Date());
}
