import { Form } from 'antd';
import styled from 'styled-components';
import bg from '@/assets/images/bg-body.png';

export const StyleContent = styled.div`
  flex: 1;
  height: 100%;
  box-sizing: border-box;
  background-color: #fff;
  background: #ffffff url(${bg}) 0px -200px repeat-x;
`;

export const StyleToolbar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 8px;
`;

export const StyleFunctional = styled.div`
  button + button {
    margin-left: 8px;
  }
`;

export const StyleFilter = styled(Form)`
  &.ant-form-inline .ant-form-item {
    margin-right: 8px;
    &:last-child {
      margin-right: 0;
    }
  }
`;

// planform
export const StyleBody = styled.div`
  display: flex;
  height: calc(100vh - 40px - 8px - 30px - 16px - 40px);
  overflow-y: auto;
  .canvas {
    width: 1100px;
    height: 550px;
    border: 1px solid #ddd;
  }
`;

export const StyleSider = styled.div`
  flex: 1;
  margin-left: 8px;
  height: 100%;
  border: 1px solid #ddd;
  padding: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  table {
    tr td:first-child {
      font-weight: bold;
      width: 80px;
    }
    td {
      padding: 5px;
      font-size: 13px;
      line-height: 1.2;
    }
    &.info td {
      vertical-align: top;
    }
  }
`;

export const StyleMain = styled.div`
  width: 1018px;
  margin: 0 auto;
  border: 1px solid #ddd;
  padding: 8px;
  height: calc(100% - 160px);
  overflow-y: auto;
  .ant-form-item-label > label {
    color: #3f7fbf;
  }
  .ant-table-thead > tr > th,
  .ant-table-tbody > tr > td,
  .ant-table tfoot > tr > th,
  .ant-table tfoot > tr > td {
    padding: 8px;
  }
  .ant-collapse > .ant-collapse-item > .ant-collapse-header {
    padding: 4px 45px;
  }
  .ant-form-small .ant-form-item-label > label {
    height: 24px;
    line-height: 14px;
  }
`;
