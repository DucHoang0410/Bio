import { TableProps } from 'antd';
import { Link } from 'react-router-dom';

export interface SchoolDataType {
  _id: string;
  name: string;
  created_time: string;
  
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
    title: 'Tên thí nghiệm',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Ngày tạo',
    dataIndex: 'created_time',
    key: 'created_time',
  },
  {
    title: 'Hành động',
    dataIndex: '_id',
    key: 'action',
    width: '140px',
    render: (testId) => <Link to={`/test-list/test-info/${testId}`}>Chi tiết</Link>,
  },
];
