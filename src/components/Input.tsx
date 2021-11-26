import styled from 'styled-components';

const StyledInput = styled.div`
  display: flex;
  height: 40px;
  max-width: 400px;
  margin: 16px 0 0 0;
  input {
    flex-basis: 65%;
    padding: 10px;
    border-radius: 10px 0 0 10px;
    border: 1px solid var(--darksnow);
  }
  button {
    flex-basis: 35%;
    border: 1px solid var(--darksnow);
    background: var(--darksnow);
    font-size: 0.9em;
    font-weight: 600;
    border-radius: 0 10px 10px 0;
  }
`;

const Input = () => {
  return (
    <>
      <StyledInput>
        <input type="text" placeholder="이메일 주소를 입력하세요"></input>
        <button>알림신청</button>
      </StyledInput>
    </>
  );
};

export default Input;
