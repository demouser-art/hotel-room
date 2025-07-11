import React from 'react';
import { Spin } from 'antd';
import styled from 'styled-components';

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Loader = () => {
  return (
    <LoaderWrapper>
      <Spin size="large" />
    </LoaderWrapper>
  );
};

export default Loader;