import { StyledButton } from './styles';

function Button({ children, variant = 'default', span = 1, ...props }) {
  return (
    <StyledButton $span={span} $variant={variant} {...props}>
      {children}
    </StyledButton>
  );
}

export default Button;
