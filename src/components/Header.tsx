import React from 'react';
import styled from 'styled-components';
export const Header = () => {
  return <HeaderDiv>42 meetup</HeaderDiv>;
};

const HeaderDiv = styled.div`
  width: 100%;
  height: 52px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: rgb(87, 94, 100, 0.1);
  text-align: center;
  letter-spacing: -0.3px;
  font-weight: bold;
  font-size: 20px;
  line-height: 18px;
  color: #000000;
`;
