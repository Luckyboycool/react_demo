import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import {
  Button,
  Input,
  Form,
  Select,
  Table,
  Space,
  Modal,
  Switch
} from 'antd';
import {
  LockOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
  ReloadOutlined
} from '@ant-design/icons';
import { StyleFunctional, StyleFilter, StyleContent, StyleToolbar } from '@/pages/system/style';
import { useMount, useResponsive } from '@umijs/hooks';
import { TABLE_PAGE_CONFIG, SYSTEM_TAB_TABLE_SCROLL } from '@/utils/constant';
import DICT from '@/utils/dictionary';
import DictModal from './component/dictModal';
import DictTable from './component/dictTable';
import { useSelector, useDispatch } from 'react-redux';



import { queryUser } from './service';

const PracticeGroup2 = () => {
  const query = {
    id: 0,
    sex: "",
    age: 0,
    address: "",
    username: "",
    remark: "",
    createDate: "",
    updateDate: "",
    pageNum: 0,
    pageSize: 4
  }


  const [groups, setGroups] = useState([]);
  const [dataGroup, setDataGroup] = useState(query);
  const [data1, setData1] = useState();

  const [users, setUsers] = useState(null);
  const dispatch = useDispatch();
  const system_user = useSelector((state: any) => state.system_user);
  const { dictModalVisible, dictTableVisible } = system_user;



  async function loadGroups(query: any) {
    console.log(query)
    //调用接口
    const data: any = await queryUser(query);
    // setData1(data);
    console.log(data)

    setGroups(data.data.records);
  }

  useMount(() => {
    loadGroups(query);
  });

  const [form] = Form.useForm();

  const onFinish = (obj: any) => {
    loadGroups(obj)
  }
  // const pagination: any = { ...TABLE_PAGE_CONFIG, current: page.pageNum, pageSize: page.pageSize, total: page.total };

  const onCreateUser = () => {
    console.log(1111)
    setUsers(null);
    dispatch({ type: 'system_user/dictModalVisible', payload: true });
  }

  const onSubmit = () => {

  }

  const columns: any[] = [
    {
      title: 'id',
      dataIndex: 'id',
      sorter: true,
      width: '10%'
    },
    {
      title: 'username',
      sorter: true,
      dataIndex: "username",
      width: '10%'
    },
    {
      title: 'password',
      sorter: true,
      dataIndex: "password",
      width: '10%'
    },
    {
      title: 'sex',
      sorter: true,
      dataIndex: "sex",
      width: '10%'
    },
    {
      title: 'age',
      sorter: true,
      dataIndex: "age",
      width: '10%'
    },
    {
      title: 'address',
      sorter: true,
      dataIndex: "address",
      width: '10%'
    },
    {
      title: 'remark',
      sorter: true,
      dataIndex: "remark",
      width: '10%'
    },
    {
      title: 'creatDate',
      sorter: true,
      dataIndex: "creatDate",
      width: '10%'
    },
    {
      title: DICT.table.action,
      align: 'center',
      width: '10%',
      render: (text: string, record: any) => (
        <Space size="middle">
          <Button size="small" title="Edit" type="primary" shape="circle"
            icon={<EditOutlined />}
          // onClick={() => {
          //   setUser(record);
          //   dispatch({ type: 'system_user/userModalVisible', payload: true });
          // }}
          />
          <Button danger size="small" title="Delete" type="primary" shape="circle"
            icon={<DeleteOutlined />}
          // onClick={() => onDeleteUsers([record.id])}
          />
        </Space>
      )
    },
  ];

  return (
    <StyleContent>
      <StyleToolbar>
        <StyleFunctional>
          <Button size="small" type="text"
            title={
              DICT.table.create
            }
            icon={<PlusCircleOutlined />}
            onClick={onCreateUser}
          />
          <Button size="small" type="text"
            title={
              DICT.table.refresh
            }
            icon={<ReloadOutlined />} />
          <Button danger size="small" type="text"
            title={
              DICT.table.delete
            }
            icon={<DeleteOutlined />}
          // onClick={() => onDeleteUsers(selectedRowKeys)}
          />
        </StyleFunctional>
        <StyleFilter size="small" layout="inline"
          form={form}
          initialValues={query}
          onFinish={onFinish}>
          <Form.Item name="statusss">
            <Select placeholder="-请选择-"
              style={
                { width: 110 }
              }>
              {/* {
                users.map((user: any, index: any) => (
                  <Select.Option value={user}>
                    {user}</Select.Option>
                ))
              } */}
            </Select>
          </Form.Item>
          <Form.Item name="keywordss">
            <Input.Search size="small" placeholder="input search text" enterButton
              onSearch={
                form.submit
              } />
          </Form.Item>
        </StyleFilter>
      </StyleToolbar>
      <Table rowKey="id" size="small"
        scroll={SYSTEM_TAB_TABLE_SCROLL}
        showSorterTooltip={false}
        // rowSelection={rowSelection}
        columns={columns}
        dataSource={groups}
      // pagination={pagination}
      // onChange={onTableChange}
      />
      {dictModalVisible ? <DictModal dict={users} reload={onSubmit} /> : null}
      {dictTableVisible && users ? <DictTable user={users} /> : null}
    </StyleContent>



  );
};


export default PracticeGroup2;
