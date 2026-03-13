import {
  ERROR_DISPLAY,
  INITIAL_DISPLAY,
  LOGARITHM_OPERATOR,
  OPERATORS,
  PERCENTAGE_OPERATOR,
} from '../constants/calculator';

const TOKEN_PATTERN = /(\d+\.?\d*|\.\d+|[+\-x/%])/g;
const NUMBER_SEGMENT_PATTERN = /[+\-x/]/;
const HIGH_PRIORITY_OPERATORS = new Set(['x', '/']);

const tokenizeExpression = (expression) => expression.match(TOKEN_PATTERN) || [];

const resolveOperation = (left, operator, right) => {
  switch (operator) {
    case '+':
      return left + right;
    case '-':
      return left - right;
    case 'x':
      return left * right;
    default:
      return left / right;
  }
};

export const isOperator = (value) => OPERATORS.includes(value);
export const isPercentageOperator = (value) => value === PERCENTAGE_OPERATOR;
export const isLogarithmOperator = (value) => value === LOGARITHM_OPERATOR;

const isNumericToken = (value) => value !== undefined && !Number.isNaN(Number(value));

const normalizePercentages = (tokens) => {
  const normalizedTokens = [];

  for (const token of tokens) {
    if (token !== PERCENTAGE_OPERATOR) {
      normalizedTokens.push(token);
      continue;
    }

    const currentValue = Number(normalizedTokens.pop());
    const previousOperator = normalizedTokens[normalizedTokens.length - 1];
    const baseValue = Number(normalizedTokens[normalizedTokens.length - 2]);

    if (
      (previousOperator === '+' || previousOperator === '-') &&
      isNumericToken(baseValue)
    ) {
      normalizedTokens.push(String((baseValue * currentValue) / 100));
      continue;
    }

    normalizedTokens.push(String(currentValue / 100));
  }

  return normalizedTokens;
};

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

export const appendPercentage = (currentValue) => {
  if (currentValue === ERROR_DISPLAY) {
    return INITIAL_DISPLAY;
  }

  const lastCharacter = currentValue.slice(-1);

  if (currentValue.includes(PERCENTAGE_OPERATOR) && !isOperator(lastCharacter)) {
    const segments = currentValue.split(NUMBER_SEGMENT_PATTERN);
    const lastSegment = segments[segments.length - 1];

    if (lastSegment.includes(PERCENTAGE_OPERATOR)) {
      return currentValue;
    }
  }

  if (isOperator(lastCharacter) || lastCharacter === PERCENTAGE_OPERATOR) {
    return currentValue;
  }

  return `${currentValue}${PERCENTAGE_OPERATOR}`;
};

export const evaluateExpression = (expression) => {
  const tokens = normalizePercentages(tokenizeExpression(expression));
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

export const applyLogarithm = (expression) => {
  const resolvedValue = Number(evaluateExpression(expression));

  if (resolvedValue <= 0) {
    throw new Error('Invalid logarithm input');
  }

  return String(Math.log10(resolvedValue));
};
