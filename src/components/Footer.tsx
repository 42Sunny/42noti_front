import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  return (
    <StyledFooter>
      sarchoi ∙ minjupar ∙ yunjung <br /> ⓒ 42 EVENT
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
`;
