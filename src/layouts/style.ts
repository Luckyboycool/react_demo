import styled from 'styled-components';

export const StyleModuleContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  & > ul {
    list-style: none;
    width: 100%;
    margin: 0;
    padding: 0px;
  }
  li {
    width: calc(25% - 8px);
    height: 150px;
    margin: 4px;
    float: left;
  }
`;

export const StyleModule = styled.div`
  text-align: center;
  width: 100%;
  font-size: 16px;
  height: 100%;
  background-color: #f2f5f8;
  border-radius: 2px;
  padding: 25px 0 0;
  &:hover {
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.3);
    cursor: pointer;
  }
  .anticon {
    margin: 0 auto 20px;
    font-size: 60px;
    color: #1890ff;
  }
`;
