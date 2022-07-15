export interface Track {
  title: string;
  open_url: string;
  preview_url: string;
}

export interface EventImage {
  brand?: string;
  aquare: string;
  portrait: string;
  landscape: string;
}

export interface City {
  id: string;
  name: string;
}

export interface LineupItem {
  time: string;
  details: string;
}

export interface TicketPrice {
  fees: number;
  total: number;
  face_value: number;
}

export interface Ticket {
  id: number;
  name: string;
  sold_put: boolean;
  price: TicketPrice;
}

export interface Event {
  id: string;
  name: string;
  date: string;
  venue: string;
  cities: City[];
  currency: string;
  date_end: string;
  featured: boolean;
  description: string;
  lineup: LineupItem[];
  ticket_types: Ticket[];
  sale_start_date: string;
  spotify_tracks: Track[];
  event_images: EventImage;
  apple_music_tracks: Track[];
}

export interface Links {
  next: string;
  self: string;
}

export interface EventsResponse {
  links: Links;
  data: Event[];
}
