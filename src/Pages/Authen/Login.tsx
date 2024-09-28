import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input } from 'antd';
import { EyeOutlined, MailOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';

import styles from './authen-page.module.css';
import { ResponseDataType, postRequest } from 'api';

interface LoginDataType {
  id: string;
  email: string;
  token: string;
  role: string;
}

export const LoginPage = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [isBtnLoading, setIsBtnLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('email')) navigate('/');
  });

  const Login = async (value: { email: string; password: string }) => {
    setIsBtnLoading(true);
    const reqBody = new FormData();
    reqBody.append('email', value.email);
    reqBody.append('password', value.password);

    const response: ResponseDataType<LoginDataType> = await postRequest(
      '/user/login',
      {
        email: value.email,
        password: value.password,
      },
      'json'
    );

    console.log(response);

    if (response.code !== 200) {
      console.log('error', response);
      toast.error(response?.msg);
    } else if (response.info) {
      localStorage.setItem('email', response.info.email);
      localStorage.setItem('uid', response.info.id);
      localStorage.setItem('accessToken', response.info.token);
      localStorage.setItem('role', response.info.role);
      window.location.href = '/';
    }

    setIsBtnLoading(false);
  };

  return (
    <div className={styles.login_page}>
      <div className={styles.login_page_background} />
      <div className={styles.authen_wrapper}>
        <img className={styles.logo} src='/Images/logo.png' alt='' />
        <div className={styles.name}>Biotech Lab</div>
        <Form form={form} onFinish={(value) => Login(value)}>
          <div className={`${styles.form} authen-form`}>
            <Form.Item
              name='email'
              rules={[
                { required: true, message: 'Cần nhập email!' },
                { type: 'email', message: 'Cần nhập email đúng định dạng!' },
              ]}
              style={{ margin: 0 }}
            >
              <Input
                prefix={<MailOutlined className={styles.icon} />}
                placeholder='Email'
                className={styles.form_input}
              />
            </Form.Item>
            <div className={styles.line} />
            <Form.Item
              name='password'
              rules={[{ required: true, message: 'Cần nhập mật khẩu!' }]}
              style={{ margin: 0 }}
            >
              <Input.Password
                prefix={<EyeOutlined className={styles.icon} />}
                placeholder='Mật khẩu'
                className={styles.form_input}
              />
            </Form.Item>
          </div>
          <Button
            loading={isBtnLoading}
            type='primary'
            className={styles.authen_button}
            htmlType='submit'
          >
            Đăng nhập
          </Button>
        </Form>
      </div>
    </div>
  );
};
