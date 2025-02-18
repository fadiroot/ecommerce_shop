import { useMemo } from 'react';
// routes
import { paths } from 'src/modules/shared/routes/paths';
// components
import SvgColor from 'src/modules/shared/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
  // OR
  // <Iconify icon="fluent:mail-24-filled" />
  // https://icon-sets.iconify.design/solar/
  // https://www.streamlinehq.com/icons
);

const ICONS = {
  job: icon('ic_job'),
  blog: icon('ic_blog'),
  chat: icon('ic_chat'),
  mail: icon('ic_mail'),
  user: icon('ic_user'),
  file: icon('ic_file'),
  lock: icon('ic_lock'),
  tour: icon('ic_tour'),
  order: icon('ic_order'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  kanban: icon('ic_kanban'),
  folder: icon('ic_folder'),
  banking: icon('ic_banking'),
  booking: icon('ic_booking'),
  invoice: icon('ic_invoice'),
  product: icon('ic_product'),
  calendar: icon('ic_calendar'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
};

// ----------------------------------------------------------------------

export function useNavData() {
  const data = useMemo(
    () => [
      // OVERVIEW
      // ----------------------------------------------------------------------
      {
        subheader: 'Dashboard',
        items: [
          { title: 'dashboard', path: paths.dashboard.root, icon: ICONS.dashboard },
          { title: 'banking', path: paths.banking.banking, icon: ICONS.banking },
          {
            title: 'Analytics',
            path: paths.analytics.stats,
            icon: ICONS.analytics,
          },
        ],
      },

      // MANAGEMENT
      // ----------------------------------------------------------------------
      {
        subheader: 'Users',
        items: [
          { title: 'user', path: paths.user.user, icon: ICONS.user },

          // {
          //   title: 'user',
          //   path: paths.dashboard.group.root,
          //   icon: ICONS.user,
          //   children: [{ title: 'user List', path: paths.dashboard.group.root }],
          // },
        ],
      },
      {
        subheader: 'Forms',
        items: [
          { title: 'Create', path: paths.form.create, icon: ICONS.blog },
          { title: 'Update', path: paths.form.update, icon: ICONS.blog },
          // {
          //   title: 'user',
          //   path: paths.dashboard.group.root,
          //   icon: ICONS.user,
          //   children: [{ title: 'user List', path: paths.dashboard.group.root }],
          // },
        ],
      },
      {
        subheader: 'managment',
        items: [{ title: 'calendar', path: paths.calendar.calendar, icon: ICONS.calendar }],
      },
    ],
    []
  );

  return data;
}
