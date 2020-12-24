import React from 'react';
import { Button } from 'antd';
import styled, { keyframes } from 'styled-components';

const StyledModalFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ModalFooter = ({ children, onOk, onCancel, hideOk, hideCancel }: any) => {
  return (
    <StyledModalFooter>
      <div>{children}</div>
      <div>
        {!hideCancel ? <Button onClick={onCancel}>Cancel</Button> : null}
        {!hideOk ? (
          <Button onClick={onOk} type="primary">
            OK
          </Button>
        ) : null}
      </div>
    </StyledModalFooter>
  );
};

export default ModalFooter;
