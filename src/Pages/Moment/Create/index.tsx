import { Grid } from '@mui/material';
import { Card, Form, Modal } from 'antd';

import styles from '../school.module.css';
import { useEffect, useState } from 'react';
import { ResponseDataType, getRequest, postRequest } from 'api';
import { toast } from 'react-toastify';
import { useNavigate,useParams } from 'react-router-dom';
import {
  SchoolSubmitFormDataType,
  SchoolForm,
} from '../Components';


export const CreateMoment = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { testId } = useParams<{ testId: string }>();

  useEffect(() => {
    const getAddressInfo = async () => {
      
    };

    getAddressInfo();
  }, []);

  const handleCreateSchool = (value: SchoolSubmitFormDataType) => {
    Modal.confirm({
      style: { fontFamily: 'Quicksand' },
      title: 'Xác nhận thêm trường?',
      async onOk() {
        const response: ResponseDataType<{ schoolId: number }> =
          await postRequest('/test-moment/create', {
            name: value.name,
            start_time: value.created_time,
            test_id: testId
          });

        if (response.code === 200) {
          navigate(`/test-list/test-info/${testId}`);
        } else {
          toast.error(response.msg);
        }
      },
    });
  };

  return (
    <Grid container spacing={5} marginTop={-2}>
      <Grid item>
        <Card
          title='Thêm lần đo'
          className={styles.list_card}
          style={{ width: 500 }}
        >
          <SchoolForm
            submitBtnLabel='Thêm lần đo'
            form={form}
            handleSubmitForm={handleCreateSchool}
          />
        </Card>
      </Grid>
    </Grid>
  );
};
