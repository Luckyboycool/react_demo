import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { Button, Input, Form, Select, Table, Space, Modal, Switch } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useMount } from '@umijs/hooks';
import { EditOutlined, DeleteOutlined, PlusCircleOutlined, ReloadOutlined } from '@ant-design/icons';
import { StyleFunctional, StyleFilter, StyleContent, StyleToolbar } from '@/pages/system/style';
import { TABLE_PAGE_CONFIG, SYSTEM_TAB_TABLE_SCROLL } from '@/utils/constant';
import DICT from '@/utils/dictionary';
import RoleModal from './component/roleModal';
import { Role } from './model';
import { queryPermissions } from './service';
import useRole from './useRole';

const SystemRole = () => {
  const dispatch = useDispatch();
  const system_role = useSelector((state: any) => state.system_role);
  const { roleModalVisible } = system_role;

  const [form] = Form.useForm();
  const [roles, { total, loadRoles, modRole, delRoles }] = useRole();

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const initQuery = { current: 1, pageSize: 20, field: '', order: '', roleName: '', status: '' };
  const [query, setQuery] = useState(initQuery);
  const [role, setRole] = useState(null);
  const [permissions, setPermissions] = useState([]);

  useMount(() => {
    console.log('system/role mount');
    loadPermissions();
  });

  useEffect(() => {
    onSubmit();
  }, [query]);

  const loadPermissions = async () => {
    const list = await queryPermissions();
    const permissions: any = [];
    buildtree(list, permissions, '000000');
    setPermissions(permissions);
    function buildtree(list: any, permissions: any, parentId: string) {
      list.forEach((item: any) => {
        if (item.parentId === parentId) {
          const child = {
            key: item.id,
            title: item.resName,
            children: [],
          };
          buildtree(list, child.children, item.id);
          permissions.push(child);
        }
      });
    }
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

  const onDeleteRoles = async (ids: string[]) => {
    Modal.confirm({
      title: 'Confirm',
      content: 'Do you really want to delete?',
      onOk: async () => {
        await delRoles(ids);
        setSelectedRowKeys([]);
        onSubmit();
      },
    });
  };

  const onCreateRole = () => {
    setRole(null);
    dispatch({ type: 'system_role/roleModalVisible', payload: true });
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
    loadRoles(query);
  };

  const onChangeStatus = async (role: Role, checked: boolean) => {
    await modRole({ ...role, status: checked ? 0 : 1 });
    onSubmit();
  };

  const columns: any[] = [
    {
      title: 'Role Name',
      dataIndex: 'roleName',
      sorter: true,
      width: '25%',
    },
    {
      title: 'Permission Key',
      dataIndex: 'roleKey',
      sorter: true,
      width: '20%',
    },
    {
      title: 'Sort No',
      dataIndex: 'sortNo',
      align: 'center',
      sorter: true,
      width: '10%',
    },
    {
      title: DICT.table.status,
      dataIndex: 'status',
      align: 'center',
      sorter: true,
      width: '15%',
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
      render: (text: string, record: any) => (
        <Space size="middle">
          <Button
            title="Edit"
            type="primary"
            size="small"
            shape="circle"
            icon={<EditOutlined />}
            onClick={() => {
              setRole(record);
              dispatch({ type: 'system_role/roleModalVisible', payload: true });
            }}
          />
          <Button
            danger
            title="Delete"
            type="primary"
            size="small"
            shape="circle"
            icon={<DeleteOutlined />}
            onClick={() => onDeleteRoles([record.id])}
          />
        </Space>
      ),
    },
  ];

  const rowSelection: any = {
    selectedRowKeys,
    type: 'selectedRows',
    onChange: (selectedRowKeys: any) => setSelectedRowKeys(selectedRowKeys),
  };

  const pagination: any = { ...TABLE_PAGE_CONFIG, current: query.current, pageSize: query.pageSize, total };

  return (
    <StyleContent>
      <StyleToolbar>
        <StyleFunctional>
          <Button type="text" icon={<PlusCircleOutlined />} title={DICT.table.create} onClick={onCreateRole} />
          <Button type="text" icon={<ReloadOutlined />} title={DICT.table.refresh} onClick={onRefresh} />
          {selectedRowKeys.length > 0 && (
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              title={DICT.table.delete}
              onClick={() => onDeleteRoles(selectedRowKeys)}
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
          <Form.Item name="roleName">
            <Input.Search placeholder="input search text" enterButton onSearch={form.submit} />
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
        dataSource={roles}
        pagination={pagination}
        onChange={onTableChange}
      />
      {roleModalVisible ? <RoleModal role={role} permissions={permissions} reload={onSubmit} /> : null}
    </StyleContent>
  );
};

export default SystemRole;
