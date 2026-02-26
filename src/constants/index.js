/**
 * Portfolio constants – frontend-only dummy data.
 */

import { DEMO_THEME } from './theme';
import { DEMO_PROFILE } from './profile';
import { DEMO_SECTIONS_ORDER, DEMO_SECTIONS_DATA } from './sections';

export const PORTFOLIO_DATA_KEYS = {
  PROFILE: 'profile',
  THEME: 'theme',
  SECTIONS: 'sections',
};

export { DEMO_THEME } from './theme';
export { DEMO_PROFILE } from './profile';
export { DEMO_SECTIONS_ORDER, DEMO_SECTIONS_DATA } from './sections';

/** Section id -> nav label for header scroll buttons */
export const NAV_SECTIONS = {
  summary: 'Summary',
  coverLetter: 'Cover Letter',
  experience: 'Experience',
  education: 'Education',
  skills: 'Skills',
  portfolio: 'Portfolio',
  projects: 'Projects',
  certifications: 'Certifications',
  blog: 'Blog',
  pricing: 'Pricing',
  interests: 'Interests',
  contact: 'Contact',
};

/** Only these sections appear in the navbar (important ones) */
export const NAV_VISIBLE_IDS = [
  'experience',
  'skills',
  'portfolio',
  'blog',
  'pricing',
];

export const DEMO_PORTFOLIO_DATA = {
  profile: DEMO_PROFILE,
  theme: DEMO_THEME,
  sections: {
    order: DEMO_SECTIONS_ORDER,
    data: DEMO_SECTIONS_DATA,
  },
};
