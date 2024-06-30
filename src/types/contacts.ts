export interface LastMessage {
  message: string;
  message_head: string;
}

export interface Contact {
  id: number;
  create_at: number;
  name: string;
  img: string;
  position: string;
  city: string;
  _orbits_last_message: LastMessage;
}

export interface DayData {
  array: Contact[];
  contact_date: string;
}

export type WeekData = DayData[];
