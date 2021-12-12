import { useState } from 'react';
import styled from 'styled-components';
import React from 'react';

const SubmitInput = () => {
  const [email, setEmail] = useState<string | number | string[] | undefined>(
    '',
  );

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleClick = () => {
    alert(`${email} 알림 신청 완료`);
    setEmail('');
  };

  return (
    <StyledInput>
      <input
        type="text"
        placeholder="이메일 주소를 입력하세요"
        onChange={inputChange}
        value={email}
      />
      <button onClick={handleClick}>알림신청</button>
    </StyledInput>
  );
};

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

export default SubmitInput;
