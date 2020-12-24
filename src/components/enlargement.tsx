import React from 'react';
import { Modal } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

const StyleModal = styled(Modal)`
  .ant-modal-body {
    padding: 2px;
    img {
      border-radius: 2px;
      width: 550px;
      height: 550px;
      display: block;
      user-select: none;
    }
  }
`;

const Enlargement = () => {
  const dispatch = useDispatch();
  const global = useSelector((state: any) => state.global);
  const { enlargement } = global;

  const close = () => {
    dispatch({
      type: 'global/enlargement',
      payload: null,
    });
  };

  return enlargement ? (
    <StyleModal
      zIndex={9999}
      visible={true}
      width={554}
      onOk={close}
      onCancel={close}
      footer={false}
    >
      <img src={enlargement} alt="" />
    </StyleModal>
  ) : null;
};

export default Enlargement;
