import { writable } from "svelte/store";
import { Colors } from "./lib/CalendarViewer/Events/colors.enum";
import type { Event } from "./lib/CalendarViewer/Events/Event";

export function fetchHolidays(newDate: Date) {
  return fetch(`https://brasilapi.com.br/api/feriados/v1/${newDate.getUTCFullYear()}`)
    .then((response) => response.json())
    .then((holidays: { date: string; name: string; type: string }[]) => {
      console.log(`loading ${newDate.getUTCFullYear()} holidays`);
      yearChanged(
        holidays.map((holiday, idx) => ({
          color: Object.values(Colors)[idx % Object.keys(Colors).length],
          when: new Date(`${holiday.date}T00:00`),
          createdAt: new Date().getTime(),
          description: holiday.name,
          holiday: true,
        }))
      );
    })
    .catch((error) => {
      console.log(error);
      return [];
    });
}

const initialState: Event[] = [];
for (let i = 0; i < 7; i++) {
  initialState.push({
    when: new Date(new Date().setHours(i + 12, 0, 0)),
    createdAt: new Date(2022, 6, i).getTime(),
    color: Object.values(Colors)[i],
    description: `example ${i}`,
  } as Event);
}

export const eventList = writable(initialState);

export function addEvent(event: Event) {
  eventList.update((list) => [...list, event]);
}
export function editEvent(payload: Event) {
  eventList.update((list) =>
    list.map((event) => {
      if (event.createdAt !== payload.createdAt) {
        return event;
      }
      console.log('aaaaaa', { ...payload })
      return { ...payload, createdAt: event.createdAt };
    })
  );
}
export function deleteEvent(payload: Event) {
  eventList.update((list) =>
    list.filter((event) => event.createdAt !== payload.createdAt)
  );
}

function yearChanged(payload: Event[]) {
  eventList.update((list) => [
    ...list.filter((event) => event.holiday !== true),
    ...payload,
  ]);
}
