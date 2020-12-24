import React from 'react';
import { Form, Input, Button, message } from 'antd';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { history } from 'umi';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Banner from '@/assets/images/login_banner.jpeg';
import DICT from '@/utils/dictionary';
import { getCookieDomain } from '@/utils/web';
import { login, getUser } from './service';
import { StyleLogin, StyleLoginSide, StyleLoginMain } from './style';

const Login = () => {
  const dispatch = useDispatch();
  const global = useSelector((state: any) => state.global);
  const { user } = global;

  if (user) history.replace('/');

  const onFinish = async (values: any) => {
    dispatch({ type: 'global/onLogin', payload: values });
  };

  return (
    <StyleLogin>
      <StyleLoginSide>
        <img src={Banner} alt="" />
      </StyleLoginSide>
      <StyleLoginMain>
        <h2>{DICT.global.login_title}</h2>
        <h2>{DICT.global.login_title2}</h2>
        <p>数据就是力量，善用数据就是生产力</p>
        <Form
          initialValues={{
            username: 'admin',
            password: '123456',
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
            <Input autoFocus prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </StyleLoginMain>
    </StyleLogin>
  );
};

export default Login;
