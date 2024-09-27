import { TableProps } from 'antd';
import { Link } from 'react-router-dom';

export interface SchoolDataType {
  schoolId: number;
  name: string;
  schoolType: number;
  tinhthanh: string;
  quanhuyen: string;
  xaphuong: string;
  msthue: string;
}

export interface SchoolListDataType {
  list: SchoolDataType[];
  total: number;
}

export const columns: TableProps<SchoolDataType>['columns'] = [
  {
    title: 'STT',
    dataIndex: 'stt',
    key: 'stt',
    width: '50px',
    render: (item, record, index) => index + 1,
  },
  {
    title: 'Trường',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Loại',
    dataIndex: 'schoolType',
    key: 'schoolType',
    width: '100px',
    render: (type) => 'Cấp ' + type,
  },
  {
    title: 'Tỉnh thành',
    dataIndex: 'tinhthanh',
    key: 'tinhthanh',
    width: '150px',
  },
  {
    title: 'Quận huyện',
    dataIndex: 'quanhuyen',
    key: 'quanhuyen',
    width: '180px',
  },
  {
    title: 'Xã phường',
    dataIndex: 'xaphuong',
    key: 'xaphuong',
    width: '180px',
  },
  {
    title: 'MST',
    dataIndex: 'msthue',
    key: 'msthue',
    width: '120px',
  },
  {
    title: 'Hành động',
    dataIndex: 'schoolId',
    key: 'action',
    width: '140px',
    render: (id) => <Link to={`/school-list/school-info/${id}`}>Chi tiết</Link>,
  },
];
