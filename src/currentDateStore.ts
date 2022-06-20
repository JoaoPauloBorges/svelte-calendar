import { writable } from "svelte/store";

export const currentDate = writable(new Date());

export function increaseMonth() {
  currentDate.update(
    (current) => new Date(current.getFullYear(), current.getMonth() + 1, 1)
  );
}
export function decreaseMonth() {
  currentDate.update(
    (current) => new Date(current.getFullYear(), current.getMonth() - 1, 1)
  );
}
export function setCurrentYear(year: number) {
  currentDate.update(
    (current) => new Date(new Date(current).setFullYear(year))
  );
}
export function resetCurrentDate() {
  currentDate.set(new Date());
}
