import { useState } from 'react';
import Button from './Components/Button';
import Calculator from './Components/Calculator';
import Input from './Components/Input';
import { Container } from './styles';

const operators = ['+', '-', 'x', '/', '%'];

const tokenizeExpression = (expression) =>
  expression.match(/(\d+\.?\d*|\.\d+|[+\-x/%])/g) || [];

const resolveOperation = (left, operator, right) => {
  if (operator === '+') {
    return left + right;
  }

  if (operator === '-') {
    return left - right;
  }

  if (operator === 'x') {
    return left * right;
  }

  if (operator === '%') {
    return left % right;
  }

  return left / right;
};

const calculateExpression = (expression) => {
  const tokens = tokenizeExpression(expression);
  const highPriority = [];

  for (let index = 0; index < tokens.length; index += 1) {
    const token = tokens[index];

    if (token === 'x' || token === '/' || token === '%') {
      const left = Number(highPriority.pop());
      const right = Number(tokens[index + 1]);
      const result = resolveOperation(left, token, right);

      highPriority.push(String(result));
      index += 1;
      continue;
    }

    highPriority.push(token);
  }

  let result = Number(highPriority[0]);

  for (let index = 1; index < highPriority.length; index += 2) {
    const operator = highPriority[index];
    const nextValue = Number(highPriority[index + 1]);

    result = resolveOperation(result, operator, nextValue);
  }

  return result;
};

function App() {
  const [display, setDisplay] = useState('0');

  const clearDisplay = () => {
    setDisplay('0');
  };

  const handleNumber = (value) => {
    setDisplay((current) => {
      if (current === '0' && value !== '.') {
        return value;
      }

      if (value === '.' && current.includes('.')) {
        return current;
      }

      const segments = current.split(/[+\-x/%]/);
      const lastSegment = segments[segments.length - 1];

      if (value === '.' && lastSegment.includes('.')) {
        return current;
      }

      return `${current}${value}`;
    });
  };

  const handleOperator = (operator) => {
    setDisplay((current) => {
      const lastChar = current.slice(-1);

      if (operators.includes(lastChar)) {
        return `${current.slice(0, -1)}${operator}`;
      }

      return `${current}${operator}`;
    });
  };

  const calculateResult = () => {
    if (operators.includes(display.slice(-1))) {
      return;
    }

    try {
      const result = calculateExpression(display);

      if (!Number.isFinite(result)) {
        setDisplay('Erro');
        return;
      }

      setDisplay(String(result));
    } catch (error) {
      setDisplay('Erro');
    }
  };

  const handleAction = (value) => {
    if (value === 'C') {
      clearDisplay();
      return;
    }

    if (value === '=') {
      calculateResult();
      return;
    }

    if (operators.includes(value)) {
      handleOperator(value);
      return;
    }

    if (display === 'Erro') {
      setDisplay(value === '.' ? '0.' : value);
      return;
    }

    handleNumber(value);
  };

  const buttons = [
    'C', '%', '/', 'x',
    '7', '8', '9', '-',
    '4', '5', '6', '+',
    '1', '2', '3', '=',
    '0',
    '.',
  ];

  return (
    <Container>
      <Calculator>
        <Calculator.Header />
        <Input value={display} />
        <Calculator.Keyboard>
          {buttons.map((button) => (
            <Button
              key={button}
              variant={
                button === 'C'
                  ? 'danger'
                  : operators.includes(button) || button === '='
                    ? 'operator'
                    : 'default'
              }
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
