import { Grid } from '@mui/material';
import { Card, Form, Modal } from 'antd';
import styles from '../../school.module.css';
import {
  SchoolSubmitFormDataType,
  ListOptionType,
  SchoolForm,
  AddressResDataType,
} from '../../Components';
import { useEffect, useState } from 'react';
import { ResponseDataType, getRequest, patchRequest } from 'api';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

interface SchoolResDataType {
  schoolId: number;
  name: string;
  msthue: string;
  provinceId: number;
  districtId: number;
  wardId: number;
  tinhthanh: string;
  quanhuyen: string;
  xaphuong: string;
  address: string;
  schoolType: number;
}

export const SchoolGeneralInfo = () => {
  const { schoolId } = useParams();
  const [form] = Form.useForm();
  const [provinceList, setProvinceList] = useState<ListOptionType[]>([]);
  const [districtList, setDistrictList] = useState<ListOptionType[]>([]);
  const [wardList, setWardList] = useState<ListOptionType[]>([]);

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
        mst: schoolRes.info?.msthue,
        address: schoolRes.info?.address,
        schoolType: schoolRes.info?.schoolType,
        province: schoolRes.info?.provinceId,
        district: schoolRes.info?.districtId,
        ward: schoolRes.info?.wardId,
      });

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

      const districtRes: ResponseDataType<AddressResDataType[]> =
        await getRequest(`/district?provinceId=${schoolRes.info?.provinceId}`);
      if (districtRes.code === 200) {
        setDistrictList(
          districtRes.info?.map((province) => ({
            value: province.id,
            label: province.name,
          })) || []
        );
      } else {
        toast.error(districtRes.msg);
      }

      const wardRes: ResponseDataType<AddressResDataType[]> = await getRequest(
        `/ward?districtId=${schoolRes.info?.districtId}`
      );
      if (wardRes.code === 200) {
        setWardList(
          wardRes.info?.map((province) => ({
            value: province.id,
            label: province.name,
          })) || []
        );
      } else {
        toast.error(wardRes.msg);
      }
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
