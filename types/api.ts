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

export interface Event {
  id: string;
  name: string;
  date: string;
  venue: string;
  cities: City[];
  featured: boolean;
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
