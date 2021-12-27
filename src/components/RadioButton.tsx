import React from 'react';
import { ChangeEventHandler } from 'react';
import styled from 'styled-components';

type ButtonProps = {
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
  label?: string;
  checked?: boolean;
};

const RadioButton = ({ label, checked, onChange }: ButtonProps) => {
  return (
    <StyledRadioButton checked={checked}>
      <input type="radio" checked={checked} onChange={onChange} />
      {label}
    </StyledRadioButton>
  );
};

const StyledRadioButton = styled.label<{ checked: boolean | undefined }>`
  background: ${(props) => (props.checked ? '#3EA2FF' : ' #e5e5e6')};
  color: ${(props) => (props.checked ? '#FFFFFF' : '#000000')};
  display: inline-block;
  border-style: none;
  height: 32px;

  border-radius: 20px;

  font-weight: 500;
  margin: 0 10px 8px 0;
  padding: 6px 12px;
  input {
    display: none;
  }
  &:hover {
    cursor: pointer;
  }
`;

export default React.memo(RadioButton);
