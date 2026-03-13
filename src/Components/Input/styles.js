import styled from 'styled-components';

export const DisplayField = styled.input`
  width: 100%;
  min-height: 88px;
  border: none;
  border-radius: 16px;
  padding: 18px;
  background: #111827;
  color: #f9fafb;
  font-size: clamp(2rem, 5vw, 2.8rem);
  text-align: right;
  outline: none;

  &::placeholder {
    color: #f9fafb;
  }
`;
