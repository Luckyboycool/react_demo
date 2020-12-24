import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PRODUCT_MODULE_PAGE } from '@/utils/router';
import { StyleModuleContainer, StyleModule } from '../style';

import { CloudOutlined } from '@ant-design/icons';

interface SystemPage {
  key: string;
  title: string;
  icon: any;
  component: any;
}

const Product = ({ productKey, ignored }: { productKey: string; ignored?: string[] }) => {
  const dispatch = useDispatch();
  const global = useSelector((state: any) => state.global);
  const { tabs }: { tabs: any[] } = global;

  const product = PRODUCT_MODULE_PAGE.filter((product: any) => product.key === productKey)[0];
  function getPages(product: any) {
    const modules = product ? product.modules : [];
    let pages: any[] = [];
    for (const m of modules) {
      if (m.component) {
        pages.push({ ...m, key: `/${m.key}` });
      } else {
        for (const p of m.pages) {
          pages.push({ ...p, key: `/${m.key}/${p.key}` });
        }
      }
    }
    return pages;
  }
  const pages = getPages(product);

  const openNewPage = (p: SystemPage) => {
    // 判断是否已经存在该页面，若已经存在，直接切换至该页面。
    // todo 部分系统 相同页面 允许打开多次，需生成唯一Key，且页面中相关dom的ID 不能重复。
    // console.log('openNewPage', tabs.map(t => t.key), p.key)
    if (!tabs.map(t => t.key).includes(p.key)) {
      dispatch({
        type: 'global/tabs',
        payload: [...tabs, p],
      });
    }
    dispatch({ type: 'global/activeKey', payload: p.key });
  };

  return (
    <StyleModuleContainer>
      <ul>
        {pages.map(p => (
          <li key={p.title}>
            <StyleModule onClick={() => openNewPage(p)}>
              {p.icon || <CloudOutlined />}
              <h3>{p.title}</h3>
            </StyleModule>
          </li>
        ))}
      </ul>
    </StyleModuleContainer>
  );
};

export default Product;
