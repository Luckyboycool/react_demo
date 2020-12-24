import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { Button, Input, Form, Select, Table, Space, Modal, Switch, DatePicker } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import {
  UnorderedListOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import { StyleFunctional, StyleFilter, StyleContent, StyleToolbar } from '@/pages/system/style';
import { TABLE_PAGE_CONFIG, SYSTEM_TAB_TABLE_SCROLL } from '@/utils/constant';
import DICT from '@/utils/dictionary';
import DictModal from './component/dictModal';
import DictTable from './component/dictTable';
import { Dict } from './model';
import useDict from './useDict';
import model from '../role/model';
import { insertDict } from './service';

const SystemDict = () => {
  const dispatch = useDispatch();
  const system_dict = useSelector((state: any) => state.system_dict);
  const { dictModalVisible, dictTableVisible } = system_dict;



  const [form] = Form.useForm();
  const [dicts, { total, loadDicts, modDict, delDicts }] = useDict();

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const initQuery = { current: 1, pageSize: 20, field: '', order: '', dictName: '', dictType: '', status: '' };
  const [times, setTimes] = useState({ beginTime: '', endTime: '' });
  const [query, setQuery] = useState(initQuery);
  const [dict, setDict] = useState(null);

  useEffect(() => {
    onSubmit();
  }, [query]);

  const onTableChange: any = (
    pagination: { current: number; pageSize: number },
    filters: any,
    sorter: { field: string; order: string },
  ) => {
    const _query = _.cloneDeep(query);
    _query.current = pagination.current;
    _query.pageSize = pagination.pageSize;
    if (!_.isEmpty(sorter)) {
      _query.field = sorter.field;
      _query.order = sorter.order;
    }
    setQuery(_query);
  };

  const onDeleteDicts = async (ids: string[]) => {
    Modal.confirm({
      title: 'Confirm',
      content: 'Do you really want to delete?',
      onOk: async () => {
        await delDicts(ids);
        setSelectedRowKeys([]);
        onSubmit();
      },
    });
  };

  const onCreateDict = () => {
    setDict(null);
    dispatch({ type: 'system_dict/dictModalVisible', payload: true });
  };

  const onFinish = (values: any) => {
    setQuery({ ...query, ...values, current: 1 });
  };

  const onRefresh = () => {
    setQuery(_.cloneDeep(initQuery));
    setSelectedRowKeys([]);
    form.setFieldsValue(initQuery);
  };

  const onSubmit = () => {
    loadDicts(query);
  };

  const onChangeStatus = async (dict: Dict, checked: boolean) => {
    await modDict({ ...dict, status: checked ? 0 : 1 });
    onSubmit();
  };

  const columns: any = [
    {
      title: 'Dict Name',
      dataIndex: 'dictName',
      sorter: true,
      width: '25%',
    },
    {
      title: 'Dict Type',
      dataIndex: 'dictType',
      sorter: true,
      width: '25%',
    },
    {
      title: DICT.table.status,
      dataIndex: 'status',
      align: 'center',
      sorter: true,
      width: '20%',
      render: (text: string, record: any) => (
        <Switch defaultChecked={parseInt(text) === 0} onChange={checked => onChangeStatus(record, checked)} />
      ),
    },
    {
      title: DICT.table.create_at,
      dataIndex: 'createTm',
      align: 'center',
      sorter: true,
      width: '20%',
    },
    {
      title: DICT.table.action,
      align: 'center',
      width: '10%',
      render: (text: any, record: any) => (
        <Space size="middle">
          <Button
            title="Edit"
            type="primary"
            size="small"
            shape="circle"
            icon={<EditOutlined />}
            onClick={() => {
              setDict(record);
              dispatch({ type: 'system_dict/dictModalVisible', payload: true });
            }}
          />
          <Button
            title="Detail"
            type="primary"
            size="small"
            shape="circle"
            icon={<UnorderedListOutlined />}
            onClick={() => {
              setDict(record);
              dispatch({ type: 'system_dict/dictTableVisible', payload: true });
            }}
          />
          <Button
            danger
            title="Delete"
            type="primary"
            size="small"
            shape="circle"
            icon={<DeleteOutlined />}
            onClick={() => onDeleteDicts([record.id])}
          />
        </Space>
      ),
    },
  ];

  const rowSelection: any = {
    selectedRowKeys,
    type: 'selectedRows',
    onChange: (selectedRowKeys: React.SetStateAction<never[]>) => setSelectedRowKeys(selectedRowKeys),
  };

  const pagination: any = { ...TABLE_PAGE_CONFIG, current: query.current, pageSize: query.pageSize, total };

  const [date, setDate] = useState<any>(['', '']);

  const onDateChange: any = (monent: React.SetStateAction<string[]>, dateTime: string[]) => {
    setDate(monent);
    times.beginTime = dateTime[0];
    times.endTime = dateTime[1];
    setTimes(times);
  };

  const onSubmit1 = async (values: any) => {
    console.log(values);
    values.beginTime += times.beginTime;
    values.endTime += times.endTime;
    await insertDict(values);
    onSubmit();
  }

  const newDict = { dictName: '', dictType: '', status: '0', remark: '' };

  return (
    <StyleContent>
      <StyleToolbar>
        <StyleFunctional>
          <Button type="text" icon={<PlusCircleOutlined />} title={DICT.table.create} onClick={onCreateDict} />
          <Button type="text" icon={<ReloadOutlined />} title={DICT.table.refresh} onClick={onRefresh} />
          {selectedRowKeys.length > 0 && (
            <Button
              danger
              type="text"
              icon={<DeleteOutlined />}
              title={DICT.table.delete}
              onClick={() => onDeleteDicts(selectedRowKeys)}
            />
          )}
        </StyleFunctional>
        <StyleFilter layout="inline" form={form} initialValues={initQuery} onFinish={onFinish}>
          <Form.Item name="status">
            <Select style={{ width: 110 }}>
              <Select.Option value="">All</Select.Option>
              <Select.Option value="0">Available</Select.Option>
              <Select.Option value="1">Forbidden</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="dictName">
            <Input placeholder="input dict name" />
          </Form.Item>
          <Form.Item name="dictType">
            <Input.Search placeholder="input dict type" enterButton onSearch={form.submit} />
          </Form.Item>
        </StyleFilter>
      </StyleToolbar>
      <Table
        rowKey="id"
        size="small"
        scroll={SYSTEM_TAB_TABLE_SCROLL}
        showSorterTooltip={false}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={dicts}
        pagination={pagination}
        onChange={onTableChange}
      />

      <Form form={form} initialValues={newDict} onFinish={onSubmit1}>
        <Form.Item>
          <DatePicker.RangePicker value={date} onChange={onDateChange} />
        </Form.Item>
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
        <Button type="primary" htmlType='submit' >提交</Button>
      </Form>

      {dictModalVisible ? <DictModal dict={dict} reload={onSubmit} /> : null}
      {dictTableVisible && dict ? <DictTable dict={dict} /> : null}
    </StyleContent>
  );
};

export default SystemDict;
