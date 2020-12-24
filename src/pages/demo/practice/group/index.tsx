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
// import { useSelector, useDispatch } from 'react-redux';
import {
    LockOutlined,
    EditOutlined,
    DeleteOutlined,
    PlusCircleOutlined,
    ReloadOutlined
} from '@ant-design/icons';
import { StyleFunctional, StyleFilter, StyleContent, StyleToolbar } from '@/pages/system/style';
import { useMount } from '@umijs/hooks';
import { TABLE_PAGE_CONFIG, SYSTEM_TAB_TABLE_SCROLL } from '@/utils/constant';
import DICT from '@/utils/dictionary';
// import PasswordModal from './component/passwordModal';
// import UserModal from './component/userModal';
// import { User } from './model';
import { fetchGroups } from './service';

const PracticeGroup4444 = () => {
    // const dispatch = useDispatch();
    // const system_user = useSelector((state: any) => state.system_user);
    // const { userModalVisible, passwordModalVisible } = system_user;

    const [form] = Form.useForm();
    // 数据源，后台传来的参数

    // const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const initQuery = {
        current: 1,
        pageSize: 20,
        field: '',
        order: '',
        keywords: '',
        status: 'admin'
    };
    const [query, setQuery] = useState(initQuery);
    const [groups, setGroups] = useState([]);
    const [users, setUsers] = useState<any[]>([]);


    async function loadGroups(param: any) {
        const data: any = await fetchGroups(param);
        setGroups(data);
        setUsers(['admin', 'test']);
    }

    useMount(() => {
        loadGroups(query);
    });

    // useEffect(() => {
    //     onSubmit();
    // }, [query]);

    // const getRoles = async () => {
    //     const res: any = await fetchRoles();
    //     setRoles(res);
    // };

    // const onTableChange: any = (
    //     pagination: { current: number; pageSize: number },
    //     filters: any,
    //     sorter: { field: string; order: string },
    // ) => {
    //     // pageSize 修改后,未生效
    //     const _query = _.cloneDeep(query);
    //     _query.current = pagination.current;
    //     _query.pageSize = pagination.pageSize;
    //     if (!_.isEmpty(sorter)) {
    //       _query.field = sorter.field;
    //       _query.order = sorter.order;
    //     }
    //     setQuery(_query);
    // };

    // const onDeleteUsers = async (ids: string[]) => {
    //     Modal.confirm({
    //       title: 'Confirm',
    //       content: 'Do you really want to delete?',
    //       onOk: async () => {
    //         await delUsers(ids);
    //         setSelectedRowKeys([]);
    //         onSubmit();
    //       },
    //     });
    // };

    // const onCreateUser = () => {
    //     setUser(null);
    //     dispatch({ type: 'system_user/userModalVisible', payload: true });
    // };

    const onFinish = (values: any) => {
        loadGroups({
            ...query,
            ...values,
            current: 1
        });
    };

    // const onRefresh = () => {
    //     setQuery(_.cloneDeep(initQuery));
    //     setSelectedRowKeys([]);
    //     form.setFieldsValue(initQuery);
    // };

    // const onSubmit = () => {
    //     getUsers(query);
    // };

    // const onChangeStatus = async (user: User, checked: boolean) => {
    //     await modUser({ ...user, status: checked ? 0 : 1 });
    //     onSubmit();
    // };


    // createTm: "2020-10-30 15:15:03"
    // createdBy: {id: "9999", createTm: null, updateTm: "2020-12-01 14:29:55", remark: null, userName: "admin",…}
    // groupName: "ShaoXing"
    // id: "1322074521147244544"
    // items: [{id: "1322078840546361344", createdBy: null, updatedBy: null, createTm: null, updateTm: null,…}]
    // remark: null
    // updateTm: "2020-10-30 15:32:13"
    // updatedBy: {id: "9999", createTm: null,

    const columns: any[] = [
        {
            title: 'Group Name',
            dataIndex: 'groupName',
            sorter: true,
            width: '10%'
        },
        {
            title: 'Proudect Id & Step Id',
            sorter: true,
            width: '40%',
            render: (text: string, record: any) => {
                return record.items.map((item: any, index: number) => {
                    return <span>{
                        index === 0 ? '' : ','
                    }
                        {
                            item.productId
                        }_{
                            item.stepId
                        }</span>
                })
            }
        },
        {
            title: 'Created By',
            sorter: true,
            width: '10%',
            render: (text: string, record: any) => record.createdBy.nickName
        },
        {
            title: 'Create Time',
            dataIndex: 'createTm',
            align: 'center',
            sorter: true,
            width: '10%'
        }, {
            title: 'Updated By',
            sorter: true,
            width: '10%',
            render: (text: string, record: any) => record.updatedBy.nickName
        }, {
            title: 'Update Time',
            dataIndex: 'updateTm',
            align: 'center',
            sorter: true,
            width: '10%'
        }, {
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
                    <Button size="small" title="Password" type="primary" shape="circle"
                        icon={<LockOutlined />}
                    // onClick={() => {
                    //   setUser(record);
                    //   dispatch({
                    //     type: 'system_user/passwordModalVisible',
                    //     payload: true,
                    //   });
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

    // const rowSelection: any = {
    // selectedRowKeys,
    // type: 'checkbox',
    // onChange: (selectedRowKeys: []) => setSelectedRowKeys(selectedRowKeys),
    // };

    // const pagination: any = {
    // ...TABLE_PAGE_CONFIG,
    // current: query.current,
    // pageSize: query.pageSize,
    // total,
    // };

    return (
        <StyleContent>
            <StyleToolbar>
                <StyleFunctional>
                    <Button size="small" type="text"
                        title={
                            DICT.table.create
                        }
                        icon={<PlusCircleOutlined />}
                    // onClick={onCreateUser}
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
                    initialValues={initQuery}
                    onFinish={onFinish}>
                    <Form.Item name="status">
                        <Select placeholder="-请选择-"
                            style={
                                { width: 110 }
                            }>
                            {
                                users.map((user: any, index: any) => (
                                    <Select.Option value={user}>
                                        {user}</Select.Option>
                                ))
                            } </Select>
                    </Form.Item>
                    <Form.Item name="keywords">
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
            /> {/* {passwordModalVisible ? <PasswordModal user={user} /> : null} */}
            {/* {userModalVisible ? <UserModal user={user} roles={roles} reload={onSubmit} /> : null} */} </StyleContent>
    );
};

export default PracticeGroup4444;
