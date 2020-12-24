import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { Button, Input, Form, Select, Table, Space, Modal, Badge, DatePicker } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { UnorderedListOutlined, DeleteOutlined, ReloadOutlined } from '@ant-design/icons';
import { StyleFunctional, StyleFilter, StyleContent, StyleToolbar } from '@/pages/system/style';
import { TABLE_PAGE_CONFIG, SYSTEM_TAB_TABLE_SCROLL } from '@/utils/constant';
import DICT from '@/utils/dictionary';
import OperationModal from './component/operationModal';
import { queryOperLogs, deleteOperLogs } from './service';
import { Operation } from './model';

const SystemOperation = () => {
  const dispatch = useDispatch();
  const system_operation = useSelector((state: any) => state.system_operation);
  const { operationModalVisible } = system_operation;

  const [form] = Form.useForm();

  const [operLogs, setOperLogs] = useState([]);
  const [total, setTotal] = useState(0);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const initQuery = {
    current: 1,
    pageSize: 20,
    field: '',
    order: '',
    beginTime: '',
    endTime: '',
    operName: '',
    status: '',
  };
  const [query, setQuery] = useState(initQuery);
  const [date, setDate] = useState<any>(['', '']);
  const [operLog, setOperLog] = useState<Operation>();

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

  const onDeleteOperLogs = async (ids: string[]) => {
    Modal.confirm({
      title: 'Confirm',
      content: 'Do you really want to delete?',
      onOk: async () => {
        await deleteOperLogs(ids);
        setSelectedRowKeys([]);
        onSubmit();
      },
    });
  };

  const onDateChange: any = (monent: React.SetStateAction<string[]>, dateTime: string[]) => {
    // Date 用来存储 moment， 对应DatePicker的value
    // Query 用来传递给后台的 string
    setDate(monent);
    query.beginTime = dateTime[0];
    query.endTime = dateTime[1];
    setQuery(query);
  };

  const onFinish = (values: any) => {
    setQuery({ ...query, ...values, current: 1 });
  };

  const onRefresh = () => {
    setQuery(_.cloneDeep(initQuery));
    setSelectedRowKeys([]);
    form.setFieldsValue(initQuery);
    setDate(['', '']);
  };

  const onSubmit = async () => {
    const { data, total }: any = await queryOperLogs(query);
    setTotal(total);
    setOperLogs(data);
  };

  const columns: any = [
    {
      title: 'Module',
      dataIndex: 'title',
      sorter: true,
      width: '15%',
    },
    {
      title: 'Operate By',
      dataIndex: 'operName',
      sorter: true,
      width: '15%',
    },
    {
      title: 'IP',
      dataIndex: 'operIp',
      sorter: true,
      width: '15%',
    },
    {
      title: 'Location',
      dataIndex: 'operLocation',
      sorter: true,
      width: '10%',
    },
    {
      title: DICT.table.status,
      dataIndex: 'status',
      align: 'center',
      sorter: true,
      width: '10%',
      render: (text: string) =>
        parseInt(text) === 0 ? <Badge status="success" text="成功" /> : <Badge status="default" text="失败" />,
    },
    {
      title: 'Operate At',
      dataIndex: 'operTime',
      align: 'center',
      sorter: true,
      width: '20%',
    },
    {
      title: DICT.table.action,
      align: 'center',
      width: '10%',
      render: (text: string, record: any) => (
        <Space size="middle">
          <Button
            title="Detail"
            type="primary"
            size="small"
            shape="circle"
            icon={<UnorderedListOutlined />}
            onClick={() => {
              setOperLog(record);
              dispatch({ type: 'system_operation/operationModalVisible', payload: true });
            }}
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

  return (
    <StyleContent>
      <StyleToolbar>
        <StyleFunctional>
          <Button type="text" title={DICT.table.refresh} icon={<ReloadOutlined />} onClick={onRefresh} />
          {selectedRowKeys.length > 0 && (
            <Button
              danger
              type="text"
              title={DICT.table.delete}
              icon={<DeleteOutlined />}
              onClick={() => onDeleteOperLogs(selectedRowKeys)}
            />
          )}
        </StyleFunctional>
        <StyleFilter layout="inline" form={form} initialValues={initQuery} onFinish={onFinish}>
          <Form.Item>
            <DatePicker.RangePicker value={date} onChange={onDateChange} />
          </Form.Item>
          <Form.Item name="status">
            <Select style={{ width: 100 }}>
              <Select.Option value="">All</Select.Option>
              <Select.Option value="0">Success</Select.Option>
              <Select.Option value="1">Fail</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="operName">
            <Input.Search placeholder="input operate by" enterButton onSearch={form.submit} />
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
        dataSource={operLogs}
        pagination={pagination}
        onChange={onTableChange}
      />
      {operationModalVisible && operLog ? <OperationModal operLog={operLog} /> : null}
    </StyleContent>
  );
};

export default SystemOperation;
