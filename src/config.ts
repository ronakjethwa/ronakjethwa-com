// Site-wide settings worth keeping in one place.

// How many journal entries per page in the paginated listing.
export const JOURNAL_PAGE_SIZE = 6;

// Master switch for the Spotify now-playing widget. When false, the widget
// isn't rendered and nothing polls the API.
export const SPOTIFY_WIDGET_ENABLED = false;

// How often the Spotify now-playing widget polls the API, in milliseconds.
export const SPOTIFY_POLL_MS = 60_000;
