import { TableProps } from 'antd';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
export interface SchoolDataType {
  _id: string;
  name: string;
  start_time: string;
  
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
    dataIndex: 'start_time',
    key: 'start_time',
    render: (start_time: string) => {
      // Sử dụng date-fns để định dạng thời gian
      return format(new Date(start_time), 'HH:mm - dd/MM/yyyy');
    },
  },
  {
    title: 'Hành động',
    dataIndex: '_id',
    key: 'action',
    width: '140px',
    render: (_id) => <Link to={`/test-list/test-info/${_id}`}>Chi tiết</Link>,
  },
];
