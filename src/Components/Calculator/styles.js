import styled from 'styled-components';

export const CalculatorCard = styled.section`
  width: min(100%, 420px);
  min-height: 350px;
  background: linear-gradient(180deg, #ffffff 0%, #f3f4f6 100%);
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.12);
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 480px) {
    min-height: 300px;
    padding: 20px;
  }
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Title = styled.h1`
  font-size: 1.75rem;
  line-height: 1.1;
  color: #111827;
`;

export const SubTitle = styled.p`
  font-size: 0.95rem;
  color: #6b7280;
`;

export const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
`;
