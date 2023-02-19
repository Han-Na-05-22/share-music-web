import { SquareButtonProps } from "./interface";
import { SquareButtonContainer } from "./style";

const SquareButton = ({
  className,
  disabled,
  active,
  onClick,
}: SquareButtonProps) => {
  return (
    <SquareButtonContainer
      className={className}
      onClick={onClick}
      disabled={disabled}
      active={active}
    ></SquareButtonContainer>
  );
};
export default SquareButton;
