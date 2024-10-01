import { ResponseDataType, getRequest } from 'api';
import { useEffect, useState } from 'react';
import { SchoolDataType, SchoolListDataType, columns } from './const';
import { toast } from 'react-toastify';
import { Table } from 'antd';

export const SchoolList = () => {
  const [schoolList, setSchoolList] = useState<SchoolDataType[]>([]);

  useEffect(() => {
    const getCustomerList = async () => {
      const response: ResponseDataType<SchoolListDataType> = await getRequest('/test');
      console.log(response);

      if (response.code === 200) {
       console.log(response.info);
        setSchoolList(Array.isArray(response.info) ? response.info : []); 
      } else {
        toast.error(response.msg);
      }
    };

    getCustomerList();
  }, []);

  return (
    <div>
      <Table columns={columns} dataSource={schoolList} rowKey='_id' />
    </div>
  );
};
