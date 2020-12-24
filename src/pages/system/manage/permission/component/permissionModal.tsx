import React, {useState} from 'react';
import {
              Input,
              Form,
              Modal,
              InputNumber,
              TreeSelect,
              message,
              Select
} from 'antd';
import {useDispatch} from 'react-redux';
import {useMount} from '@umijs/hooks';
import {FORM_ITEM_LAYOUT} from '@/utils/constant';
import {PERMISSION_TYPES} from '../constant';
import usePermission from '../usePermission';
import {Permission} from '../model';

const PermissionModal = ({
              parentId,
              treeData,
              permission,
              appCode,
              reload
} : any) => {
              const dispatch = useDispatch();
              const [form] = Form.useForm();

              const [permissions, {
                                          modPermission,
                                          addPermission
                            }
              ] = usePermission();

              const onFinish = async (values : any) => {
                            onCancel();
                            if (!permission) {
                                          await addPermission(values);
                            } else {
                                          await modPermission({
                                                        ...values,
                                                        id: permission.id
                                          });
                                          message.success('修改成功');
                            }
                            reload();
              };

              const onCancel = () => {
                            dispatch({type: 'system_permission/permissionModalVisible', payload: false});
              };

              const newPermission = {
                            parentId: parentId || '000000',
                            resType: 'M',
                            resName: '',
                            appCode: '',
                            resKey: '',
                            sortNo: 1,
                            perms: '',
                            component: ''
              };
              useMount(() => {
                            if (permission) {
                                          const existPermission = {
                                                        id: permission.id
                                          };
                                          form.setFieldsValue(permission);
                            } else {
                                          form.setFieldsValue(newPermission);
                            }
              });

              return (
                            <Modal getContainer={false}
                                          title="操作"
                                          visible={true}
                                          onOk={
                                                        form.submit
                                          }
                                          onCancel={onCancel}>
                                          <Form form={form}
                                                        {...FORM_ITEM_LAYOUT}
                                                        initialValues={newPermission}
                                                        onFinish={onFinish}>
                                                        <Form.Item label="上级权限" name="parentId"
                                                                      rules={
                                                                                    [{
                                                                                                                required: true,
                                                                                                                message: 'Please select parentId!'
                                                                                                  }]
                                                        }>
                                                                      <TreeSelect // style={{ width: '100%' }}
                                                                                    dropdownStyle={
                                                                                                  {
                                                                                                                maxHeight: 400,
                                                                                                                overflow: 'auto'
                                                                                                  }
                                                                                    }
                                                                                    treeData={treeData}
                                                                                    placeholder="Please select"
                                                                                    // treeDefaultExpandAll
                                                                                    // onChange={this.onChange}
                                                                      />
                                                        </Form.Item>
                                                        <Form.Item label="菜单类型" name="resType"
                                                                      rules={
                                                                                    [{
                                                                                                                required: true,
                                                                                                                message: 'Please select resType!'
                                                                                                  }]
                                                        }>
                                                                      <Select> {
                                                                                    Object.keys(PERMISSION_TYPES).map(key => (
                                                                                                  <Select.Option key={key}
                                                                                                                value={key}>
                                                                                                                {
                                                                                                                PERMISSION_TYPES[key]
                                                                                                  } </Select.Option>
                                                                                    ))
                                                                      } </Select>
                                                        </Form.Item>
                                                        <Form.Item label="权限名称" name="resName"
                                                                      rules={
                                                                                    [{
                                                                                                                required: true,
                                                                                                                message: 'Please input resName!'
                                                                                                  }]
                                                        }>
                                                                      <Input placeholder="权限名称"/>
                                                        </Form.Item>
                                                        <Form.Item label="系统名称" name="appCode"
                                                                      rules={
                                                                                    [{
                                                                                                                required: true,
                                                                                                                message: 'Please select appCode!'
                                                                                                  }]
                                                        }>
                                                                      <Select> {
                                                                                    appCode.map((app : {
                                                                                                  appCode: string;
                                                                                                  appName: string
                                                                                    }) => (
                                                                                                  <Select.Option key={
                                                                                                                              app.appCode
                                                                                                                }
                                                                                                                value={
                                                                                                                              app.appCode
                                                                                                  }>
                                                                                                                {
                                                                                                                app.appName
                                                                                                  } </Select.Option>
                                                                                    ))
                                                                      } </Select>
                                                        </Form.Item>
                                                        <Form.Item label="唯一路由键" name="resKey"
                                                                      rules={
                                                                                    [{
                                                                                                                required: true,
                                                                                                                message: 'Please input resKey!'
                                                                                                  }]
                                                        }>
                                                                      <Input placeholder="唯一路由键"/>
                                                        </Form.Item>
                                                        <Form.Item label="权限标识" name="perms">
                                                                      <Input placeholder="权限标识"/>
                                                        </Form.Item>
                                                        <Form.Item label="组件" name="component">
                                                                      <Input placeholder="组件"/>
                                                        </Form.Item>
                                                        <Form.Item label="显示顺序" name="sortNo"
                                                                      rules={
                                                                                    [{
                                                                                                                required: true,
                                                                                                                message: 'Please input sortNo!'
                                                                                                  }]
                                                        }>
                                                                      <InputNumber style={
                                                                                                  {width: '100%'}
                                                                                    }
                                                                                    min={1}
                                                                                    max={99}/>
                                                        </Form.Item>
                                                        <Form.Item label="状态" name="visible"
                                                                      rules={
                                                                                    [{
                                                                                                                required: true,
                                                                                                                message: 'Please select status!'
                                                                                                  }]
                                                        }>
                                                                      <Select> {
                                                                                    ['Visible', 'Hidden'].map((item, index) => (
                                                                                                  <Select.Option key={item}
                                                                                                                value={
                                                                                                                              `${index}`
                                                                                                  }>
                                                                                                                {item} </Select.Option>
                                                                                    ))
                                                                      } </Select>
                                                        </Form.Item>
                                          </Form>
                            </Modal>
              );
};

export default PermissionModal;
