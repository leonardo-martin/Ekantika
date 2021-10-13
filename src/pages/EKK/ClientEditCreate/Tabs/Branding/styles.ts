import styled from "styled-components";
import { Form as UnformForm } from "@unform/web";

import { ReactComponent as AlertIconSVG } from "../../../../../assets/icons/alert.svg";

export const Container = styled.div`
  width: 60%;
  margin-right: auto;
  padding: 2.4rem;
`;

export const Title = styled.h1`
  color: #6e54ff;
  font-weight: 700;
  font-size: 2rem;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
`;

export const SubTitle = styled.p`
  color: #324147;
  font-size: 1.5rem;
  margin-bottom: 2rem;
`;

export const DominioEkantika = styled.p`
  color: #6e54ff;
  font-weight: 900;
  font-size: 1.8rem;
  margin: 0 2rem;
`;

export const UrlForm = styled(UnformForm)`
  display: flex;
  align-items: center;
`;

export const SubComponentContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const LogoTipoContainer = styled.div`
  display: flex;
  align-items: center;

  @media only screen and (max-width: 1920px) {
    flex-direction: column;

    div {
      width: 100%;
    }
  }
`;

export const TopBarContainer = styled.div`
  width: 50%;
  margin-right: 4.4rem;

  @media only screen and (max-width: 1920px) {
    margin-right: 0;
    margin-bottom: 2rem;
  }
`;

export const LoginPageContainer = styled.div`
  width: 50%;
  margin-left: 4.4rem;

  @media only screen and (max-width: 1920px) {
    margin-left: 0;
  }
`;

export const PaperMainDiv = styled.div`
  width: 100%;
  padding-bottom: 1rem;
`;

export const ImageContainer = styled.div`
  width: 13rem;
  height: 18rem;

  max-height: 13rem;
  max-width: 13rem;

  min-height: 13rem;
  min-width: 13rem;

  background: #f2f3f5;
  border: 1px solid #ddd7e6;
  display: flex;
  align-items: center;
  border-radius: 10px;
  justify-content: center;
  margin-right: 2rem;
  overflow: hidden;

  img {
    object-fit: contain;
  }
`;

export const FormContainer = styled.div`
  height: fit-content;
  display: flex;
  align-items: flex-end;
  flex: 1;
`;

export const AlertDiv = styled.div`
  display: flex;
  align-items: center;

  margin-bottom: 2rem;

  svg {
    height: 35px;
    width: 35px;
  }

  p {
    color: #4f6872;
    font-size: 1.5rem;
    line-height: 1.6rem;
    margin-left: 1rem;
    flex: 1;
  }
`;

export const AlertIcon = styled(AlertIconSVG)`
  svg {
    height: 20px;
    width: 20px;
  }
`;

export const ColorsContainer = styled.div`
  display: flex;
`;

export const PrimaryColorDiv = styled.div`
  display: flex;
  align-items: center;
  margin-right: 2rem;
`;

export const SecundaryColorDiv = styled.div`
  display: flex;
  align-items: center;
`;

export const ColorTitle = styled.h2`
  color: #6e54ff;
  font-size: 1.6rem;
  margin-bottom: 1rem;
  font-weight: bold;
`;

export const ColorSubTitle = styled.h3`
  color: #4f6872;
  font-size: 1.2rem;
  margin-bottom: 2rem;
`;

export const ShowPrimaryColor = styled.div`
  width: 18rem;
  height: 10rem;

  background: #f2f3f5;
  border-radius: 10px;
  margin-right: 2rem;
  border: 1px solid #ddd7e5;
`;

export const ShowSecundaryColor = styled.div`
  width: 18rem;
  height: 10rem;

  background: #f2f3f5;
  border-radius: 10px;
  margin-right: 2rem;
  border: 1px solid #ddd7e5;
`;

export const PreviewTitle = styled.h2`
  color: #324147;
  font-size: 1.5rem;
  margin-top 1rem;
  font-weight: bold;
`;
