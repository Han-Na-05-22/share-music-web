import { ButtonProps } from "./interface";
import { ButtonContainer } from "./style";

const Button = ({
  children,
  className,
  height = "50px",
  width = "150px",
  disabled = false,
  onClick,
  fontSize = "24px",
  btnType = "none",
}: ButtonProps) => {
  return (
    <ButtonContainer
      className={className}
      height={height}
      width={width}
      disabled={disabled}
      onClick={onClick}
      fontSize={fontSize}
      btnType={btnType}
    >
      <span>{children}</span>
    </ButtonContainer>
  );
};

export default Button;
