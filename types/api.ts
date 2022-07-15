export interface Track {
  title: string;
  open_url: string;
  preview_url: string;
}

export interface Event {
  id: string;
  name: string;
  date: string;
  venue: string;
  featured: boolean;
  spotify_tracks: Track[];
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
