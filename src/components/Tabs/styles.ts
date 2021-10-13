import styled from "styled-components";
import { Tab as MUITab, Tabs as MUITabs } from "@material-ui/core";

import SwipeableViews from "react-swipeable-views";

export const Container = styled.div``;

export const Tab = styled(MUITab)`
  background: transparent;
  border: none;
  position: relative;
  color: #4f6872;

  font-weight: 900;
  font-size: 1.25rem;

  &.Mui-selected {
    color: #6e54ff;
  }

  &::after {
    content: "";
    width: 100%;
    height: 1px;
    display: block;
    background: #ddd7e6;
    position: absolute;
    bottom: 3px;
  }
`;

export const CustomTabs = styled(MUITabs)`
  span.MuiTabs-indicator {
    background-color: #6e54ff;
    height: 6px;
    border-radius: 200px;
  }

  .MuiTabs-scroller {
    overflow-x: auto !important;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }

  .MuiTab-root {
    min-width: unset !important;

    @media only screen and (max-width: 1520px) {
      span.MuiTab-wrapper {
        font-size: 1.15rem;
      }
    }

    @media only screen and (max-width: 1370px) {
      span.MuiTab-wrapper {
        font-size: 1.1rem;
      }
    }
  }

  @media only screen and (max-width: 768px) {
    .MuiTab-root {
      min-width: 60px !important;
    }
  }

  .MuiTabs-scroller::-webkit-scrollbar {
    display: none;
  }
`;

export const SwipeableView = styled(SwipeableViews)`
  div[data-swipeable="true"] {
    overflow: unset !important;
  }

  overflow-x: clip !important;
`;
