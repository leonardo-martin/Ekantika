import styled from "styled-components";
import Modal from "@material-ui/core/Modal";
import { ReactComponent as CloseIconSVG } from "../../assets/icons/close.svg";

export const Container = styled(Modal)`
  display: flex;
  position: relative;

  align-items: center;
  justify-content: center;
`;

export const ModalBackground = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;

  background: rgba(83, 85, 160, 0.45);
  backdrop-filter: blur(10px);
  opacity: 0.8;
`;

export const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CloseIcon = styled(CloseIconSVG)`
  width: 2.6rem;
  height: 2.6rem;
  margin-bottom: 0.3rem;
  margin-right: 0.3rem;
  cursor: pointer;

  align-self: flex-end;
  z-index: 30;
`;
