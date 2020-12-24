import styled from 'styled-components';
// import { Form } from 'antd';

export const StyleLogin = styled.div`
  width: 1024px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
`;

export const StyleLoginSide = styled.div`
  width: 50%;
  height: 560px;
  background: linear-gradient(
      314deg,
      rgba(82, 114, 244, 1) 0%,
      rgba(0, 170, 231, 1) 100%
    )
    rgba(0, 170, 231, 0.65);
  background-color: rgba(0, 170, 231, 0.65);
  background-blend-mode: saturation;
  border-radius: 4px 0px 0px 4px;
  box-shadow: 0px 20px 40px 0px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  img {
    height: 100%;
    margin-left: -45%;
  }
`;

export const StyleLoginMain = styled.div`
  width: 50%;
  height: 560px;
  padding-left: 0;
  padding-right: 0;
  background: rgba(255, 255, 255, 1);
  border-radius: 0px 4px 4px 0px;
  box-shadow: 0px 20px 40px 0px rgba(0, 0, 0, 0.08);
  margin-left: auto;
  margin-right: auto;
  padding: 80px;
  h2 {
    width: 350px;
    text-align: center;
    color: rgba(0, 170, 231, 1);
    margin-bottom: 12px;
    font-size: 24px;
    & + p {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.45);
      text-align: center;
      font-weight: 400;
      margin-bottom: 80px;
    }
  }
  form {
    width: 350px;
    height: 300px;
  }
  .ant-input {
    height: 32px;
    font-size: 16px;
  }
  .ant-input-prefix {
    font-size: 20px;
  }
  .ant-form-item {
    margin-bottom: 0;
    height: 66px;
  }
  button {
    height: 42px;
    width: 100%;
    border: none;
    background: linear-gradient(
        270deg,
        rgba(82, 114, 244, 1) 0%,
        rgba(0, 170, 231, 1) 100%
      )
      rgba(0, 170, 231, 0.31);
    background-color: rgba(0, 170, 231, 0.31);
    &:hover,
    &:active,
    &:focus {
      background-color: #0577ea;
      border-color: #0577ea;
    }
  }
`;
