import { Grid } from '@mui/material';
import { Card, Form, Modal } from 'antd';

import styles from '../school.module.css';
import { useEffect, useState } from 'react';
import { ResponseDataType, getRequest, postRequest } from 'api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import {
  SchoolSubmitFormDataType,
  SchoolForm,
} from '../Components';

export const CreateSchool = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();


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
          await postRequest('/test/create', {
            name: value.name,
            created_time: value.created_time
          });

        if (response.code === 200) {
          navigate(`/school-list/school-info/${response.info?.schoolId}`);
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
          title='Thêm thí nghiệm'
          className={styles.list_card}
          style={{ width: 500 }}
        >
          <SchoolForm
            submitBtnLabel='Thêm thí nghiệm'
            form={form}
            handleSubmitForm={handleCreateSchool}
          />
        </Card>
      </Grid>
    </Grid>
  );
};
