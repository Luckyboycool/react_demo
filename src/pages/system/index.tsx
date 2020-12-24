import React from 'react';
import { useDispatch } from 'react-redux';
import { useMount } from '@umijs/hooks';
import Tabs from '@/components/tabs';
import Product from '@/layouts/component/product';

const System = () => {
  const dispatch = useDispatch();

  const homePage = {
    key: '/system',
    title: 'System',
    component: <Product productKey="system" />,
  };

  useMount(() => {
    // const defaultTabPane: { key: string; title: string; component: any } | null = generateSystemTabs('system', '');
    // dispatch({ type: 'global/tabs', payload: defaultTabPane ? [defaultTabPane] : [] });
    // dispatch({ type: 'global/activeKey', payload: defaultTabPane ? defaultTabPane.key : '' });
    dispatch({ type: 'global/tabs', payload: [homePage] });
    dispatch({ type: 'global/activeKey', payload: '/system' });
  });

  return <Tabs />;
};

export default System;
