import React from 'react';
import styled from 'styled-components';
import Icon from 'components/Icon';
import { colors } from 'styles/theme';

const Footer = () => {
  return (
    <StyledFooter>
      <a
        href="https://github.com/42Sunny/42noti_front/wiki/About"
        rel="noreferrer"
        target="_blank"
      >
        <Icon size={20} color={colors.lightgray} icon="github" />
      </a>
      <a href="https://github.com/srngch" rel="noreferrer" target="_blank">
        sarchoi
      </a>
      ∙
      <a href="https://github.com/dopamingo" rel="noreferrer" target="_blank">
        yunjung
      </a>
      ∙
      <a href="https://github.com/6mn12j" rel="noreferrer" target="_blank">
        minjupar
      </a>
      <br />ⓒ 42NOTI
    </StyledFooter>
  );
};

export default React.memo(Footer);

const StyledFooter = styled.footer`
  height: 90px;
  padding: 16px 0 18px;
  font-size: 0.85rem;
  line-height: 1.3rem;
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
  svg {
    vertical-align: -24%;
  }
  svg:hover {
    fill: ${({ theme }) => theme.colors.blue};
  }
`;
