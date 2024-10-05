import { TableProps } from 'antd';
import { Link } from 'react-router-dom';
import { format } from 'date-fns'; // Import hàm format từ date-fns

export interface PhotoDataType {
  _id: string;
  name: string;
  created_time: string;
}

export interface PhotoListDataType {
  list: PhotoDataType[];
  total: number;
}

export const columns: TableProps<PhotoDataType>['columns'] = [
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
    render: (created_time: string) => {
      // Sử dụng date-fns để định dạng thời gian
      return format(new Date(created_time), 'HH:mm - dd/MM/yyyy');
    },
  },
  {
    title: 'Hành động',
    dataIndex: '_id',
    key: 'action',
    width: '140px',
    render: (momentId) => <Link to={`/photo-list/${momentId}`}>Chi tiết</Link>,
  },
];
