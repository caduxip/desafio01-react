import {
  applyLogarithm,
  appendNumber,
  appendOperator,
  appendPercentage,
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

  it('appends percentage only once to the current number', () => {
    expect(appendPercentage('50')).toBe('50%');
    expect(appendPercentage('50%')).toBe('50%');
    expect(appendPercentage('12+')).toBe('12+');
  });

  it('evaluates expressions respecting operator precedence', () => {
    expect(evaluateExpression('10+2x3')).toBe('16');
    expect(evaluateExpression('20/5+1')).toBe('5');
    expect(evaluateExpression('50%')).toBe('0.5');
    expect(evaluateExpression('200+10%')).toBe('220');
    expect(evaluateExpression('200-10%')).toBe('180');
    expect(evaluateExpression('200x10%')).toBe('20');
    expect(evaluateExpression('200/10%')).toBe('2000');
  });

  it('applies base-10 logarithm to the resolved display value', () => {
    expect(applyLogarithm('100')).toBe('2');
    expect(applyLogarithm('10+90')).toBe('2');
    expect(applyLogarithm('50%')).toBe(String(Math.log10(0.5)));
  });

  it('throws for invalid logarithm inputs', () => {
    expect(() => applyLogarithm('0')).toThrow('Invalid logarithm input');
    expect(() => applyLogarithm('50-100')).toThrow('Invalid logarithm input');
  });

  it('throws when the expression result is not finite', () => {
    expect(() => evaluateExpression('10/0')).toThrow('Invalid expression result');
  });
});
