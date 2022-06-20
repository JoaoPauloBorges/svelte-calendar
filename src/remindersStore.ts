import { writable } from "svelte/store";
import { Colors } from "./lib/CalendarViewer/Reminder/colors.enum";
import type { Reminder } from "./lib/CalendarViewer/Reminder/Reminder";

const initialState: Reminder[] = [];
for (let i = 0; i < 7; i++) {
  initialState.push({
    when: new Date().getTime(),
    createdAt: new Date(2022, 6, i).getTime(),
    color: Object.values(Colors)[i],
    description: `example ${i}`,
  } as Reminder);
}

export const remindersList = writable(initialState);

export function addReminder(reminder: Reminder) {
  remindersList.update((list) => [...list, reminder]);
}
export function editReminder(payload: Reminder) {
  remindersList.update((list) =>
    list.map((reminder) => {
      if (reminder.createdAt !== payload.createdAt) {
        return reminder;
      }
      return { ...payload, createdAt: reminder.createdAt };
    })
  );
}
export function deleteReminder(payload: Reminder) {
  remindersList.update((list) =>
    list.filter((reminder) => reminder.createdAt !== payload.createdAt)
  );
}
