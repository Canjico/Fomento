import type { ReactNode } from 'react';

type Name = 'search' | 'arrow-right' | 'arrow-left' | 'book' | 'clock' | 'calendar' | 'trend' | 'menu' | 'x' | 'external' | 'chevron-right';

const paths: Record<Name, ReactNode> = {
  search: <><circle cx="11" cy="11" r="7"/><path d="m16 16 5 5"/></>,
  'arrow-right': <><path d="M4 12h16m-7-7 7 7-7 7"/></>,
  'arrow-left': <><path d="M20 12H4m7 7-7-7 7-7"/></>,
  book: <><path d="M12 7c-3-2-6-2-9-1v13c3-1 6-1 9 1 3-2 6-2 9-1V6c-3-1-6-1-9 1ZM12 7v13"/><path d="M6 10h3m6 0h3M6 13h3m6 0h3"/></>,
  clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v6l4 2"/></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v5m10-5v5M3 10h18"/></>,
  trend: <><path d="M3 17l6-6 4 4 8-8M16 7h5v5"/></>,
  menu: <><path d="M4 7h16M4 12h16M4 17h16"/></>,
  x: <><path d="M5 5l14 14M19 5 5 19"/></>,
  external: <><path d="M13 5h6v6m0-6-9 9"/><path d="M19 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4"/></>,
  'chevron-right': <><path d="m9 5 7 7-7 7"/></>,
};

export function BlogIcon({ name, size = 20 }: { name: Name; size?: number }) {
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}
