import { LabelContainer, LabelContainerProps } from "./styles";

/** TODO: Maybe there'll be an icon in it */

export interface LabelProps extends LabelContainerProps {}

const Label: React.FC<LabelProps> = (props) => {
  const { colorScheme, children } = props;

  return <LabelContainer colorScheme={colorScheme}>{children}</LabelContainer>;
};

export default Label;
