import React from 'react';
import { useDispatch } from 'react-redux';
import { useMount } from '@umijs/hooks';
import Tabs from '@/components/tabs';
import Product from '@/layouts/component/product';
import { generateSystemTabs } from '@/utils/web';

const Demo = () => {
  const dispatch = useDispatch();

  const homePage = {
    key: '/demo',
    title: 'Demo',
    component: <Product productKey="demo" />,
  };

  useMount(() => {
    const defaultTabPane: { key: string; title: string; component: any } | null = generateSystemTabs(
      'demo',
      'practice_group'
    );
    const tabs = [homePage];
    let activeKey = '/demo';
    if (defaultTabPane) {
      tabs.push(defaultTabPane);
      activeKey = defaultTabPane.key;
    }
    console.log('activeKey', defaultTabPane, activeKey);
    dispatch({ type: 'global/tabs', payload: tabs });
    dispatch({ type: 'global/activeKey', payload: activeKey });
  });

  return <Tabs />;
};

export default Demo;
