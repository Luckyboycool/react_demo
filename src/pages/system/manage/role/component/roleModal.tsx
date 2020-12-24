import React, { useState } from 'react';
import { Input, Form, Modal, Tree, message, Select } from 'antd';
import { useDispatch } from 'react-redux';
import { useMount } from '@umijs/hooks';
import { FORM_ITEM_LAYOUT } from '@/utils/constant';
import useRole from '../useRole';
import { Role } from '../model';

const RoleModal = ({ role, permissions, reload }: any) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const [roles, { modRole, addRole }] = useRole();
  const [checkedKeys, setCheckedKeys] = useState([]);

  const onFinish = async (values: Role) => {
    const newRole = { ...values, resourceIds: checkedKeys };
    onCancel();
    if (!role) {
      await addRole(newRole);
    } else {
      await modRole({ ...newRole, id: role.id });
      message.success('修改成功');
    }
    reload();
  };

  const onCancel = () => {
    dispatch({ type: 'system_role/roleModalVisible', payload: false });
  };

  const newRole: Role = { roleKey: '', roleName: '', sortNo: 10, status: '0', resourceIds: [] };
  useMount(() => {
    if (role) {
      const existRole = {
        id: role.id,
        roleKey: role.roleKey || '',
        roleName: role.roleName || '',
        sortNo: `${role.sortNo}` || '10',
        status: `${role.status}` || '0',
      };
      setCheckedKeys(role.resourceIds);
      form.setFieldsValue(existRole);
    } else {
      form.setFieldsValue(newRole);
    }
  });

  const onCheck = (checkedKeys: any) => {
    setCheckedKeys(checkedKeys);
  };

  return (
    <Modal getContainer={false} title={role ? 'Edit' : 'Create'} visible={true} onOk={form.submit} onCancel={onCancel}>
      <Form form={form} {...FORM_ITEM_LAYOUT} initialValues={newRole} onFinish={onFinish}>
        <Form.Item label="Role Name" name="roleName" rules={[{ required: true, message: 'Please input roleName!' }]}>
          <Input placeholder="Role Name" />
        </Form.Item>
        <Form.Item label="Role Key" name="roleKey" rules={[{ required: true, message: 'Please input roleKey!' }]}>
          <Input placeholder="Role Key" />
        </Form.Item>
        <Form.Item label="Sort No" name="sortNo" rules={[{ required: true, message: 'Please select sortNo!' }]}>
          <Select>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(item => (
              <Select.Option key={item} value={`${item}`}>
                {item}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Status" name="status" rules={[{ required: true, message: 'Please select status!' }]}>
          <Select id="user-status">
            {['Available', 'Forbidden'].map((item, index) => (
              <Select.Option key={item} value={`${index}`}>
                {item}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Permissions">
          <Tree checkable checkedKeys={checkedKeys} onCheck={onCheck} treeData={permissions} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default RoleModal;
