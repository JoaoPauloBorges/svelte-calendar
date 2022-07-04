import type { Colors } from "./colors.enum";

export class Event {
  constructor(partial: Event) {
    Object.assign(this, partial);
  }
  when!: Date;
  createdAt!: number;
  description!: string;
  color!: Colors;
  holiday?: boolean = false
  allDay?: boolean = false
}
