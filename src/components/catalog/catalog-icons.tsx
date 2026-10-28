import type { ReactNode } from 'react';
export type CatalogIconName = 'search' | 'filter' | 'arrow' | 'external' | 'calendar' | 'wallet' | 'users' | 'file' | 'pin' | 'folder' | 'bookmark' | 'share' | 'check' | 'clock' | 'close' | 'chevron' | 'logout' | 'back' | 'globe' | 'menu' | 'info';
const paths: Record<CatalogIconName, ReactNode> = {
  search: <><circle cx="11" cy="11" r="7"/><path d="m16 16 5 5"/></>,
  filter: <><path d="M3 4h18l-7 8v7l-4 2v-9z"/></>,
  arrow: <><path d="m9 5 7 7-7 7"/></>,
  external: <><path d="M13 4h7v7M20 4l-9 9"/><path d="M20 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h6"/></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 2v6M17 2v6M3 10h18"/></>,
  wallet: <><rect x="3" y="6" width="18" height="15" rx="2"/><path d="M3 10h18M7 14h3"/></>,
  users: <><circle cx="9" cy="8" r="3"/><path d="M2 21v-2a7 7 0 0 1 14 0v2M17 11a3 3 0 0 0 0-6M19 21v-2a5 5 0 0 0-2-4"/></>,
  file: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6M8 13h8M8 17h8"/></>,
  pin: <><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
  folder: <><path d="M3 7a2 2 0 0 1 2-2h5l2 3h7a2 2 0 0 1 2 2v9H3Z"/></>,
  bookmark: <><path d="M6 3h12v18l-6-4-6 4z"/></>,
  share: <><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m9 10.5 6-4M9 13.5l6 4"/></>,
  check: <><path d="m5 12 4 4L19 6"/></>,
  clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l4 2"/></>,
  close: <><path d="M5 5l14 14M19 5 5 19"/></>,
  chevron: <><path d="m6 9 6 6 6-6"/></>,
  logout: <><path d="M10 4H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h5M14 16l4-4-4-4M9 12h9"/></>,
  back: <><path d="m15 18-6-6 6-6M9 12h12"/></>,
  globe: <><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c6 7 6 11 0 18M12 3c-6 7-6 11 0 18"/></>,
  menu: <><path d="M4 6h16M4 12h16M4 18h16"/></>,
  info: <><circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7h.01"/></>,
};
export function CatalogIcon({ name, size = 20, className = '' }: { name: CatalogIconName; size?: number; className?: string }) {
  return <svg className={className} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}
