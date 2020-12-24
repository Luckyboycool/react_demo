import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { Button, Input, Form, Select, Table, Modal, Badge, DatePicker } from 'antd';
import { DeleteOutlined, ReloadOutlined } from '@ant-design/icons';
import { StyleFunctional, StyleFilter, StyleContent, StyleToolbar } from '@/pages/system/style';
import { TABLE_PAGE_CONFIG, SYSTEM_TAB_TABLE_SCROLL } from '@/utils/constant';
import DICT from '@/utils/dictionary';
import { queryLoginLogs, deleteLoginLogs } from './service';
import { get, post, del, put } from '@/utils/request';


const LoginLog = () => {
  const [form] = Form.useForm();

  const [loginLogs, setLoginLogs] = useState([]);
  const [total, setTotal] = useState(0);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const initQuery = {
    current: 1,
    pageSize: 20,
    field: '',
    order: '',
    beginTime: '',
    endTime: '',
    ipAddr: '',
    status: '',
  };
  const [query, setQuery] = useState(initQuery);
  const [date, setDate] = useState<any>(['', '']);

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

  const onDeleteLoginLogs = async (ids: string[]) => {
    Modal.confirm({
      title: 'Confirm',
      content: 'Do you really want to delete?',
      onOk: async () => {
        await deleteLoginLogs(ids);
        setSelectedRowKeys([]);
        onSubmit();
      },
    });
  };

  const onDateChange: any = (monent: React.SetStateAction<string[]>, dateTime: string[]) => {
    setDate(monent);
    query.beginTime = dateTime[0];
    query.endTime = dateTime[1];
    setQuery(query);
  };

  const onFinish: any = (
    values: React.SetStateAction<{
      current: number;
      pageSize: number;
      field: string;
      order: string;
      beginTime: string;
      endTime: string;
      ipAddr: string;
      status: string;
    }>,
  ) => {
    setQuery({ ...query, ...values, current: 1 });
  };

  const onRefresh = () => {
    setQuery(_.cloneDeep(initQuery));
    setSelectedRowKeys([]);
    form.setFieldsValue(initQuery);
    setDate(['', '']);
  };

  const onSubmit = async () => {
    const { data, total }: any = await queryLoginLogs(query);
    setTotal(total);
    setLoginLogs(data);
  };

  const columns: any = [
    {
      title: 'Username',
      dataIndex: 'userName',
      sorter: true,
      width: '15%',
    },
    {
      title: 'Ip',
      dataIndex: 'ipAddr',
      sorter: true,
      width: '15%',
    },
    {
      title: 'Location',
      dataIndex: 'loginLocation',
      sorter: true,
      width: '10%',
    },
    {
      title: 'Browser',
      dataIndex: 'browser',
      sorter: true,
      width: '10%',
    },
    {
      title: 'OS Type',
      dataIndex: 'osType',
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
      title: 'Message',
      dataIndex: 'message',
      align: 'center',
      sorter: true,
      width: '10%',
    },
    {
      title: 'Login At',
      dataIndex: 'loginTime',
      align: 'center',
      sorter: true,
      width: '20%',
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
              onClick={() => onDeleteLoginLogs(selectedRowKeys)}
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
          <Form.Item name="ipAddr">
            <Input.Search placeholder="input IP" enterButton onSearch={form.submit} />
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
        dataSource={loginLogs}
        pagination={pagination}
        onChange={onTableChange}
      />
    </StyleContent>
  );
};

export default LoginLog;
