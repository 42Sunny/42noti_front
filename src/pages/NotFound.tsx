import styled from 'styled-components';
import Header from 'components/Header';
import Footer from 'components/Footer';

const NotFound = () => {
  return (
    <>
      <Header />
      <StyledSection>
        <h1>Not Found</h1>
      </StyledSection>
      <Footer />
    </>
  );
};

export default NotFound;

export const StyledSection = styled.section`
  display: flex;
  flex: 1 1 0;
  align-items: center;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.snow};
  padding: 68px 18px 18px 18px;
  text-align: left;
`;
