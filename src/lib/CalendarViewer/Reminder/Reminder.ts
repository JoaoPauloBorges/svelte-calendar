import type { Colors } from "./colors.enum";

export class Reminder {
  constructor(partial: Reminder) {
    Object.assign(this, partial);
  }
  when!: number;
  createdAt!: number;
  description!: string;
  color!: Colors;
}
