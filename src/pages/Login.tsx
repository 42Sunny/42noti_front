import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserDispatch, useUserState } from '../contexts/UserContext';
import styled from 'styled-components';
import logo from '../assets/42-logo-white.png';
import cluster from '../assets/seoul-cluster.jpg';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useUserDispatch();
  const state = useUserState();

  useEffect(() => {
    if (document.cookie) {
      navigate('/');
      dispatch({ type: 'SET_LOGIN' });
    }
    console.log(state);
  }, [navigate, dispatch, state]);

  const handleLogin = () => {
    window.location.href = 'http://api.event.42cadet.kr/login/42';
  };

  return (
    <StyledMain>
      <img src={logo} alt="logo" />
      <h1>42 EVENT</h1>
      <p>
        지금 42 SEOUL에서
        <br />
        무슨 일이 일어나고 있을까요?
      </p>
      <Button onClick={handleLogin}>로그인하고 둘러보기</Button>
    </StyledMain>
  );
};

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100vh;
  padding: 10%;
  background: linear-gradient(rgba(10, 10, 10, 0.96), rgba(10, 10, 10, 0.7)),
    url(${cluster}) no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  color: var(--white);
  font-size: 1rem;
  h1 {
    font-size: 1.8rem;
    font-weight: 700;
    margin-bottom: 12px;
  }
  p {
    font-size: 1.05rem;
    line-height: 1.7rem;
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
  max-width: 330px;
  height: 50px;
  border-radius: 6px;
  background-color: var(--blue);
  color: var(--white);
  font-size: 1.05rem;
  font-weight: 700;
  border: 0;
  cursor: pointer;
`;

export default Login;
