import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { Modal, Button, Table, Space, Badge } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { PlusCircleOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { StyleFunctional, StyleContent, StyleToolbar } from '@/pages/system/style';
import { TABLE_PAGE_CONFIG } from '@/utils/constant';
import DICT from '@/utils/dictionary';
// import { Dict } from '../model';
import useData from '../useData';
import DataModal from '../component/dataModal';

const DictTable = ({ dict }: { dict: any }) => {
  const dispatch = useDispatch();
  const system_dict = useSelector((state: any) => state.system_dict);
  const { dataModalVisible } = system_dict;

  const [data, { total, loadData, delData }] = useData();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const initQuery = { current: 1, pageSize: 20, field: '', order: '', dictType: dict.dictType || '' };
  const [query, setQuery] = useState(initQuery);
  const [selectData, setSelectData] = useState(null);

  const onCancel = () => {
    dispatch({ type: 'system_dict/dictTableVisible', payload: false });
  };

  useEffect(() => {
    onSubmit();
  }, [query]);

  const onSubmit = () => {
    loadData(query);
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

  const onCreateDict = () => {
    setSelectData(null);
    dispatch({ type: 'system_dict/dataModalVisible', payload: true });
  };

  const onDeleteData = async (ids: any[]) => {
    Modal.confirm({
      title: 'Confirm',
      content: 'Do you really want to delete?',
      onOk: async () => {
        await delData(ids);
        setSelectedRowKeys([]);
        onSubmit();
      },
    });
  };

  const columns: any = [
    {
      title: 'Dict Id',
      dataIndex: 'id',
      sorter: true,
      align: 'center',
      width: '10%',
    },
    {
      title: 'Dict Label',
      dataIndex: 'dictLabel',
      sorter: true,
      width: '15%',
    },
    {
      title: 'Dict Value',
      dataIndex: 'dictValue',
      sorter: true,
      width: '15%',
    },
    {
      title: 'Sort No',
      dataIndex: 'dictSort',
      align: 'center',
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
        parseInt(text) === 0 ? <Badge status="success" text="正常" /> : <Badge status="default" text="停用" />,
    },
    {
      title: DICT.table.create_at,
      dataIndex: 'createTm',
      align: 'center',
      sorter: true,
      width: '15%',
    },
    {
      title: 'Remark',
      dataIndex: 'remark',
      sorter: true,
      width: '10%',
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
              setSelectData(record);
              dispatch({ type: 'system_dict/dataModalVisible', payload: true });
            }}
          />
          <Button
            danger
            title="Delete"
            type="primary"
            size="small"
            shape="circle"
            icon={<DeleteOutlined />}
            onClick={() => onDeleteData([record.id])}
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
    <Modal getContainer={false} width={1200} title="Dict Data" footer={null} visible={true} onCancel={onCancel}>
      <StyleContent>
        <StyleToolbar>
          <StyleFunctional>
            <Button type="text" icon={<PlusCircleOutlined />} title={DICT.table.create} onClick={onCreateDict} />
            {selectedRowKeys.length > 0 && (
              <Button
                danger
                type="text"
                title={DICT.table.delete}
                icon={<DeleteOutlined />}
                onClick={() => onDeleteData(selectedRowKeys)}
              />
            )}
          </StyleFunctional>
        </StyleToolbar>
        <Table
          rowKey="id"
          size="small"
          showSorterTooltip={false}
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
          pagination={pagination}
          onChange={onTableChange}
        />
        {dataModalVisible ? <DataModal selectData={selectData} dictType={dict.dictType} reload={onSubmit} /> : null}
      </StyleContent>
    </Modal>
  );
};

export default DictTable;
