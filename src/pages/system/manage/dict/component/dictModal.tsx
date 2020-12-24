import React from 'react';
import { Input, Form, Modal, Tree, message, Select } from 'antd';//表单
import { useDispatch } from 'react-redux';
import { useMount } from '@umijs/hooks';
import { FORM_ITEM_LAYOUT } from '@/utils/constant';
import { Dict } from '../model';
import useDict from '../useDict';

const DictModal = ({ dict, reload }: { dict: Dict | null; reload: any }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const [dicts, { modDict, addDict }] = useDict();

  const onFinish = async (values: any) => {
    onCancel();
    if (!dict) {
      await addDict(values);
    } else {
      await modDict({ ...values, id: dict.id });
      message.success('修改成功');
    }
    reload();
  };

  const onCancel = () => {
    dispatch({ type: 'system_dict/dictModalVisible', payload: false });
  };

  const newDict = { dictName: '', dictType: '', status: '0', remark: '' };
  useMount(() => {
    if (dict) {
      form.setFieldsValue(dict);
    } else {
      form.setFieldsValue(newDict);
    }
  });

  return (
    <Modal getContainer={false} title="操作" visible={true} onOk={form.submit} onCancel={onCancel}>
      <Form form={form} {...FORM_ITEM_LAYOUT} initialValues={newDict} onFinish={onFinish}>
        <Form.Item label="字典名称" name="dictName" rules={[{ required: true, message: 'Please input dictName!' }]}>
          <Input placeholder="字典名称" />
        </Form.Item>
        <Form.Item label="字典类型" name="dictType" rules={[{ required: true, message: 'Please input dictKey!' }]}>
          <Input placeholder="字典类型" />
        </Form.Item>
        <Form.Item label="状态" name="status" rules={[{ required: true, message: 'Please select status!' }]}>
          <Select id="user-status">
            {['正常', '禁用'].map((item, index) => (
              <Select.Option key={item} value={`${index}`}>
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

export default DictModal;
