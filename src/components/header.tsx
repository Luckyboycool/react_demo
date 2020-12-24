import React from 'react';
import logo from '@/assets/images/asmclogo.png';
import styled, { keyframes } from 'styled-components';
import { Col, Row } from 'antd';
export const StyleHeader = styled.div`
  width: 1018px;
  margin: 0 auto;
  margin-bottom: 5px;
  margin-top: 5px;
  border: 1px solid #ddd;
  padding: 8px;
  height: 94px;
  overflow-y: auto;
  .color {
    color: #3f7fbf;
  }
  .apply-theme {
    margin-top: 5px;
    width: 500px;
    margin-left: 20px;
  }
  .apply-info {
    float: right;
    width: 300px;
  }
  img {
    width: 45px;
    margin-left: 20px;
    float: left;
    margin-right: 60px;
  }
`;

export const StyleHeaderTitle = styled.div`
  margin: 0 300px 0 40px;
  font-size: 28px;
  font-weight: 700;
`;

const Header = (ele: any) => {
  const { title, form } = ele;
  return (
    <StyleHeader>
      <img src={logo} alt="" />
      <div className="apply-info">
        <Row>
          <Col span={8}>
            <span className="color">申请编号</span>
          </Col>
          <Col span={16}>{form.applyCode}</Col>
        </Row>
        <Row>
          <Col span={8}>
            <span className="color">申请日期</span>
          </Col>
          <Col span={16}>{form.applyTime}</Col>
        </Row>
        <Row>
          <Col span={8}>
            <span className="color">起草人</span>
          </Col>
          <Col span={16}>{form.draftsman}</Col>
        </Row>
      </div>
      <StyleHeaderTitle>{title}</StyleHeaderTitle>
      <div className="apply-theme">
        <Row>
          <Col span={8}>
            <span className="color">主题</span>
          </Col>
          <Col span={16}>{form.theme}</Col>
        </Row>
      </div>
    </StyleHeader>
  );
};

export default Header;
