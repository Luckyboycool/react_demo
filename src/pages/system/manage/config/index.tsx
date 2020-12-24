import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { Button, Input, Form, Select, Table, Space, Modal, Switch } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { EditOutlined, DeleteOutlined, PlusCircleOutlined, ReloadOutlined } from '@ant-design/icons';
import { StyleFunctional, StyleFilter, StyleContent, StyleToolbar } from '@/pages/system/style';
import { TABLE_PAGE_CONFIG, SYSTEM_TAB_TABLE_SCROLL } from '@/utils/constant';
import DICT from '@/utils/dictionary';
import ConfigModal from './component/configModal';
import { Config } from './model';
import useConfig from './useConfig';

const SystemConfig = () => {
  const dispatch = useDispatch();
  const system_config = useSelector((state: any) => state.system_config);
  const { configModalVisible } = system_config;

  const [form] = Form.useForm();
  const [configs, { total, loadConfigs, modConfig, delConfigs }] = useConfig();

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const initQuery = { current: 1, pageSize: 20, field: '', order: '', configName: '', configKey: '', configType: '' };
  const [query, setQuery] = useState(initQuery);
  const [config, setConfig] = useState(null);

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

  const onDeleteConfigs = async (ids: string[]) => {
    Modal.confirm({
      title: 'Confirm',
      content: 'Do you really want to delete?',
      onOk: async () => {
        await delConfigs(ids);
        setSelectedRowKeys([]);
        onSubmit();
      },
    });
  };

  const onCreateConfig = () => {
    setConfig(null);
    dispatch({ type: 'system_config/configModalVisible', payload: true });
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
    loadConfigs(query);
  };

  const onChangeStatus = async (config: Config, checked: boolean) => {
    await modConfig({ ...config, configType: checked ? 'Y' : 'N' });
    onSubmit();
  };

  const columns: any = [
    {
      title: 'App Name',
      dataIndex: 'appCode',
      sorter: true,
      width: '8%',
    },
    {
      title: 'Config Name',
      dataIndex: 'configName',
      sorter: true,
      width: '15%',
    },
    {
      title: 'Config Key',
      dataIndex: 'configKey',
      sorter: true,
      width: '12%',
    },
    {
      title: 'Config Value',
      dataIndex: 'configValue',
      sorter: true,
      width: '15%',
    },
    {
      title: 'Type',
      dataIndex: 'configType',
      align: 'center',
      sorter: true,
      width: '8%',
      render: (text: string, record: any) => (
        <Switch defaultChecked={text === 'Y'} onChange={checked => onChangeStatus(record, checked)} />
      ),
    },
    {
      title: DICT.table.create_at,
      dataIndex: 'createTm',
      align: 'center',
      sorter: true,
      width: '12%',
    },
    {
      title: 'Remark',
      dataIndex: 'remark',
      sorter: true,
      width: '15%',
    },
    {
      title: DICT.table.action,
      align: 'center',
      width: '10%',
      render: (text: string, record: any) => (
        <Space size="middle">
          <Button
            title="Edit"
            type="primary"
            size="small"
            shape="circle"
            icon={<EditOutlined />}
            onClick={() => {
              setConfig(record);
              dispatch({ type: 'system_config/configModalVisible', payload: true });
            }}
          />
          <Button
            danger
            title="Delete"
            type="primary"
            size="small"
            shape="circle"
            icon={<DeleteOutlined />}
            onClick={() => onDeleteConfigs([record.id])}
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
          <Button type="text" icon={<PlusCircleOutlined />} title={DICT.table.create} onClick={onCreateConfig} />
          <Button type="text" icon={<ReloadOutlined />} title={DICT.table.refresh} onClick={onRefresh} />
          {selectedRowKeys.length > 0 && (
            <Button
              danger
              type="text"
              icon={<DeleteOutlined />}
              title={DICT.table.delete}
              onClick={() => onDeleteConfigs(selectedRowKeys)}
            />
          )}
        </StyleFunctional>
        <StyleFilter layout="inline" form={form} initialValues={initQuery} onFinish={onFinish}>
          <Form.Item name="configType">
            <Select style={{ width: 110 }}>
              <Select.Option value="">All</Select.Option>
              <Select.Option value="0">Available</Select.Option>
              <Select.Option value="1">Forbidden</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="configName">
            <Input placeholder="input config name" />
          </Form.Item>
          <Form.Item name="configKey">
            <Input.Search placeholder="input config key" enterButton onSearch={form.submit} />
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
        dataSource={configs}
        pagination={pagination}
        onChange={onTableChange}
      />
      {configModalVisible ? <ConfigModal config={config} reload={onSubmit} /> : null}
    </StyleContent>
  );
};

export default SystemConfig;
