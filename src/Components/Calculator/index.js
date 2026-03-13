import { ButtonGrid, CalculatorCard, Header, SubTitle, Title } from './styles';

function Calculator({ children }) {
  return <CalculatorCard>{children}</CalculatorCard>;
}

function CalculatorHeader() {
  return (
    <Header>
      <Title>Calculadora</Title>
      <SubTitle>Operacoes basicas em React</SubTitle>
    </Header>
  );
}

function CalculatorKeyboard({ children }) {
  return <ButtonGrid>{children}</ButtonGrid>;
}

Calculator.Header = CalculatorHeader;
Calculator.Keyboard = CalculatorKeyboard;

export default Calculator;
