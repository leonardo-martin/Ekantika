import styled, { css } from "styled-components";
import { shade } from "polished";
import { ListItemIcon as MUIListItemIcon, ListItem } from "@material-ui/core";

interface ItemProps {
  active?: string;
}

interface CurveProps {
  active: string;
}

export const Container = styled.div`
  position: relative;
  z-index: 1;

  svg {
    path {
      stroke: #4f6872;
      transition: stroke 0.3s;
    }
  }

  span {
    transition: color 0.3s;
    font-size: 1.4rem;
  }
`;

export const Item = styled(ListItem)<ItemProps>`
  transition: background 0.3s;

  border-top-right-radius: 40px;
  border-bottom-right-radius: 40px;

  & + div {
    margin-top: 0.6rem;
  }

  ${({ active }) =>
    active === "true"
      ? css`
          background: #6e54ff;

          svg {
            path {
              stroke: #fff;
            }
          }

          span {
            color: #fff;
          }
        `
      : css`
          width: 220px;
          background: none;
        `}

  &:hover {
    svg {
      path {
        stroke: ${({ active }) => (active === "true" ? "#fff" : "#6E54FF")};
      }
    }

    span {
      color: ${({ active }) => (active === "true" ? "#fff" : "#6E54FF")};
    }

    background: ${({ active }) =>
      active === "true" ? shade(0.3, "#6E54FF") : ""};

    .curve {
      background: ${({ active }) =>
        active === "true" ? shade(0.3, "#6E54FF") : ""};
    }
  }
`;

export const ListItemIcon = styled(MUIListItemIcon)`
  display: inline-flex;
  min-width: 56px;
  flex-shrink: 0;

  svg {
    width: 2.6rem;
    height: 2.4rem;
  }
`;

// export const CustomDiv = styled.div`
//   display: block;
//   width: 40px;
//   height: 40px;
//   background: #000;
//   border-radius: 50%;
//   position: absolute;
//   right: -20px;
//   top: 0;
// `;

export const TopCurve = styled.div<CurveProps>`
  ${({ active }) =>
    active === "true" &&
    css`
      width: 0.6rem;
      height: 0.6rem;
      background: #6e54ff;
      position: absolute;
      top: -0.6rem;
      left: 0;
      transition: background 0.3s;
      z-index: 1;

      ::before {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        right: 0;
        border-bottom-left-radius: 10px;
        background: #fff;
        z-index: 2;
      }
    `}
`;

export const BottomCurve = styled.div<CurveProps>`
  ${({ active }) =>
    active === "true" &&
    css`
      width: 0.6rem;
      height: 0.6rem;
      background: #6e54ff;
      position: absolute;
      bottom: -0.6rem;
      left: 0;
      transition: background 0.3s;

      ::before {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        right: 0;
        border-top-left-radius: 10px;
        background: #fff;
      }
    `}
`;
