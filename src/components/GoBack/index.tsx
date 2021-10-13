import { useHistory } from "react-router-dom";

import { ReactComponent as GoBackIconSVG } from "../../assets/icons/go-back.svg";

import { GoBackButtonContainer } from "./styles";

const GoBackButton = () => {
  const { goBack } = useHistory();

  return (
    <GoBackButtonContainer
      onClick={goBack}
      title="Voltar para a página anterior"
    >
      <GoBackIconSVG />
    </GoBackButtonContainer>
  );
};

export { GoBackDiv } from "./styles";
export default GoBackButton;
