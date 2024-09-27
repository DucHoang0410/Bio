import {
  DomainOutlined,
  PermIdentityOutlined,
  StayPrimaryPortraitOutlined,
} from '@mui/icons-material';
import { popupStyles } from 'Components';
import { Button, Form, Input } from 'antd';

interface FormDataType {
  admEmail: string;
  admPassword: string;
  admPhone: string;
}

interface CreateSchoolAdminPropsType {
  schoolId: string;
  close: () => void;
  getAdminList: () => void;
}

export const CreateSchoolAdminPopup = (props: CreateSchoolAdminPropsType) => {
  const { schoolId, close, getAdminList } = props;
  const [form] = Form.useForm();

  const handleCreateSchoolAdmin = (value: FormDataType) => {
    console.log(value, schoolId);
    // Call API to create school admin

    getAdminList(); // để reload lại danh sách admin
  };

  return (
    <>
      <div className={popupStyles.popup_title}>Thêm admin</div>
      <Form form={form} onFinish={handleCreateSchoolAdmin}>
        <div className={popupStyles.form}>
          <Form.Item
            name='admEmail'
            rules={[
              { required: true, message: 'Cần nhập email của admin!' },
              { type: 'email', message: 'Cần nhập email đúng định dạng!' },
            ]}
            style={{ margin: 0 }}
          >
            <Input
              prefix={
                <DomainOutlined
                  className={popupStyles.form_input_prefix_icon}
                />
              }
              placeholder='Email'
              className={popupStyles.form_input}
            />
          </Form.Item>
          <div className={popupStyles.line} />
          <Form.Item
            name='admPhone'
            rules={[
              { required: true, message: 'Cần nhập số điện thoại của admin!' },
              {
                pattern: new RegExp(/^[0-9]*$/),
                message: 'Số điện thoại chỉ bao gồm số!',
              },
            ]}
            style={{ margin: 0 }}
          >
            <Input
              prefix={
                <StayPrimaryPortraitOutlined
                  className={popupStyles.form_input_prefix_icon}
                />
              }
              placeholder='Số điện thoại'
              className={popupStyles.form_input}
            />
          </Form.Item>
          <div className={popupStyles.line} />
          <Form.Item
            name='admPassword'
            rules={[
              { required: true, message: 'Cần nhập mật khẩu!' },
              {
                pattern: new RegExp(/^[a-zA-Z0-9]*$/),
                message: 'Mật khẩu không chứa kí tự đặc biệt và dấu cách!',
              },
            ]}
            style={{ margin: 0 }}
          >
            <Input.Password
              prefix={
                <PermIdentityOutlined
                  className={popupStyles.form_input_prefix_icon}
                />
              }
              placeholder='Mật khẩu'
              className={popupStyles.form_input}
            />
          </Form.Item>
          <div className={popupStyles.line} />
          <Form.Item
            name='confirmPassword'
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value) return Promise.reject('Cần xác nhận mật khẩu!');

                  if (value !== getFieldValue('admPassword')) {
                    return Promise.reject('Mật khẩu xác nhận không khớp');
                  }

                  return Promise.resolve();
                },
              }),
            ]}
            style={{ margin: 0 }}
          >
            <Input.Password
              prefix={
                <PermIdentityOutlined
                  className={popupStyles.form_input_prefix_icon}
                />
              }
              placeholder='Xác nhận mật khẩu'
              className={popupStyles.form_input}
            />
          </Form.Item>
        </div>
        <div className={popupStyles.form_button_wrapper}>
          <Button
            type='primary'
            className={`${popupStyles.form_button} ${popupStyles.form_button_primary}`}
            htmlType='submit'
          >
            Thêm
          </Button>
          <Button
            type='primary'
            className={`${popupStyles.form_button} ${popupStyles.form_button_cancel}`}
            onClick={close}
          >
            Huỷ
          </Button>
        </div>
      </Form>
    </>
  );
};
