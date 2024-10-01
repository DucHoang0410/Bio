import { ResponseDataType, getRequest } from 'api';
import { useEffect, useState } from 'react';
import { SchoolDataType, SchoolListDataType, columns } from './const';
import { toast } from 'react-toastify';
import { Table, Button } from 'antd';
import { useParams, useNavigate } from 'react-router-dom'; // Sử dụng useParams để lấy testId từ URL và useNavigate để điều hướng

export const SchoolGeneralInfo = () => {
  const { testId } = useParams<{ testId: string }>(); // Lấy testId từ URL
  const [schoolList, setSchoolList] = useState<SchoolDataType[]>([]);
  const navigate = useNavigate(); // Sử dụng điều hướng để chuyển trang khi bấm nút
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

  // Hàm xử lý khi bấm nút "Thêm Lần Đo"
  const handleAddMoment = () => {
    // Chuyển hướng đến trang thêm mới (hoặc mở modal tùy theo logic của bạn)
    navigate(`/test-moment/add/${testId}`);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h2>Danh sách lần đo</h2>
        <Button type="primary" onClick={handleAddMoment}>Thêm Lần Đo</Button>
      </div>
      
      <Table columns={columns} dataSource={schoolList} rowKey='_id' />
    </div>
  );
};
