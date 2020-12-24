import logo from '@/assets/images/asmclogo.png';
import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { Modal, Transfer, Tree } from 'antd';

const UploadFile = (ele: any) => {
  const { closeUploadModal, onOk } = ele;

  const isChecked = (selectedKeys: any, eventKey: any) => selectedKeys.indexOf(eventKey) !== -1;
  const generateTree = (treeNodes: any = [], checkedKeys: any = []) =>
    treeNodes.map(({ children, ...props }) => ({
      ...props,
      disabled: checkedKeys.includes(props.key),
      children: generateTree(children, checkedKeys),
    }));
  const filterOption = (inputValue: any, option: any) => {
    console.log(option.title.indexOf(inputValue) > -1);
    return option.title.indexOf(inputValue) > -1;
  };
  const sureSelectPeople = (value: any) => {
    onOk(targetKeys);
  };
  const treeData = [
    { key: '0-0', title: '王五' },
    // {
    //   key: '0-1',
    //   title: '0-1',
    //   children: [
    //     { key: '0-1-0', title: '0-1-0' },
    //     { key: '0-1-1', title: '0-1-1' },
    //   ],
    // },
    { key: '0-1', title: '张三' },
    { key: '0-2', title: '李四' },
    { key: '0-3', title: '陈狗' },
    { key: '0-4', title: '麻子' },
  ];
  const [targetKeys, setTargetKeys] = useState([]);
  const onSelectChange = (keys: any, targetSelectedKeys: any) => {
    console.log(keys, targetSelectedKeys);
    setTargetKeys(keys);
  };
  const handleSearch = (dir: any, value: any) => {
    const newDeptList = treeData.filter(item => item.title.indexOf(value) > -1);
    console.log('search:', dir, value);
  };
  const TreeTransfer = ({ dataSource, targetKeys, ...restProps }: { dataSource: any; targetKeys: any }) => {
    const transferDataSource: any = [];
    function flatten(list = []) {
      list.forEach((item: any) => {
        transferDataSource.push(item);
        flatten(item.children);
      });
    }
    flatten(dataSource);

    return (
      <Transfer
        {...restProps}
        className="tree-transfer"
        dataSource={transferDataSource}
        titles={['未选人员', '已选人员']}
        showSearch
        targetKeys={targetKeys}
        onChange={onSelectChange}
        render={(item: any) => item.title}
        locale={{ itemUnit: '人', itemsUnit: '人' }}
      >
        {({ direction, onItemSelect, selectedKeys }: { direction: any; onItemSelect: any; selectedKeys: any }) => {
          if (direction === 'left') {
            const checkedKeys = [...selectedKeys, ...targetKeys];
            return (
              <Tree
                blockNode
                checkable
                checkStrictly
                defaultExpandAll
                checkedKeys={checkedKeys}
                treeData={generateTree(dataSource, targetKeys)}
                onCheck={(_, { node: { key } }) => {
                  onItemSelect(key, !isChecked(checkedKeys, key));
                }}
                onSelect={(_, { node: { key } }) => {
                  onItemSelect(key, !isChecked(checkedKeys, key));
                }}
              />
            );
          }
        }}
      </Transfer>
    );
  };

  return (
    <Modal visible={true} title="人员选择" onCancel={closeUploadModal} onOk={sureSelectPeople}>
      <TreeTransfer dataSource={treeData} targetKeys={targetKeys} />
    </Modal>
  );
};

export default UploadFile;
