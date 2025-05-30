// lib/menu.ts
export const adminMenu = [
  {
    title: 'Dashboard',
    href: '/admin/dashboard',
  },
  {
    title: 'Quản lý nội dung',
    children: [
      {
        title: 'Quản lý Posts',
        href: '/admin/blogs',
      },
      {
        title: 'Quản lý Tours',
        href: '/admin/tours',
      },
      {
        title: 'Quản lý Trang',
        href: '/admin/pages',
      },
      {
        title: 'Quản lý Menu',
        href: '/admin/menu',
      },
      {
        title: 'Quản lý chủ đề',
        href: '/admin/category',
      },
    ],
  },
  {
    title: 'Cài đặt',
    href: '/admin/settings',
  },
];
