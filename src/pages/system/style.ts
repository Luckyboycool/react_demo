import { Form } from 'antd';
import styled from 'styled-components';

export const StyleContent = styled.div`
  flex: 1;
  height: 100%;
  box-sizing: border-box;
  background-color: #fff;
`;

export const StyleToolbar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 4px;
`;

export const StyleFunctional = styled.div`
  button + button {
    margin-left: 4px;
  }
`;

export const StyleFilter = styled(Form)`
  &.ant-form-inline .ant-form-item {
    margin-right: 4px;
    &:last-child {
      margin-right: 0;
    }
  }
`;
