import styled, { keyframes } from 'styled-components';
import { Button, Breadcrumb, Tabs, Modal } from 'antd';
import Logo from '@/assets/images/logo_blue.png';

const THEME = {
  BLUE: '#48a5dc',
  NAV: {
    BG: '#fff',
    BORDER: '1px solid #e8e8e8',
    HOVER_BG: '#e8f4fe',
    HOVER_COLOR: '#48a5dc',
  },
};

// CSS 动画
export const SidebarCollapse = keyframes`
from {
  width: 200px;
}
to {
  width: 40px;
}
`;

export const SidebarExpansion = keyframes`
  from {
    width: 40px;
  }
  to {
    width: 200px;
  }
`;

export const StyleHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 0;
  background-color: #fff;
  box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.04);
`;

export const StyleLogo = styled.div`
  float: left;
  width: 40px;
  height: 40px;
  font-family: 'TrajanPro-Bold', 'TrajanPro';
  background: url(${Logo}) 0 center no-repeat;
  background-size: 30px auto;
  background-position: 5px center;
  color: ${THEME.BLUE};
  user-select: none;
`;

export const StyleHome = styled.div`
  float: left;
  width: 120px;
  height: 32px;
  line-height: 32px;
  margin: 4px 20px;
  text-align: center;
  border-radius: 16px;
  padding: 0 24px;
  font-size: 16px;
  color: #444;
  font-weight: bold;
  &:hover {
    color: #fff;
    background-color: ${THEME.BLUE};
    // opacity: .7;
  }
`;

export const StyleBreadcrumb = styled(Breadcrumb)`
  &.ant-breadcrumb {
    float: left;
    line-height: 20px;
    margin: 10px 0;
  }
`;

export const StyleContainer = styled.div`
  width: calc(100vw - 200px);
  height: calc(100vh - 40px);
  overflow-x: hidden;
  overflow-y: auto;
  background-color: #f2f5f8;
  margin-top: 40px;
  margin-left: 200px;
  padding: 4px;
  &.without-header {
    height: 100vh;
    margin-top: 0;
  }
  &.without-menu {
    width: 100%;
    margin-left: 0;
    background-color: #fff;
    padding: 0;
  }
  &.fold {
    width: calc(100vw - 40px);
    margin-left: 40px;
  }
`;

export const StyleSidebar = styled.div`
  position: fixed;
  z-index: 999;
  left: 0;
  top: 40px;
  background-color: ${THEME.NAV.BG};
  width: 40px;
  height: calc(100vh - 40px);
  overflow-x: hidden;
  overflow-y: hidden;
  width: 200px;
  .ant-menu-inline {
    height: calc(100% - 40px);
    overflow-y: auto;
    overflow-x: hidden;
  }
  &.fold {
    width: 40px;
  }
  .menu-fold {
    position: absolute;
    font-size: 14px;
    bottom: 13px;
    left: 13px;
  }
`;

// Accout
export const StyleUser = styled.div`
  width: 90px;
  float: right;
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  text-align: right;
  cursor: pointer;
  img {
    width: 34px;
    height: 28px;
    margin: 6px;
    padding-right: 6px;
  }
`;
export const StyleLayout = styled.div`
  width: 100%;
  height: 100%;
`;

export const StylePasswordModal = styled(Modal)``;

// Tabs
export const StyleTabs = styled(Tabs)`
  &.ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab {
    border-color: #ddd;
  }
  &.ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab-active {
    border-bottom: 1px solid #fff;
  }
`;

export const StyleTabPane = styled(Tabs.TabPane)`
  height: calc(100vh - 40px - 30px - 4px * 2);
  overflow: auto;
  padding: 4px;
  background-color: #fff;
  border: 1px solid #f0f0f0;
  border-top: none;
`;

// account
export const StyleAccountPopover = styled.div`
  user-select: none;
  min-width: 80px;
  margin: -12px -16px;
  background: #fff;
  .head {
    height: 40px;
    display: flex;
    align-items: center;
    padding: 6px;
    line-height: 24px;
    font-weight: bold;
    border-bottom: 1px solid #ddd;
    white-space: nowrap;
    img {
      width: 28px;
      height: 28px;
      margin-right: 10px;
    }
  }
  .body,
  .foot {
    margin: 0;
    font-size: 12px;
    li {
      padding: 0 10px;
      line-height: 30px;
      white-space: nowrap;
      &:hover {
        color: ${THEME.NAV.HOVER_COLOR};
        background-color: ${THEME.NAV.HOVER_BG};
        cursor: pointer;
      }
    }
  }
  .foot {
    border-top: 1px solid #ddd;
    text-align: center;
  }
`;

export const StyleNotice = styled.ul`
  display: flex;
  width: 300px;
  height: 40px;
  margin: 0;
  float: right;
  align-items: center;
  justify-content: flex-end;
  li {
    cursor: pointer;
    .item {
      min-width: 60px;
      height: 20px;
      text-align: center;
      font-size: 12px;
      font-weight: bold;
      line-height: 20px;
      &:hover {
        color: #1890ff;
      }
    }
  }
`;
