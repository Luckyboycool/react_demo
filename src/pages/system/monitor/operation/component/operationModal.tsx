import React, { useState } from 'react';
import { Input, Form, Modal, Tree, message, Select, Row, Col } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { StyleOperRow, StyleOperHr } from '../style';
import { Operation } from '../model';

const OperationModal = ({ operLog }: { operLog: Operation }) => {
  const dispatch = useDispatch();

  const onCancel = () => {
    dispatch({ type: 'system_operation/operationModalVisible', payload: false });
  };

  const { operName, requestMethod, operIp, operLocation, method, operUrl, status, operParam } = operLog;

  return (
    <Modal width={800} footer={null} getContainer={false} title="详情" visible={true} onCancel={onCancel}>
      <StyleOperRow>
        <Col span={3}>操作模块:</Col>
        <Col span={9}>{operName}</Col>
        <Col span={3}>请求方式:</Col>
        <Col span={9}>{requestMethod}</Col>
      </StyleOperRow>
      <StyleOperRow>
        <Col span={3}>登录信息:</Col>
        <Col span={21}>
          {operName} | {operIp} | {operLocation}
        </Col>
      </StyleOperRow>
      <StyleOperRow>
        <Col span={3}>操作方法:</Col>
        <Col span={21}>{method}</Col>
      </StyleOperRow>
      <StyleOperRow>
        <Col span={3}>请求地址:</Col>
        <Col span={21}>{operUrl}</Col>
      </StyleOperRow>
      <StyleOperRow>
        <Col span={3}>请求状态:</Col>
        <Col span={21}>{status === 0 ? '成功' : '失败'}</Col>
      </StyleOperRow>
      <StyleOperHr />
      <Input.TextArea rows={12} readOnly defaultValue={operParam} />
    </Modal>
  );
};

export default OperationModal;
