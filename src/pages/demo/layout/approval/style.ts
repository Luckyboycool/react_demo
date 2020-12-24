import { Form } from 'antd';
import styled from 'styled-components';

export const StyleTableBox = styled.div`
  .no-body {
    tbody {
      display: none !important;
    }
  }
  .title {
    color: #3f7fbf;
    height: 39px;
    line-height: 39px;
    padding-left: 15px;
    font-weight: 700;
    border-bottom: 1px solid #f0f0f0;
  }
  .no-thead {
    thead {
      display: none !important;
    }
  }
`;
