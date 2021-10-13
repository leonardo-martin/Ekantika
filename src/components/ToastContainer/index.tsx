import React from "react";
import { useTransition } from "react-spring";

import Toast from "./Toast";
import { ToastMessage } from "../../contexts/ToastContext";
import { Container } from "./styles";

interface ToastContainerProps {
  messages: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  const messagesWithTransitions = useTransition(messages, {
    keys: (item) => item.id,
    from: { right: "-120%", opacity: 0.5 },
    enter: { right: "0%", opacity: 1 },
    leave: { right: "-120%", opacity: 0 },
  });

  return (
    <Container>
      {messagesWithTransitions((props, item) => (
        <Toast key={item.id} style={props} message={item} />
      ))}
    </Container>
  );
};

export default ToastContainer;
