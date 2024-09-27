import { ResponseDataType, getRequest } from 'api';
import { useEffect, useState } from 'react';
import { SchoolDataType, SchoolListDataType, columns } from './const';
import { toast } from 'react-toastify';
import { Table } from 'antd';

export const SchoolList = () => {
  const [schoolList, setSchoolList] = useState<SchoolDataType[]>([]);
  useEffect(() => {
    const getCustomerList = async () => {
      const response: ResponseDataType<SchoolListDataType> = await getRequest(
        '/cms/school?page=1&perPage=20'
      );

      if (response.code === 200) {
        setSchoolList(response.info?.list || []);
      } else {
        toast.error(response.msg);
      }
    };

    getCustomerList();
  }, []);

  return (
    <div>
      <Table columns={columns} dataSource={schoolList} rowKey='schoolId' />
    </div>
  );
};
