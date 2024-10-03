import {
  WorkOutline,
  DomainOutlined,
} from '@mui/icons-material';
import { Button, Form, FormInstance, DatePicker, Input } from 'antd';
import React from 'react';
import './SchoolForm.css'; // Custom CSS

export interface SchoolSubmitFormDataType {
  name: string;
  created_time: string;
}

interface SchoolFormPropsType {
  submitBtnLabel: string;
  form: FormInstance<any>;
  handleSubmitForm: (value: SchoolSubmitFormDataType) => void;
}

export const SchoolForm = (props: SchoolFormPropsType) => {
  const { submitBtnLabel, form, handleSubmitForm } = props;

  return (
    <Form
      form={form}
      onFinish={handleSubmitForm}
      labelCol={{ span: 18}}  // Adjust label width
      wrapperCol={{ span: 24 }} // Adjust input field width
    >
      {/* Row for "Tên thí nghiệm" */}
      <div className="custom-form-item">
        <label className="custom-label">
          <DomainOutlined />
          Tên thí nghiệm :
        </label>
        <Form.Item
          name="name"
          rules={[{ required: true, message: 'Cần nhập tên thí nghiệm!' }]}
          style={{ width: '70%' }}
        >
          <Input placeholder="Nhập tên thí nghiệm" />
        </Form.Item>
      </div>

      {/* Row for "Thời gian TN" */}
      <div className="custom-form-item">
        <label className="custom-label">
          <WorkOutline />
          Thời gian TN :
        </label>
        <Form.Item
          name="created_time"
          rules={[
            {
              required: true,
              message: 'Cần chọn thời gian thí nghiệm!',
            },
          ]}
          style={{ width: '70%' }}
        >
          <DatePicker
            showTime
            format="YYYY-MM-DD HH:mm"
            placeholder="Chọn thời gian"
            className="custom-datepicker"
          />
        </Form.Item>
      </div>

      <Button type="primary" htmlType="submit">
        {submitBtnLabel}
      </Button>
    </Form>
  );
};
