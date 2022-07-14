export interface Track {
  title: string;
  open_url: string;
  preview_url: string;
}

export interface Event {
  id: string;
  date: string;
  venue: string;
  featured: boolean;
  spotify_tracks: Track[];
  apple_music_tracks: Track[];
}

export interface EventsResponse {
  data: Event[];
  links: {
    next: string;
    self: string;
  };
}
