import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../assets/42-logo-white.png';
import cluster from '../assets/seoul-cluster.jpg';

const Login = () => {
  return (
    <>
      <Main>
        <img src={logo} />
        <h1>42 MEETUP</h1>
        <p>
          지금 42 SEOUL에서<br />
          무슨 일이 일어나고 있을까요?
        </p>
        <Link to="/">
          <Button>로그인하고 둘러보기</Button>
        </Link>
      </Main>
    </>
  );
};

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100vh;
  padding: 32px;
  background: center / cover no-repeat
      linear-gradient(rgba(10, 10, 10, 0.96), rgba(10, 10, 10, 0.7)),
    url(${cluster});
  color: var(--white);
  font-size: 1rem;
  h1 {
    font-size: 1.8rem;
    font-weight: 700;
    margin-bottom: 12px;
  }
  p {
    font-size: 1.1rem;
    line-height: 1.8rem;
    margin-bottom: 26px;
  }
  img {
    position: fixed;
    top: 32px;
    width: 20%;
    max-width: 60px;
    opacity: 0.4;
  }
`;

const Button = styled.button`
  width: 100%;
  max-width: 320px;
  height: 48px;
  margin: 0 auto;
  border-radius: 4px;
  background-color: var(--blue);
  color: var(--white);
  font-size: 1rem;
  font-weight: 700;
  border: 0;
  cursor: pointer;
`;

export default Login;
