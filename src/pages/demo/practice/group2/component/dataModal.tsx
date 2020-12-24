import React from 'react';
import { Input, Form, Modal, InputNumber, message, Select } from 'antd';
import { useDispatch } from 'react-redux';
import { useMount } from '@umijs/hooks';
import { FORM_ITEM_LAYOUT } from '@/utils/constant';
import { DictData } from '../model';
import useData from '../useData';

const DataModal = ({
  selectData,
  dictType,
  reload,
}: {
  selectData: DictData | null;
  dictType: string;
  reload: any;
}) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const [data, { modData, addData }] = useData();

  const onFinish = async (values: any) => {
    values = { ...values, dictType };
    onCancel();
    if (!selectData) {
      await addData(values);
    } else {
      await modData({ ...values, id: selectData.id });
      message.success('修改成功');
    }
    reload();
  };

  const onCancel = () => {
    dispatch({ type: 'system_dict/dataModalVisible', payload: false });
  };

  const newData = { dictLabel: '', dictSort: 1, dictValue: '', status: '0', remark: '' };
  useMount(() => {
    if (selectData) {
      form.setFieldsValue(selectData);
    } else {
      form.setFieldsValue(newData);
    }
  });

  return (
    <Modal getContainer={false} title="操作" visible={true} onOk={form.submit} onCancel={onCancel}>
      <Form form={form} {...FORM_ITEM_LAYOUT} initialValues={newData} onFinish={onFinish}>
        <Form.Item label="字典标签" name="dictLabel" rules={[{ required: true, message: 'Please input dictLabel!' }]}>
          <Input placeholder="字典标签" />
        </Form.Item>
        <Form.Item label="字典键值" name="dictValue" rules={[{ required: true, message: 'Please input dictValue!' }]}>
          <Input placeholder="字典键值" />
        </Form.Item>
        <Form.Item label="显示顺序" name="dictSort" rules={[{ required: true, message: 'Please input sortNo!' }]}>
          <InputNumber style={{ width: '100%' }} min={1} max={99} />
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

export default DataModal;
