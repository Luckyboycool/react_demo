import React, { useState } from 'react';
import { Breadcrumb, Menu } from 'antd';
import Cookies from 'js-cookie';
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { history } from 'umi';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { useMount } from '@umijs/hooks';
import {
  StyleHeader,
  StyleLogo,
  StyleContainer,
  StyleSidebar,
  StyleHome,
  StyleBreadcrumb,
} from '@/assets/styles/component';
import Loading from '@/components/loading';
import DICT from '@/utils/dictionary';
import { PRODUCT_MODULE_PAGE } from '@/utils/router';
import Account from './component/account';
import Notice from './component/notice';

interface SystemModule {
  key: string;
  title: string;
  icon?: any;
  component?: any;
  pages?: SystemPage[];
}
interface SystemPage {
  key: string;
  title: string;
  icon?: any;
  component: any;
}

const Layout = ({ children }: { children: any }) => {
  const dispatch = useDispatch();
  const global = useSelector((state: any) => state.global);
  const { loading, tabs, activeKey }: { loading: boolean; tabs: any[]; activeKey: string } = global;
  const pathname = history.location.pathname;
  const [theme, setTheme] = useState<any>({});

  useMount(async () => {
    const local = localStorage.getItem('AIYEI_SYSTEM_CONFIG');
    if (local) setTheme(JSON.parse(local));
    console.log('global header mounted', pathname);
    if (pathname !== '/login') {
      if (!Cookies.get('AI_YEI_TOKEN')) {
        history.replace('/login');
        return;
      }
      // console.log('有token, 自动登录中...');
      dispatch({ type: 'global/getUser' });
    }
  });

  function onChangeTheme(type: string) {
    const temp = _.cloneDeep(theme);
    temp[type] = !temp[type];
    setTheme(temp);
    localStorage.setItem('AIYEI_SYSTEM_CONFIG', JSON.stringify(temp));
  }

  const product = PRODUCT_MODULE_PAGE.filter(p => `/${p.key}` === pathname);
  let modules: any[] = product[0] ? product[0].modules : [];

  const openNewPage = (m: SystemModule, p?: SystemPage, e?: any) => {
    if (!p && !m.component) return;
    if (e) e.stopPropagation();
    let newPage = null;
    if (p) {
      newPage = { ...p, key: `/${m.key}/${p.key}` };
    } else {
      newPage = { ...m, key: `/${m.key}` };
    }
    // 判断是否已经存在该页面，若已经存在，直接切换至该页面。
    // todo 部分系统 相同页面 允许打开多次，需生成唯一Key，且页面中相关dom的ID 不能重复。
    if (!tabs.map(t => t.key).includes(newPage.key)) {
      dispatch({
        type: 'global/tabs',
        payload: [...tabs, newPage],
      });
    }
    dispatch({ type: 'global/activeKey', payload: newPage.key });
  };

  const isLogin = pathname !== '/login';

  const breadcrumb = [];
  if (pathname !== '/' && activeKey !== '') {
    const [, module, page] = activeKey.split('/');
    const currentModule: {
      title: string;
      pages?: SystemPage[];
    } = modules.filter((m: { key: string }) => m.key === module)[0];
    if (currentModule) {
      breadcrumb.push(currentModule.title);
      if (page && currentModule.pages) {
        const currentPage = currentModule.pages.filter(p => p.key === page)[0];
        currentPage && breadcrumb.push(currentPage.title);
      }
    }
  }

  const className = [];
  if (!isLogin) className.push('without-header');
  if (['/login', '/'].includes(pathname)) className.push('without-menu');
  else if (theme.menu) className.push('fold');
  const containerClass: string = className.join(' ');

  return (
    <>
      {isLogin ? (
        <StyleHeader>
          <StyleLogo />
          <>
            <Link to="">
              <StyleHome>{DICT.global.title}</StyleHome>
            </Link>
            <StyleBreadcrumb separator=">">
              <Breadcrumb.Item>
                <Link to="/">{DICT.global.home}</Link>
              </Breadcrumb.Item>
              {product[0] ? (
                <>
                  <Breadcrumb.Item
                    onClick={() => dispatch({ type: 'global/activeKey', payload: `/${product[0].key}` })}
                  >
                    <span className={breadcrumb[0] ? 'hover' : ''}>{product[0].title}</span>
                  </Breadcrumb.Item>
                  {breadcrumb[0] ? <Breadcrumb.Item>{breadcrumb[0]}</Breadcrumb.Item> : null}
                  {breadcrumb[1] ? <Breadcrumb.Item>{breadcrumb[1]}</Breadcrumb.Item> : null}
                </>
              ) : null}
            </StyleBreadcrumb>
            <Account />
            <Notice />
          </>
        </StyleHeader>
      ) : null}
      <StyleContainer className={containerClass}>
        {!['/login', '/'].includes(pathname) ? (
          <>
            <StyleSidebar className={theme.menu ? 'fold' : ''}>
              <Menu
                defaultOpenKeys={!theme.menu && modules.length > 0 ? [modules[0].key] : []}
                selectedKeys={[]}
                mode="inline"
                triggerSubMenuAction="hover"
                inlineCollapsed={theme.menu}
              >
                {modules.map(m => {
                  return m.pages ? (
                    <Menu.SubMenu key={m.key} icon={m.icon} title={m.title}>
                      {m.pages.map((p: any) => (
                        <Menu.Item key={p.key} icon={p.icon} onClick={() => openNewPage(m, p)}>
                          {p.title}
                        </Menu.Item>
                      ))}
                    </Menu.SubMenu>
                  ) : (
                    <Menu.Item key={m.key} icon={m.icon} title={m.title} onClick={() => openNewPage(m)}>
                      {m.title}
                    </Menu.Item>
                  );
                })}
              </Menu>
              {theme.menu ? (
                <MenuUnfoldOutlined className="menu-fold" onClick={() => onChangeTheme('menu')} />
              ) : (
                <MenuFoldOutlined className="menu-fold" onClick={() => onChangeTheme('menu')} />
              )}
            </StyleSidebar>
          </>
        ) : null}
        {children}
      </StyleContainer>
      {loading ? <Loading /> : null}
    </>
  );
};

export default Layout;
