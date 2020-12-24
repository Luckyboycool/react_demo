import React, { useState, useEffect } from 'react';
import { Input, Form, Modal, Popover, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { history } from 'umi';
import IconAccount from '@/assets/images/user_avatar.jpg';
import { StyleUser, StyleAccountPopover } from '@/assets/styles/component';
import { FORM_ITEM_LAYOUT } from '@/utils/constant';
import DICT from '@/utils/dictionary';
import { updatePassword } from '../service';
import { delay } from '@/utils/web';

export interface Password {
  id?: string;
  newPassword: string;
  oldPassword: string;
  confirmPassword: string;
}

const Account = () => {
  const dispatch = useDispatch();
  const global = useSelector((state: any) => state.global);
  const { user }: { user: any } = global;
  const [form] = Form.useForm();
  const [visible, setVisible] = useState<boolean>(false);

  const INIT_PASSWORD = { userName: user ? user.userName : '', oldPassword: '', newPassword: '', confirmPassword: '' };

  const onChangePassword = () => {
    form.setFieldsValue(INIT_PASSWORD);
    setVisible(true);
  };

  const onFinish = async ({ oldPassword, newPassword, confirmPassword }: Password) => {
    if (oldPassword.length < 6 || newPassword.length < 6 || confirmPassword.length < 6) {
      message.warning('密码不能少于6位');
      return;
    }
    await updatePassword({ id: user.id, oldPassword, newPassword, confirmPassword });
    message.success('密码修改成功,请重新登录');
    setVisible(false);
    await delay(1000);
    dispatch({ type: 'global/onLogout' });
  };

  return user ? (
    <StyleUser>
      <Popover
        className="header-account"
        placement="bottomRight"
        content={
          <StyleAccountPopover>
            <div className="head">
              <img src={IconAccount} alt="" />
              {user.nickName || ''}
            </div>
            <ul className="body">
              <li onClick={() => history.push('/system')}>{DICT.account.system}</li>
              <li onClick={onChangePassword}>{DICT.account.password}</li>
            </ul>
            <ul className="foot">
              <li onClick={() => dispatch({ type: 'global/onLogout' })}>{DICT.account.logout}</li>
            </ul>
          </StyleAccountPopover>
        }
        trigger="click"
      >
        <img src={IconAccount} alt="" />
      </Popover>

      <Modal
        getContainer={false}
        title="Change Password"
        width={550}
        visible={visible}
        onOk={form.submit}
        onCancel={() => setVisible(false)}
      >
        <Form
          form={form}
          size="small"
          initialValues={INIT_PASSWORD}
          onFinish={onFinish}
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 15 }}
        >
          <Form.Item label="Username" name="userName">
            <Input disabled />
          </Form.Item>
          <Form.Item
            label="Old Password"
            name="oldPassword"
            rules={[{ required: true, message: 'Old password is required.' }]}
          >
            <Input type="password" autoFocus />
          </Form.Item>
          <Form.Item
            label="New Password"
            name="newPassword"
            rules={[{ required: true, message: 'New password is required.' }]}
          >
            <Input type="password" />
          </Form.Item>
          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            rules={[{ required: true, message: 'Confirm password is required.' }]}
          >
            <Input type="password" />
          </Form.Item>
        </Form>
      </Modal>
    </StyleUser>
  ) : null;
};

export default Account;
