import { Grid } from '@mui/material';
import { Card, Form, Modal } from 'antd';
import styles from '../../school.module.css';
import {
  SchoolSubmitFormDataType,
  SchoolForm,
} from '../../Components';
import { useEffect, useState } from 'react';
import { ResponseDataType, getRequest, patchRequest } from 'api';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

interface SchoolResDataType {
  schoolId: number;
  name: string;
  created_time: string;

}

export const SchoolGeneralInfo = () => {
  const { schoolId } = useParams();
  const [form] = Form.useForm();

  useEffect(() => {
    const getSchoolInfo = async () => {
      const schoolRes: ResponseDataType<SchoolResDataType> = await getRequest(
        `/cms/school/${schoolId}`
      );

      if (schoolRes.code !== 200) {
        toast.error(schoolRes.msg);
        return;
      }

      form.setFieldsValue({
        name: schoolRes.info?.name,
        created_time: schoolRes.info?.created_time, 
      });
  
    };

    getSchoolInfo();
  }, [form, schoolId]);

  const handleCreateSchool = (value: SchoolSubmitFormDataType) => {
    Modal.confirm({
      style: { fontFamily: 'Quicksand' },
      title: 'Xác nhận cập nhật thông tin trường?',
      async onOk() {
        const response: ResponseDataType<{}> = await patchRequest(
          '/cms/school',
          {
            schoolId: parseInt(schoolId as string),
            name: value.name,
            created_time: value.created_time
          }
        );

        if (response.code !== 200) {
          toast.error(response.msg);
        } else toast.success('Cập nhật thông tin trường thành công');
      },
    });
  };

  return (
    <Grid container spacing={5} marginTop={-2}>
      <Grid item>
        <Card
          title='Chi tiết trường'
          className={styles.list_card}
          style={{ width: 500 }}
        >
          <SchoolForm
            submitBtnLabel='Cập nhật'
            form={form}
            handleSubmitForm={handleCreateSchool}
          />
        </Card>
      </Grid>
    </Grid>
  );
};
