import { Grid } from '@mui/material';
import { Card, Form, Modal } from 'antd';

import styles from '../school.module.css';
import { useEffect, useState } from 'react';
import { ResponseDataType, getRequest, postRequest } from 'api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import {
  AddressResDataType,
  SchoolSubmitFormDataType,
  ListOptionType,
  SchoolForm,
} from '../Components';

export const CreateSchool = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [provinceList, setProvinceList] = useState<ListOptionType[]>([]);
  const [districtList, setDistrictList] = useState<ListOptionType[]>([]);
  const [wardList, setWardList] = useState<ListOptionType[]>([]);

  useEffect(() => {
    const getAddressInfo = async () => {
      const provinceRes: ResponseDataType<AddressResDataType[]> =
        await getRequest('/province');
      if (provinceRes.code === 200) {
        setProvinceList(
          provinceRes.info?.map((province) => ({
            value: province.id,
            label: province.name,
          })) || []
        );
      } else {
        toast.error(provinceRes.msg);
      }
    };

    getAddressInfo();
  }, []);

  const handleCreateSchool = (value: SchoolSubmitFormDataType) => {
    Modal.confirm({
      style: { fontFamily: 'Quicksand' },
      title: 'Xác nhận thêm trường?',
      async onOk() {
        const response: ResponseDataType<{ schoolId: number }> =
          await postRequest('/cms/school', {
            name: value.name,
            msthue: value.mst,
            provinceId: value.province,
            tinhthanh: provinceList.find(
              (province) => province.value === value.province
            )?.label,
            districtId: value.district,
            quanhuyen: districtList.find(
              (district) => district.value === value.district
            )?.label,
            wardId: value.ward,
            xaphuong: wardList.find((ward) => ward.value === value.ward)?.label,
            address: value.address,
            schoolType: value.schoolType,
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
          title='Thêm trường'
          className={styles.list_card}
          style={{ width: 500 }}
        >
          <SchoolForm
            submitBtnLabel='Thêm trường'
            form={form}
            handleSubmitForm={handleCreateSchool}
            provinceList={provinceList}
            districtList={districtList}
            wardList={wardList}
            setDistrictList={setDistrictList}
            setWardList={setWardList}
          />
        </Card>
      </Grid>
    </Grid>
  );
};
