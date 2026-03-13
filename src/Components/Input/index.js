import { DisplayField } from './styles';

function Input({ value }) {
  return <DisplayField readOnly type="text" value={value} aria-label="Visor da calculadora" />;
}

export default Input;
