import {
  WorkOutline,
  DomainOutlined,
  UploadOutlined,
} from '@mui/icons-material';
import { Button, Form, FormInstance, DatePicker, Input, Upload } from 'antd';
import React, { useState } from 'react';
import { UploadFile } from 'antd/lib/upload/interface'; // Import the type for UploadFile
import { PaperClipOutlined } from '@ant-design/icons'; // PaperClip for file name icon
import './SchoolForm.css'; // Custom CSS

export interface SchoolSubmitFormDataType {
  name: string;
  created_time: string;
  photo?: File;
}

interface SchoolFormPropsType {
  submitBtnLabel: string;
  form: FormInstance<any>;
  handleSubmitForm: (value: SchoolSubmitFormDataType) => void;
}

export const SchoolForm = (props: SchoolFormPropsType) => {
  const { submitBtnLabel, form, handleSubmitForm } = props;
  
  // Initialize fileList with the correct type
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  // Handle file change
  const handleFileChange = ({ fileList }: { fileList: UploadFile[] }) => setFileList(fileList);

  return (
    <Form
      form={form}
      onFinish={handleSubmitForm}
      labelCol={{ span: 18 }} // Adjust label width
      wrapperCol={{ span: 24 }} // Adjust input field width
    >
      {/* Tên lần đo */}
      <div className="custom-form-item">
        <label className="custom-label">
          <DomainOutlined />
          Tên lần đo :
        </label>
        <Form.Item
          name="name"
          rules={[{ required: true, message: 'Cần nhập tên lần đo!' }]}
          style={{ width: '70%' }}
        >
          <Input placeholder="Nhập tên lần đo" />
        </Form.Item>
      </div>

      {/* Thời gian TN */}
      <div className="custom-form-item">
        <label className="custom-label">
          <WorkOutline />
          Thời điểm đo :
        </label>
        <Form.Item
          name="created_time"
          rules={[{ required: true, message: 'Cần chọn thời gian đo!' }]}
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

      {/* Ảnh thang đo */}
      <div className="custom-form-item">
        <label className="custom-label">
          <UploadOutlined />
          Ảnh thang đo :
        </label>
        <Form.Item
          name="photo"
          valuePropName="fileList"
          getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}
          rules={[{ required: true, message: 'Cần chọn ảnh thang đo!' }]}
        >
          <Upload
            beforeUpload={() => false} // Prevent automatic upload
            onChange={handleFileChange}
            accept=".jpg,.png"
          >
            <div className="custom-file-upload">
              <span className="upload-button">Chọn file</span>
            </div>
          </Upload>
          {/* Show uploaded file name if there is one */}
          {fileList.length > 0 && (
            <div className="uploaded-file-name">
              <PaperClipOutlined /> {fileList[0]?.name || 'ảnh thang đo .jpg'}
            </div>
          )}
        </Form.Item>
      </div>

      {/* Submit button */}
      <Button type="primary" htmlType="submit" block>
        {submitBtnLabel}
      </Button>
    </Form>
  );
};
