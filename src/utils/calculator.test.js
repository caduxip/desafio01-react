import {
  appendNumber,
  appendOperator,
  evaluateExpression,
} from './calculator';

describe('calculator utils', () => {
  it('prevents duplicate decimal separators in the same number', () => {
    expect(appendNumber('12.3', '.')).toBe('12.3');
    expect(appendNumber('12+3.4', '.')).toBe('12+3.4');
  });

  it('replaces the trailing operator when a new one is entered', () => {
    expect(appendOperator('12+', '-')).toBe('12-');
  });

  it('resets the error state when a new number is entered', () => {
    expect(appendNumber('Erro', '7')).toBe('7');
    expect(appendNumber('Erro', '.')).toBe('0.');
  });

  it('evaluates expressions respecting operator precedence', () => {
    expect(evaluateExpression('10+2x3')).toBe('16');
    expect(evaluateExpression('20/5+1')).toBe('5');
    expect(evaluateExpression('10%3+2')).toBe('3');
  });

  it('throws when the expression result is not finite', () => {
    expect(() => evaluateExpression('10/0')).toThrow('Invalid expression result');
  });
});
