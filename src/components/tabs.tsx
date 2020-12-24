import React, { useEffect } from 'react';
import _ from 'lodash';
// import Cookies from 'js-cookie';
// import { connect } from 'react-redux';
// import { history } from 'umi';
// import { useMount } from '@umijs/hooks';
// import { Popover, Avatar, message, Form, Input, Modal } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
// import { delay, getCookieDomain } from '@/utils/web';
import { StyleTabs, StyleTabPane } from '@/assets/styles/component';

const Tabs = () => {
  const dispatch = useDispatch();
  const global: any = useSelector((state: any) => state.global);
  const {
    tabs,
    activeKey,
    user,
    permissions,
  }: { tabs: any[]; activeKey: string; user: any; permissions: any[] } = global;

  // useMount(() => {
  //   const permTabs = TAB_MAP.filter(t => permissions.includes(t.path)
  //   dispatch({ type: 'global/tabs', payload: permTabs ));
  // });

  // useEffect(() => {
  //   let permPath = permissions.filter(p => p.split(':')[2] === 'view');
  //   permPath = permPath.map(p => {
  //     const arr = p.split(':');
  //     return `/${arr[0]}/${arr[1]}`;
  //   });
  //   let permTabs = TAB_MAP.filter(t => permPath.includes(t.path));
  //   const time = new Date().getTime();
  //   permTabs = permTabs.map(t => {
  //     return { ...t, key: `${t.path}|${time}` };
  //   });
  //   dispatch({ type: 'global/tabs', payload: permTabs });
  //   dispatch({ type: 'global/activeKey', payload: permTabs[0] ? permTabs[0].key : '' });
  // }, [permissions]);

  const onEdit = (
    targetKey: string | React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>,
    action: 'add' | 'remove',
  ): void => {
    if (action === 'add') return;
    if (activeKey === targetKey) {
      for (const i in tabs) {
        if (tabs[i].key === targetKey) {
          if (tabs.length > 1) {
            // 关闭第一个标签页，且后续还有其他标签，打开第二个标签
            dispatch({ type: 'global/activeKey', payload: parseInt(i) > 0 ? tabs[parseInt(i) - 1].key : tabs[1].key });
          } else {
            // todo 最后一个标签关闭 下标会变成-1
            dispatch({ type: 'global/activeKey', payload: parseInt(i) > 0 ? tabs[parseInt(i) - 1].key : '' });
          }
          break;
        }
      }
    }
    dispatch({
      type: 'global/tabs',
      payload: tabs.filter((p: { key: string }) => p.key !== targetKey),
    });
  };

  const FIX_TABS = ['/system', '/adc', '/msa', '/dms', '/demo'];

  return (
    <StyleTabs
      hideAdd
      type="editable-card"
      activeKey={activeKey}
      onChange={payload => dispatch({ type: 'global/activeKey', payload })}
      onEdit={onEdit}
    >
      {tabs.map((t: any) => (
        <StyleTabPane tab={t.title} key={t.key} closable={!FIX_TABS.includes(t.key)}>
          {t.component}
        </StyleTabPane>
      ))}
    </StyleTabs>
  );
};

export default Tabs;
