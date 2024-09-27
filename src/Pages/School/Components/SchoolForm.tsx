import {
  SchoolOutlined,
  WorkOutline,
  DomainOutlined,
} from '@mui/icons-material';
import { Button, Form, FormInstance } from 'antd';
import { getRequest, ResponseDataType } from 'api';
import { FormItemRow } from 'Components';
import { Dispatch, SetStateAction } from 'react';
import { toast } from 'react-toastify';

const schoolTypeOptions = [
  { value: 1, label: 'Cấp 1' },
  { value: 2, label: 'Cấp 2' },
  { value: 3, label: 'Cấp 3' },
];

export interface ListOptionType {
  value: number;
  label: string;
}

export interface AddressResDataType {
  id: number;
  name: string;
}

export interface SchoolSubmitFormDataType {
  name: string;
  mst: string;
  address: string;
  schoolType: number;
  province: number;
  district: number;
  ward: number;
}

interface SchoolFormPropsType {
  submitBtnLabel: string;
  form: FormInstance<any>;
  handleSubmitForm: (value: SchoolSubmitFormDataType) => void;
  provinceList: ListOptionType[];
  districtList: ListOptionType[];
  wardList: ListOptionType[];
  setDistrictList: Dispatch<SetStateAction<ListOptionType[]>>;
  setWardList: Dispatch<SetStateAction<ListOptionType[]>>;
}

export const SchoolForm = (props: SchoolFormPropsType) => {
  const {
    submitBtnLabel,
    form,
    handleSubmitForm,
    provinceList,
    districtList,
    wardList,
    setDistrictList,
    setWardList,
  } = props;
  return (
    <Form form={form} onFinish={handleSubmitForm}>
      <FormItemRow
        icon={<DomainOutlined />}
        label='Tên trường'
        formItemName='name'
        formItemRules={[{ required: true, message: 'Cần nhập tên trường!' }]}
      />
      <FormItemRow
        icon={<WorkOutline />}
        label='Mã số thuế'
        formItemName='mst'
        formItemRules={[
          () => ({
            async validator(_, value) {
              if (!value) return Promise.reject('Cần nhập mã số thuế!');

              if (value.length !== 10 || !/^\d+$/.test(value))
                return Promise.reject('Mã số thuế phải gồm 10 chữ số!');

              return Promise.resolve();
            },
          }),
        ]}
      />
      <FormItemRow
        icon={<DomainOutlined />}
        label='Địa chỉ'
        formItemName='address'
        formItemRules={[{ required: true, message: 'Cần nhập địa chỉ!' }]}
      />
      <FormItemRow
        icon={<SchoolOutlined />}
        label='Loại trường'
        selectProps={{
          options: schoolTypeOptions,
        }}
        formItemName='schoolType'
        formItemRules={[{ required: true, message: 'Cần chọn loại trường!' }]}
      />
      <FormItemRow
        icon={<SchoolOutlined />}
        label='Tỉnh thành'
        selectProps={{
          options: provinceList,
          showSearch: true,
          optionFilterProp: 'label',
          onChange: async (value) => {
            form.setFieldValue('district', null);
            form.setFieldValue('ward', null);
            const districtRes: ResponseDataType<AddressResDataType[]> =
              await getRequest(`/district?provinceId=${value}`);
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
          },
        }}
        formItemName='province'
        formItemRules={[{ required: true, message: 'Cần chọn Tỉnh thành!' }]}
      />
      <FormItemRow
        icon={<SchoolOutlined />}
        label='Quận huyện'
        selectProps={{
          options: districtList,
          showSearch: true,
          optionFilterProp: 'label',
          onChange: async (value) => {
            form.setFieldValue('ward', null);
            const wardRes: ResponseDataType<AddressResDataType[]> =
              await getRequest(`/ward?districtId=${value}`);
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
          },
        }}
        formItemName='district'
        formItemRules={[{ required: true, message: 'Cần chọn Quận huyện!' }]}
      />
      <FormItemRow
        icon={<SchoolOutlined />}
        label='Xã phường'
        selectProps={{
          options: wardList,
          showSearch: true,
          optionFilterProp: 'label',
        }}
        formItemName='ward'
        formItemRules={[{ required: true, message: 'Cần chọn Xã phường!' }]}
      />
      <Button type='primary' htmlType='submit'>
        {submitBtnLabel}
      </Button>
    </Form>
  );
};
