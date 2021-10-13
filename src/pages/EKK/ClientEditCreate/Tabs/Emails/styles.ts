import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding: 2.4rem;
`;

export const PaperTitle = styled.div`
  font-weight: 300;
  font-size: 1.8rem;

  color: #324147;
`;

export const FilesContainer = styled.div`
  display: flex;
  align-items: center;

  @media only screen and (max-width: 1920px) {
    flex-direction: column;

    div {
      width: 100%;
    }
  }
`;

export const EmailFileContainer = styled.div`
  width: 50%;
  margin-right: 4.4rem;

  @media only screen and (max-width: 1920px) {
    margin-right: 0;
    margin-bottom: 2rem;
  }
`;

export const ForgotPasswordFileContainer = styled.div`
  width: 50%;
  margin-left: 4.4rem;

  @media only screen and (max-width: 1920px) {
    margin-left: 0;
  }
`;

export const Title = styled.div`
  color: #6e54ff;
  font-weight: bold;
  font-size: 1.8rem;
  text-transform: uppercase;
  margin-bottom: 2rem;
`;

export const AlertDiv = styled.div`
  margin: 2rem 0;

  svg {
    height: 35px;
    width: 35px;
  }

  p {
    font-size: 1.5rem;
    line-height: 1.6rem;
    margin-left: 1rem;
    flex: 1;
    color: #4f6872;
  }
`;

export const SubComponentContainer = styled.div``;

export const ImagesSubTitle = styled.div`
  font-size: 1.5rem;
  color: #324147;
  margin-bottom: 2rem;
`;

export const ImagesContainer = styled.div`
  display: flex;
  align-items: center;

  @media only screen and (max-width: 1920px) {
    flex-direction: column;

    div {
      width: 100%;
    }
  }
`;

export const TopContainer = styled.div`
  width: 50%;
  margin-right: 4.4rem;

  @media only screen and (max-width: 1920px) {
    margin-right: 0;
    margin-bottom: 2rem;
  }
`;

export const SubTitle = styled.div`
  font-weight: bold;
  font-size: 1.5rem;
  color: #324147;
  margin-bottom: 2rem;
`;

export const FooterContainer = styled.div`
  width: 50%;
  margin-left: 4.4rem;

  @media only screen and (max-width: 1920px) {
    margin-left: 0;
  }
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

export const ImagesContainerAlertDiv = styled.div`
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
