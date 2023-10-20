export const IS_PLATFORM = process.env.NEXT_PUBLIC_IS_PLATFORM === 'true';

export const API_URL = IS_PLATFORM ? process.env.NEXT_PUBLIC_API_URL : '/api';

export const LOCAL_STORAGE_KEYS = {
  RECENTLY_VISITED_ORGANIZATION: 'supabase-organization',
  TELEMETRY_CONSENT: 'supabase-consent',
  UI_PREVIEW_NAVIGATION_LAYOUT: 'supabase-ui-preview-nav-layout',
  UI_PREVIEW_API_SIDE_PANEL: 'supabase-ui-api-side-panel',
};
