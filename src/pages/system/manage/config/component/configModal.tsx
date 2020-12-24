import React, { useState } from 'react';
import { Input, Form, Modal, message, Select } from 'antd';
import { useDispatch } from 'react-redux';
import { useMount } from '@umijs/hooks';
import { FORM_ITEM_LAYOUT } from '@/utils/constant';
import { Config } from '../model';
import useConfig from '../useConfig';

const ConfigModal = ({ config, reload }: { config: Config | null; reload: any }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const [configs, { modConfig, addConfig }] = useConfig();

  const onFinish = async (values: any) => {
    onCancel();
    if (!config) {
      await addConfig(values);
    } else {
      await modConfig({ ...values, id: config.id });
      message.success('修改成功');
    }
    reload();
  };

  const onCancel = () => {
    dispatch({ type: 'system_config/configModalVisible', payload: false });
  };

  const newConfig = { appCode: '', configName: '', configKey: '', configValue: '', configType: 'N', remark: '' };
  useMount(() => {
    if (config) {
      form.setFieldsValue(config);
    } else {
      form.setFieldsValue(newConfig);
    }
  });

  return (
    <Modal getContainer={false} title="操作" visible={true} onOk={form.submit} onCancel={onCancel}>
      <Form form={form} {...FORM_ITEM_LAYOUT} initialValues={newConfig} onFinish={onFinish}>
        <Form.Item label="应用名称" name="appCode" rules={[{ required: true, message: 'Please input appCode!' }]}>
          <Input placeholder="应用名称" />
        </Form.Item>
        <Form.Item label="参数名称" name="configName" rules={[{ required: true, message: 'Please input configName!' }]}>
          <Input placeholder="参数名称" />
        </Form.Item>
        <Form.Item label="参数键名" name="configKey" rules={[{ required: true, message: 'Please input configKey!' }]}>
          <Input placeholder="参数键名" />
        </Form.Item>
        <Form.Item
          label="参数键值"
          name="configValue"
          rules={[{ required: true, message: 'Please input configValue!' }]}
        >
          <Input placeholder="参数键值" />
        </Form.Item>
        <Form.Item label="是否内置" name="configType">
          <Select>
            {['是', '否'].map(item => (
              <Select.Option key={item} value={item === '是' ? 'Y' : 'N'}>
                {item}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="备注" name="remark">
          <Input placeholder="备注" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ConfigModal;
