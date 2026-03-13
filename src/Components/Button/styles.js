import styled from 'styled-components';

export const StyledButton = styled.button`
  min-height: 64px;
  border: none;
  border-radius: 16px;
  grid-column: span ${({ $span }) => $span || 1};
  background: ${({ $variant }) => {
    if ($variant === 'operator') {
      return '#f59e0b';
    }

    if ($variant === 'danger') {
      return '#ef4444';
    }

    return '#ffffff';
  }};
  color: ${({ $variant }) => ($variant === 'default' ? '#111827' : '#ffffff')};
  font-size: 1.2rem;
  font-weight: 600;
  box-shadow: 0 10px 20px rgba(17, 24, 39, 0.08);
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 14px 24px rgba(17, 24, 39, 0.12);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 480px) {
    min-height: 58px;
  }
`;
