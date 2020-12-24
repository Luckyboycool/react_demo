import React from 'react';
import { history } from 'umi';
import { Button } from 'antd';
import styled from 'styled-components';
import { PRODUCT_MODULE_PAGE } from '@/utils/router';

const StyleHome = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
`;

const StyleProduct = styled.ul`
  display: block;
  width: 1100px;
  height: 500px;
  margin-left: 130px;
  li {
    display: block;
    float: left;
    width: 200px;
    margin: 10px;
    height: 250px;
    border: 1px solid #ddd;
    font-size: 18px;
    text-align: center;
    position: relative;
    &:hover {
      cursor: pointer;
    }
    .banner {
      width: 100%;
      height: 110px;
      overflow: hidden;
      display: flex;
      align-items: center;
      img {
        width: 150%;
        margin-left: -25%;
      }
    }
    h4 {
      margin: 5px 0;
    }
    p {
      font-size: 12px;
      color: #888;
      text-align: justify;
      padding: 0 5px;
    }
    button {
      display: none;
    }
    &:hover button {
      display: block;
      position: absolute;
      border-radius: 0;
      width: calc(100% + 2px);
      left: -1px;
      bottom: -1px;
    }
    &.dev {
      color: #fd4f54;
      h4,
      p {
        color: #fd4f54;
      }
      img {
        opacity: 0.6;
      }
    }
  }
`;

const Home = () => {
  const goToSystem = (key: string) => {
    history.push(`/${key}`);
  };

  return (
    <StyleHome>
      <StyleProduct>
        {PRODUCT_MODULE_PAGE.map((p: any) => (
          <li key={p.key} onClick={() => goToSystem(p.key)}>
            <div className="banner">
              <img src={p.image} alt="" />
            </div>
            <h4>{p.title}</h4>
            <p>{p.desc}</p>
            <Button type="primary">立即使用</Button>
          </li>
        ))}
      </StyleProduct>
    </StyleHome>
  );
};

export default Home;
