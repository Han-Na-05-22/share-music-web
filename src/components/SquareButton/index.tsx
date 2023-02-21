import { SquareButtonProps } from "./interface";
import { SquareButtonContainer } from "./style";

const SquareButton = ({
  className,
  disabled,
  active,
  children,
  onClick,
}: SquareButtonProps) => {
  return (
    <SquareButtonContainer
      className={className}
      onClick={onClick}
      disabled={disabled}
      active={active}
    >
      {children}
    </SquareButtonContainer>
  );
};
export default SquareButton;
