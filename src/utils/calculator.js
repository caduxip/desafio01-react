import { ERROR_DISPLAY, INITIAL_DISPLAY, OPERATORS } from '../constants/calculator';

const TOKEN_PATTERN = /(\d+\.?\d*|\.\d+|[+\-x/%])/g;
const NUMBER_SEGMENT_PATTERN = /[+\-x/%]/;
const HIGH_PRIORITY_OPERATORS = new Set(['x', '/', '%']);

const tokenizeExpression = (expression) => expression.match(TOKEN_PATTERN) || [];

const resolveOperation = (left, operator, right) => {
  switch (operator) {
    case '+':
      return left + right;
    case '-':
      return left - right;
    case 'x':
      return left * right;
    case '%':
      return left % right;
    default:
      return left / right;
  }
};

export const isOperator = (value) => OPERATORS.includes(value);

export const appendNumber = (currentValue, nextValue) => {
  if (currentValue === ERROR_DISPLAY) {
    return nextValue === '.' ? '0.' : nextValue;
  }

  if (currentValue === INITIAL_DISPLAY && nextValue !== '.') {
    return nextValue;
  }

  const segments = currentValue.split(NUMBER_SEGMENT_PATTERN);
  const lastSegment = segments[segments.length - 1];

  if (nextValue === '.' && lastSegment.includes('.')) {
    return currentValue;
  }

  return `${currentValue}${nextValue}`;
};

export const appendOperator = (currentValue, nextOperator) => {
  if (currentValue === ERROR_DISPLAY) {
    return INITIAL_DISPLAY;
  }

  const lastCharacter = currentValue.slice(-1);

  if (isOperator(lastCharacter)) {
    return `${currentValue.slice(0, -1)}${nextOperator}`;
  }

  return `${currentValue}${nextOperator}`;
};

export const evaluateExpression = (expression) => {
  const tokens = tokenizeExpression(expression);
  const highPriorityTokens = [];

  for (let index = 0; index < tokens.length; index += 1) {
    const token = tokens[index];

    if (HIGH_PRIORITY_OPERATORS.has(token)) {
      const left = Number(highPriorityTokens.pop());
      const right = Number(tokens[index + 1]);
      const result = resolveOperation(left, token, right);

      highPriorityTokens.push(String(result));
      index += 1;
      continue;
    }

    highPriorityTokens.push(token);
  }

  let result = Number(highPriorityTokens[0]);

  for (let index = 1; index < highPriorityTokens.length; index += 2) {
    const operator = highPriorityTokens[index];
    const nextValue = Number(highPriorityTokens[index + 1]);

    result = resolveOperation(result, operator, nextValue);
  }

  if (!Number.isFinite(result)) {
    throw new Error('Invalid expression result');
  }

  return String(result);
};
