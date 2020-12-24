import React from 'react';
import { Drawer } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { StyleNotice } from '@/assets/styles/component';
import DICT from '@/utils/dictionary';

const GlobalDrawer = (props: any) => {
  const { children, title = '', width = 400 } = props;
  const dispatch = useDispatch();
  const global = useSelector((state: any) => state.global);
  const { drawerVisible }: { drawerVisible: boolean } = global;

  const onClose = () => {
    dispatch({ type: 'global/drawerVisible', payload: false });
  };

  return (
    <Drawer placement="right" title={title} width={width} visible={drawerVisible} closable={false} onClose={onClose}>
      {children}
    </Drawer>
  );
};

export default GlobalDrawer;
