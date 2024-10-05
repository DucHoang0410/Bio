import { ResponseDataType, getRequest } from 'api';
import { useEffect, useState } from 'react';
import { SchoolDataType, SchoolListDataType, columns } from './const';
import { toast } from 'react-toastify';
import { Table } from 'antd';
import { useParams } from 'react-router-dom';

export const PhotoList = () => {
  const [schoolList, setSchoolList] = useState<SchoolDataType[]>([]);
  const { momentId } = useParams<{ momentId: string }>(); // Corrected 'monentId' to 'momentId'
  
  console.log(momentId); // This should log the correct momentId

  useEffect(() => {
    const getCustomerList = async () => {
      if (momentId) { // Ensure momentId is defined before making the request
        const response: ResponseDataType<SchoolListDataType> = await getRequest(`/photo/${momentId}`);
        console.log(response);

        if (response.code === 200) {
          console.log(response.info);
          setSchoolList(Array.isArray(response.info) ? response.info : []); 
        } else {
          toast.error(response.msg);
        }
      } else {
        toast.error("Moment ID is undefined.");
      }
    };

    getCustomerList();
  }, [momentId]); // Include momentId in the dependency array

  return (
    <div>
      <Table columns={columns} dataSource={schoolList} rowKey='_id' />
    </div>
  );
};
