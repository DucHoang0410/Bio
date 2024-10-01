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
    key: 'add-test',
    path: '/add-test',
    navKey: 'as',
    element: <CreateSchool />,
  },
  {
    key: 'test-list',
    path: '/test-list',
    navKey: 'sl',
    element: <SchoolList />,
  },
  {
    key: 'school-info',
    path: '/test-list/test-info/:testId',
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
  '/add-test': {
    title: 'Thêm thí nghiệm',
  },
  '/test-list': {
    title: 'Danh sách thí nghiệm',
  },
  '/test-list/test-info': {
    title: 'Chi tiết thí nghiệm',
    tabList: ['Danh sách lần đo', 'Thông tin thí nghiệm'],
  },
};
