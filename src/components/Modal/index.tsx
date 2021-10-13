import React from "react";
import { Backdrop, Fade } from "@material-ui/core";
import { Container, CloseIcon, ModalWrapper, ModalBackground } from "./styles";
import Paper from "../Paper";

interface ModalProps {
  open: boolean;
  setOpen(isOpen: boolean): void;
  children: React.ReactNode;
  containerStyle?: object;
  paperStyle?: object;
}

const Modal: React.FC<ModalProps> = ({
  children,
  open,
  setOpen,
  containerStyle = {},
  paperStyle = {},
}) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container
      aria-labelledby="spring-modal-title"
      aria-describedby="spring-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      style={containerStyle}
    >
      <Fade in={open}>
        <>
          <ModalBackground />
          <ModalWrapper>
            <CloseIcon onClick={handleClose} />
            <Paper
              containerStyle={{
                position: "relative",
                overflow: "unset",
                ...paperStyle,
              }}
            >
              {children}
            </Paper>
          </ModalWrapper>
        </>
      </Fade>
    </Container>
  );
};

export default Modal;
