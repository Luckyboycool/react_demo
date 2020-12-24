import styled from 'styled-components';
import { Row } from 'antd';

export const StyleOperRow = styled(Row)`
  min-height: 40px;
  line-height: 40px;
  .ant-col-3 {
    font-weight: bold;
  }
  .ant-col-21 {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const StyleOperHr = styled.hr`
  margin: 10px 0px 20px;
  border: none;
  border-top: 1px solid #ddd;
`;
