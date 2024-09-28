import {
  CreateSchool,
  Home,
  SchoolInfo,
  SchoolList,
} from 'Pages';

export const ADMIN_ROUTER = [
  {
    key: 'home',
    path: '/',
    element: <Home />,
  },
  {
    key: 'add-school',
    path: '/add-school',
    navKey: 'as',
    element: <CreateSchool />,
  },
  {
    key: 'school-list',
    path: '/school-list',
    navKey: 'sl',
    element: <SchoolList />,
  },
  {
    key: 'school-info',
    path: '/school-list/school-info/:schoolId',
    navKey: 'sl',
    element: <SchoolInfo />,
  },
];

export const PATH_INFO = {
  '/': { title: 'Trang chủ' },
  '/account-list': {
    title: 'Danh sách tài khoản',
  },
  '/account-list/account-info': {
    title: 'Chi tiết tài khoản',
    // tabList: ['Thông tin chung', 'Danh sách tổ chức'],
  },
  '/add-school': {
    title: 'Thêm trường',
  },
  '/school-list': {
    title: 'Danh sách trường',
  },
  '/school-list/school-info': {
    title: 'Chi tiết trường',
    tabList: ['Thông tin chung', 'Danh sách admin'],
  },
};
