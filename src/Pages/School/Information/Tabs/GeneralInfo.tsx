import { ResponseDataType, getRequest } from 'api';
import { useEffect, useState } from 'react';
import { SchoolDataType, SchoolListDataType, columns } from './const';
import { toast } from 'react-toastify';
import { Table } from 'antd';
import { useParams } from "react-router-dom"; // Sử dụng useParams để lấy testId từ URL

export const SchoolGeneralInfo = () => {
  const { testId } = useParams<{ testId: string }>(); // Lấy testId từ URL
  const [schoolList, setSchoolList] = useState<SchoolDataType[]>([]);
console.log(testId);
  useEffect(() => {
    const getCustomerList = async () => {
      try {
        // Gọi API với testId từ URL
        const response: ResponseDataType<SchoolListDataType> = await getRequest(`/test-moment/${testId}`);
        console.log(response);

        if (response.code === 200) {
          console.log(response.info);
          setSchoolList(Array.isArray(response.info) ? response.info : []); 
        } else {
          toast.error(response.msg);
        }
      } catch (error) {
        toast.error("Failed to fetch data");
      }
    };

    if (testId) {
      getCustomerList(); // Gọi API nếu testId có giá trị
    }
  }, [testId]);

  return (
    <div>
      <Table columns={columns} dataSource={schoolList} rowKey='_id' />
    </div>
  );
};
