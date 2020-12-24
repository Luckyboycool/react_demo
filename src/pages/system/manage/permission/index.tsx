import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { Button, Input, Form, Select, Table, Space, Modal, Switch } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useMount } from '@umijs/hooks';
import { LockOutlined, EditOutlined, DeleteOutlined, PlusCircleOutlined, ReloadOutlined } from '@ant-design/icons';
import { StyleFunctional, StyleFilter, StyleContent, StyleToolbar } from '@/pages/system/style';
import { TABLE_PAGE_CONFIG, SYSTEM_TAB_TABLE_SCROLL } from '@/utils/constant';
import DICT from '@/utils/dictionary';
import PermissionModal from './component/permissionModal';
import { PERMISSION_TYPES } from './constant';
import { Permission } from './model';
import { queryAppCode } from './service';
import usePermission from './usePermission';

const SystemPermission = () => {
  const dispatch = useDispatch();
  const system_permission = useSelector((state: any) => state.system_permission);
  const { permissionModalVisible } = system_permission;

  const [form] = Form.useForm();
  const [permissions, { treeData, loadPermissions, modPermission, delPermission }] = usePermission();

  const [appCode, setAppCode] = useState([]);
  const initQuery = { current: 1, pageSize: 20, field: '', order: '', resKey: '', resName: '', visible: '' };
  const [query, setQuery] = useState(initQuery);
  const [permission, setPermission] = useState(null);
  const [parentId, setParentId] = useState(null);

  useMount(() => {
    loadAppCode();
  });

  useEffect(() => {
    onSubmit();
  }, [query]);

  const loadAppCode = async () => {
    const res: any = await queryAppCode();
    setAppCode(res);
  };

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

  const onDeletePermission = async (id: string) => {
    Modal.confirm({
      title: 'Confirm',
      content: 'Do you really want to delete?',
      onOk: async () => {
        await delPermission(id);
        onSubmit();
      },
    });
  };

  const onCreatePermission = () => {
    setParentId(null);
    setPermission(null);
    dispatch({ type: 'system_permission/permissionModalVisible', payload: true });
  };

  const onFinish = (values: any) => {
    setQuery({ ...query, ...values, current: 1 });
  };

  const onRefresh = () => {
    setQuery(_.cloneDeep(initQuery));
    form.setFieldsValue(initQuery);
  };

  const onSubmit = () => {
    loadPermissions(query);
  };

  const onChangeStatus = async (permission: Permission, checked: boolean) => {
    await modPermission({ ...permission, status: checked ? 0 : 1 });
    onSubmit();
  };

  const columns: any = [
    {
      title: 'Permission Name',
      dataIndex: 'resName',
      sorter: true,
      width: '20%',
    },
    {
      title: 'Permission Key',
      dataIndex: 'resKey',
      sorter: true,
      width: '12%',
    },
    {
      title: 'Component',
      dataIndex: 'component',
      sorter: true,
      width: '12%',
    },
    {
      title: 'Sort No',
      dataIndex: 'sortNo',
      align: 'center',
      sorter: true,
      width: '8%',
    },
    {
      title: 'Type',
      dataIndex: 'resType',
      sorter: true,
      align: 'center',
      width: '8%',
      render: (text: Permission['resType']) => (text ? PERMISSION_TYPES[text] : ''),
    },
    {
      title: 'Permission Sign',
      dataIndex: 'perms',
      sorter: true,
      width: '15%',
    },
    {
      title: DICT.table.status,
      dataIndex: 'visible',
      align: 'center',
      sorter: true,
      width: '5%',
      render: (text: string, record: any) => (
        <Switch defaultChecked={parseInt(text) === 0} onChange={checked => onChangeStatus(record, checked)} />
      ),
    },
    {
      title: DICT.table.action,
      align: 'center',
      width: '10%',
      render: (text: any, record: any) => (
        <Space size="middle">
          <Button
            title="Permission"
            type="primary"
            size="small"
            shape="circle"
            icon={<EditOutlined />}
            onClick={() => {
              setParentId(null);
              setPermission(record);
              dispatch({ type: 'system_permission/permissionModalVisible', payload: true });
            }}
          />
          <Button
            title="Password"
            type="primary"
            size="small"
            shape="circle"
            icon={<LockOutlined />}
            onClick={() => {
              setParentId(record.id);
              setPermission(null);
              dispatch({ type: 'system_permission/permissionModalVisible', payload: true });
            }}
          />
          <Button
            danger
            title="Delete"
            type="primary"
            size="small"
            shape="circle"
            icon={<DeleteOutlined />}
            onClick={() => onDeletePermission(record.id)}
          />
        </Space>
      ),
    },
  ];

  const pagination: any = {
    ...TABLE_PAGE_CONFIG,
    current: query.current,
    pageSize: query.pageSize,
    total: permissions.length || 0,
  };

  return (
    <StyleContent>
      <StyleToolbar>
        <StyleFunctional>
          <Button type="text" icon={<PlusCircleOutlined />} title={DICT.table.create} onClick={onCreatePermission} />
          <Button type="text" icon={<ReloadOutlined />} title={DICT.table.refresh} onClick={onRefresh} />
        </StyleFunctional>
        <StyleFilter layout="inline" form={form} initialValues={initQuery} onFinish={onFinish}>
          <Form.Item name="visible">
            <Select style={{ width: 110 }}>
              <Select.Option value="">All</Select.Option>
              <Select.Option value="0">Available</Select.Option>
              <Select.Option value="1">Forbidden</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="resKey">
            <Input placeholder="input permission key" />
          </Form.Item>
          <Form.Item name="resName">
            <Input.Search placeholder="input permission name" enterButton onSearch={form.submit} />
          </Form.Item>
        </StyleFilter>
      </StyleToolbar>
      <Table
        rowKey="id"
        size="small"
        scroll={SYSTEM_TAB_TABLE_SCROLL}
        showSorterTooltip={false}
        columns={columns}
        dataSource={permissions}
        pagination={pagination}
        onChange={onTableChange}
      />
      {permissionModalVisible ? (
        <PermissionModal
          parentId={parentId}
          appCode={appCode}
          permission={permission}
          treeData={treeData}
          reload={onSubmit}
        />
      ) : null}
    </StyleContent>
  );
};

export default SystemPermission;
