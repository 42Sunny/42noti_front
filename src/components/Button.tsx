import { MouseEventHandler } from 'react';
import styled from 'styled-components';

type ButtonProps = {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  title?: string;
  clicked?: boolean;
  disabled?: boolean;
};

const Button = ({ title, clicked, onClick, disabled }: ButtonProps) => {
  return (
    <CategoryButton clicked={clicked} onClick={onClick}>
      {title}
    </CategoryButton>
  );
};

const CategoryButton = styled.button<{ clicked: boolean | undefined }>`
  background: ${(props) => (props.clicked ? '#3EA2FF' : ' #e5e5e6')};
  color: ${(props) => (props.clicked ? '#FFFFFF' : '#000000')};
  display: inline-block;
  border-style: none;
  height: 32px;

  border-radius: 20px;

  font-weight: 500;
  margin: 0 10px 8px 0;
  padding: 6px 12px;
  &:hover {
    cursor: pointer;
  }
`;

export default Button;
