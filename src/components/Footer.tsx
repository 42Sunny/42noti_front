import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  return (
    <StyledFooter>
      <a href="https://github.com/srngch" rel="noreferrer" target="_blank">
        sarchoi
      </a>
      ∙
      <a href="https://github.com/6mn12j" rel="noreferrer" target="_blank">
        minjupar
      </a>
      ∙
      <a href="https://github.com/dopamingo" rel="noreferrer" target="_blank">
        yunjung
      </a>
      <br /> ⓒ 42NOTI
    </StyledFooter>
  );
};

export default React.memo(Footer);

const StyledFooter = styled.footer`
  height: 64px;
  padding: 14px;
  font-size: 0.8rem;
  line-height: 1.1rem;
  text-align: center;
  border-top: 1px solid ${({ theme }) => theme.colors.darksnow};
  color: ${({ theme }) => theme.colors.lightgray};
  background: ${({ theme }) => theme.colors.snow};
  a {
    margin: 0 4px;
    color: ${({ theme }) => theme.colors.lightgray};
  }
  a:hover {
    color: ${({ theme }) => theme.colors.blue};
  }
`;
