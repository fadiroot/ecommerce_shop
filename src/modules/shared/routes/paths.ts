// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
  USER: '/user',
  ANALYTICS: '/analytics',
  FORM: '/form',
  PROFILE: '/profile',
  CALENDAR: '/calendar',
  BANKING: '/banking',
};

// ----------------------------------------------------------------------

export const paths = {
  // AUTH
  auth: {
    jwt: {
      login: `${ROOTS.AUTH}/jwt/login`,
      register: `${ROOTS.AUTH}/jwt/register`,
    },
  },
  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
  },
  user: {
    user: `${ROOTS.USER}/list`,
    create: `${ROOTS.USER}/create`,
    edit: (id: string) => `${ROOTS.USER}/${id}/edit`,
  },
  analytics: {
    stats: `${ROOTS.ANALYTICS}/stats`,
  },
  form: {
    create: `${ROOTS.FORM}/create`,
    update: `${ROOTS.FORM}/update`,
  },
  profile: {
    profile: `${ROOTS.PROFILE}/edit`,
  },
  calendar: {
    calendar: `${ROOTS.CALENDAR}/view`,
  },
  banking: {
    banking: `${ROOTS.BANKING}/view`,
  },
};
