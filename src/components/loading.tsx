import React from 'react';
import styled, { keyframes } from 'styled-components';

const StyledLoader = styled.div`
  display: block;
  background-color: rgba(255, 255, 255, 0.2);
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 10000;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 1;
  text-align: center;
`;

const Wrapper = styled.div`
  width: 200px;
  height: 100px;
  display: inline-flex;
  flex-direction: column;
  justify-content: space-around;
`;

const spinner = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`;

const Inner = styled.div`
  width: 48px;
  height: 48px;
  margin: 0 auto;
  text-indent: -12345px;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  border-right: 1px solid rgba(0, 0, 0, 0.08);
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  border-left: 1px solid rgba(0, 0, 0, 0.7);
  border-radius: 50%;
  z-index: 100001;
  animation: ${spinner} 600ms infinite linear;
`;

const Text = styled.div`
  width: 200px;
  height: 20px;
  text-align: center;
  font-size: 12px;
  letter-spacing: 4px;
  color: #000;
  margin-top: 10px;
`;

const Loading = () => {
  return (
    <StyledLoader>
      <Wrapper>
        <Inner />
        <Text>LOADING</Text>
      </Wrapper>
    </StyledLoader>
  );
};

export default Loading;
