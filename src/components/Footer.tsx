import styled from 'styled-components';

const Footer = () => {
  return <StyledFooter>v.1 copyright 42</StyledFooter>;
};

export default Footer;

const StyledFooter = styled.footer`
  height: 52px;
  padding: 14px;
  font-size: 0.8rem;
  text-align: center;
  border-top: 1px solid var(--darksnow);
  color: var(--lightgray);
`;
