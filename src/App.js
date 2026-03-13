import { useState } from 'react';
import Button from './Components/Button';
import Calculator from './Components/Calculator';
import Input from './Components/Input';
import {
  BUTTONS,
  ERROR_DISPLAY,
  INITIAL_DISPLAY,
  PERCENTAGE_OPERATOR,
} from './constants/calculator';
import { Container } from './styles';
import {
  appendNumber,
  appendOperator,
  appendPercentage,
  evaluateExpression,
  isOperator,
  isPercentageOperator,
} from './utils/calculator';

const getButtonVariant = (button) => {
  if (button === 'C') {
    return 'danger';
  }

  if (isOperator(button) || isPercentageOperator(button) || button === '=') {
    return 'operator';
  }

  return 'default';
};

function App() {
  const [display, setDisplay] = useState(INITIAL_DISPLAY);

  const handleCalculate = () => {
    if (isOperator(display.slice(-1))) {
      return;
    }

    try {
      setDisplay(evaluateExpression(display));
    } catch (error) {
      setDisplay(ERROR_DISPLAY);
    }
  };

  const handleAction = (value) => {
    if (value === 'C') {
      setDisplay(INITIAL_DISPLAY);
      return;
    }

    if (value === '=') {
      handleCalculate();
      return;
    }

    if (value === PERCENTAGE_OPERATOR) {
      setDisplay((current) => appendPercentage(current));
      return;
    }

    if (isOperator(value)) {
      setDisplay((current) => appendOperator(current, value));
      return;
    }

    setDisplay((current) => appendNumber(current, value));
  };

  return (
    <Container>
      <Calculator>
        <Calculator.Header />
        <Input value={display} />
        <Calculator.Keyboard>
          {BUTTONS.map((button) => (
            <Button
              key={button}
              aria-label={`Botao ${button}`}
              variant={getButtonVariant(button)}
              span={button === '0' ? 2 : 1}
              onClick={() => handleAction(button)}
              type="button"
            >
              {button}
            </Button>
          ))}
        </Calculator.Keyboard>
      </Calculator>
    </Container>
  );
}

export default App;
