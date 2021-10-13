import { shade } from "polished";
import styled from "styled-components";
import { ReactComponent as GoBackIconSVG } from "../../../assets/icons/go-back.svg";
import { ReactComponent as CameraIconSVG } from "../../../assets/icons/camera.svg";

export const Container = styled.div`
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding: 3.2rem 2.4rem;

  max-width: 1920px !important;
`;

export const GobackDiv = styled.div`
  display: flex;
  align-items: center;
`;

export const UserImg = styled.img`
  width: 100%;
  height: 100%;
  position: relative;

  max-height: 23rem;
  max-width: 23rem;

  margin 0 auto;
  padding: 0.8rem;
  border: 1px solid #DDD7E6;

  border-radius: 50%;

  display: flex;
  align-items: center;

  object-fit: contain;

  &::before {
      content: "";
      position: absolute;
      bottom: 0;
      right: 0;
      left: 0;
      width: 
  }
`;

export const DropdownItem = styled.button`
  font-size: 1.3rem;
  padding: 1.6rem 0;
  width: 100%;
  background: none;
  border: none;
  transition: background 0.3s;
  border-radius: 5px;

  color: #4f6872;

  &:hover {
    background: rgba(0, 0, 0, 0.04);
  }
`;

export const GoBackIcon = styled(GoBackIconSVG)`
  background: #fff;
  border-radius: 50%;
  width: 2.8rem;
  height: 2.8rem;
  padding: 0.6rem;
  margin-bottom: 2rem;

  transition: background 0.3s;

  cursor: pointer;

  margin-right: 0.8rem;

  &:hover {
    background: ${shade(0.1, "#fff")};
  }
`;

export const CameraIcon = styled(CameraIconSVG)`
  background: #fff;
  border-radius: 50%;
  width: 100%;
  height: 100%;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  padding: 0.3rem;
  z-index: 20;
  position: absolute;

  transition: background 0.3s;
  box-shadow: 0px 0px 16px rgba(163, 163, 163, 0.15);

  cursor: pointer;

  &:hover {
    background: ${shade(0.1, "#fff")};
  }
`;

export const CameraBtn = styled.button`
  border-radius: 50%;
  width: 4rem;
  height: 4rem;
  margin: -25px auto 0;
  border: none;
  position: relative;

  cursor: pointer;
`;

export const ModalContainer = styled.div``;

export const ModalTitle = styled.h2`
  font-weight: bold;
  font-size: 1.8rem;
  text-transform: uppercase;

  color: #6e54ff;

  margin-bottom: 2rem;
`;

export const ModalDescription = styled.p`
  margin: 1rem 0 2.5rem;

  font-size: 1.5rem;
  color: #4f6872;
`;
