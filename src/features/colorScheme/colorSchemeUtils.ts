const LS_COLOR_SCHEME_KEY = 'newsfeed:scheme';

export function applyScheme(scheme: 'dark' | 'light', persist = false): void {
  document.documentElement.setAttribute('scheme', scheme);
  persist && localStorage.setItem(LS_COLOR_SCHEME_KEY, scheme);
}

export function getSystemScheme(): 'dark' | 'light' {
  return window.matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light';
}

export function getSavedScheme(): 'dark' | 'light' | null {
  return localStorage.getItem(LS_COLOR_SCHEME_KEY) as 'dark' | 'light' | null;
}

export function removeSavedScheme(): void {
  localStorage.removeItem(LS_COLOR_SCHEME_KEY);
}
