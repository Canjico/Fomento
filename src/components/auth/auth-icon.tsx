import type { SVGProps, ReactNode } from 'react';
type IconName = 'mail' | 'lock' | 'user' | 'eye' | 'eye-off' | 'arrow-right' | 'arrow-left' | 'building' | 'chevron-down' | 'book';
export function AuthIcon({ name, size = 19, ...props }: SVGProps<SVGSVGElement> & { name: IconName; size?: number }) {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true as const, ...props };
  const paths: Record<IconName, ReactNode> = {
    mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></>,
    lock: <><rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 1 1 8 0v3"/><path d="M12 14v3"/></>,
    user: <><circle cx="12" cy="8" r="4"/><path d="M4 21v-2a8 8 0 0 1 16 0v2"/></>,
    eye: <><path d="M2 12s3.8-7 10-7 10 7 10 7-3.8 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></>,
    'eye-off': <><path d="m3 3 18 18M10.5 5.1A11 11 0 0 1 12 5c6.2 0 10 7 10 7a17 17 0 0 1-3.2 4.1M6.3 6.7C3.4 8.6 2 12 2 12s3.8 7 10 7a10 10 0 0 0 4-.9"/></>,
    'arrow-right': <><path d="M4 12h16m-7-7 7 7-7 7"/></>,
    'arrow-left': <><path d="M20 12H4m7-7-7 7 7 7"/></>,
    building: <><rect x="4" y="3" width="16" height="18" rx="1"/><path d="M8 7h2m4 0h2M8 11h2m4 0h2M8 15h2m4 0h2M10 21v-4h4v4"/></>,
    'chevron-down': <path d="m6 9 6 6 6-6"/>,
    book: <><path d="M12 6a9 9 0 0 0-9-2v14a9 9 0 0 1 9 2 9 9 0 0 1 9-2V4a9 9 0 0 0-9 2Zm0 0v14"/></>,
  };
  return <svg {...common}>{paths[name]}</svg>;
}
