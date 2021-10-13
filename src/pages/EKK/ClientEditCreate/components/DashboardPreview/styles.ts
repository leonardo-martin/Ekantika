import styled from "styled-components";
import { ReactComponent as BellNotify } from "../../../../../assets/icons/bell-notify.svg";
import { ReactComponent as ArrowDown } from "../../../../../assets/icons/arrow-down.svg";

export const Container = styled.div`
  width: 100%;
  overflow: hidden;
  height: 100%;

  background: #f2f3f5;
  border-radius: 10px;
  margin-top: 1rem;
  border: 0.5px solid #ddd7e5;

  @media only screen and (max-width: 1920px) {
    height: 30rem;
  }
`;

export const BellNotifyIcon = styled(BellNotify)`
  margin-right: 1rem;
  width: 1.3rem;
  height: 1.3rem;
`;

export const TopBar = styled.div`
  width: 100%;
  height: 10%;
  background: #000;
  display: flex;
  padding: 0.4rem 3rem 0.4rem 0.8rem;
  justify-content: space-between;
`;

export const LogoImg = styled.img`
  max-height: 2.8rem;
  object-fit: cover;
`;

export const Dropdown = styled.div`
  width: 7.5rem;
  height: 95%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.2rem;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);

  img {
    width: 1.2rem;
    height: 1.2rem;
  }

  p {
    color: #fff;
  }
`;

export const ArrowDownIcon = styled(ArrowDown)`
  width: 0.4rem;
  height: 0.4rem;
`;

export const SideBar = styled.div`
  width: 2.5rem;
  height: 100%;
  padding-top: 0.8rem;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 1.5rem;
  position: relative;

  svg {
    width: 1.5rem;
    height: 1.5rem;

    path {
      stroke: #4f6872;
    }
  }

  svg.active {
    position: relative;
    path {
      stroke: #fff;
    }
  }

  svg + svg {
    margin-top: 0.8rem;
  }
`;

export const ActiveIndicator = styled.div`
  background: #fff;
  width: 4rem;
  height: 2rem;
  margin-bottom: 0.8rem;

  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
`;

export const Main = styled.div`
  width: 100%;
  margin-right: 1.5rem;
`;

export const PageTitle = styled.div`
  margin: 1rem 0;
  display: flex;
  align-items: center;

  svg {
    width: 1.4rem;
    height: 1.4rem;
  }
`;

export const Title = styled.div`
  font-size: 1.4rem;
  margin-left: 0.6rem;

  @media only screen and (max-width: 1920px) {
    font-size: 1.6rem;
  }
`;

export const MainContent = styled.div`
  width: 100%;
`;

export const PaperTitle = styled.div`
  font-weight: bold;
  font-size: 0.8rem;
  margin-bottom: 1rem;

  @media only screen and (max-width: 1920px) {
    font-size: 1rem;
  }
`;

export const FlexDiv = styled.div`
  display: flex;
  align-items: center;
`;

export const PaperSubTitle = styled.div`
  font-weight: bold;
  font-size: 0.8rem;

  @media only screen and (max-width: 1920px) {
    font-size: 1rem;
  }
`;

export const PaperSpan = styled.div`
  font-size: 0.6rem;

  @media only screen and (max-width: 1920px) {
    font-size: 0.9rem;
  }
`;

export const TeamInitials = styled.p`
  font-size: 1rem;
  background: #f2f3f5;
  padding: 0.4rem;
  border-radius: 50%;

  @media only screen and (max-width: 1920px) {
    font-size: 1.2rem;
  }
`;

export const TeamName = styled.p`
  font-size: 0.8rem;

  @media only screen and (max-width: 1920px) {
    font-size: 1rem;
  }
`;

export const PaperHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

export const StatusDropdown = styled.div`
  border: 1px solid #ddd7e6;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
  width: 7.5rem;
  padding: 0 0.6rem;

  p {
    color: #4f6872;
    font-size: 0.7rem;
  }

  @media only screen and (max-width: 1920px) {
    p {
      font-size: 0.8rem;
      margin-right: 0.5rem;
    }

    width: 8.5rem;
  }

  path {
    stroke: #4f6872;
    fill: #4f6872;
  }
`;

export const Tabs = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid #ddd7e6;

  margin-bottom: 1rem;
`;

interface TabOneProps {
  secundaryColor: string;
}

export const TabOne = styled.div<TabOneProps>`
  margin-right: 0.6rem;
  position: relative;

  font-size: 0.8rem;
  padding: 0.3rem 0.5rem;

  font-weight: bold;

  ::before {
    content: "";
    position: absolute;
    bottom: -2.5px;
    display: block;
    width: 100%;
    height: 3px;
    left: 0;
    right: 0;
    background: ${({ secundaryColor }) => secundaryColor};
    border-radius: 30px;
  }

  @media only screen and (max-width: 1920px) {
    font-size: 1rem;
  }
`;

export const TabTwo = styled.div`
  font-size: 0.8rem;
  padding: 0.3rem 0.5rem;

  display: flex;
  align-items: center;

  @media only screen and (max-width: 1920px) {
    font-size: 1rem;
  }
`;

export const Notification = styled.div`
  width: 0.7rem;
  height: 0.7rem;
  padding: 0.6rem;
  background: #000;
  border-radius: 50%;
  margin-left: 0.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  p {
    color: #fff;
    font-size: 0.6rem;
  }
`;

export const TableHeadTitle = styled.div`
  font-size: 0.6rem;

  background: #f2f3f5;
  padding: 0.4rem 0rem;

  &.firstChild {
    border-bottom-left-radius: 7.5px;
    border-top-left-radius: 7.5px;
    padding-left: 0.7rem;
  }

  &.lastChild {
    border-bottom-right-radius: 7.5px;
    border-top-right-radius: 7.5px;
    padding-left: 0.5rem;
  }

  @media only screen and (max-width: 1920px) {
    font-size: 0.8rem;
  }
`;

export const TableNameField = styled.div`
  display: flex;
  align-items: center;

  img {
    border-radius: 50%;
    height: 1.2rem;
    width: 1.2rem;
    margin-right: 0.6rem;
  }

  p {
    font-size: 0.7rem;
  }

  & + div {
    margin-top: 0.8rem;
  }

  @media only screen and (max-width: 1920px) {
    p {
      font-size: 0.9rem;
    }
  }
`;

export const TableAnswerField = styled.div`
  display: flex;
  align-items: center;
  margin-left: 0.3rem;

  img {
    border-radius: 50%;
    height: 1.2rem;
    width: 1.2rem;
  }

  img + img {
    margin-left: -0.4rem;
  }

  & + div {
    margin-top: 0.8rem;
  }
`;

export const TableWaitingField = styled.div`
  display: flex;
  align-items: center;
  margin-left: 0.2rem;

  img {
    border-radius: 50%;
    height: 1.2rem;
    width: 1.2rem;
  }

  img + img {
    margin-left: -0.4rem;
  }

  & + div {
    margin-top: 0.8rem;
  }
`;

export const TableStatusField = styled.div`
  margin-left: 0.8rem;
  display: flex;
  align-items: center;

  p {
    font-size: 0.8rem;
  }

  & + div {
    margin-top: 0.8rem;
  }

  @media only screen and (max-width: 1920px) {
    p {
      font-size: 1rem;
    }
  }
`;

export const BottomContent = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border-top: 1px solid #ddd7e6;

  margin-top: 1rem;
`;

export const SeeAllBtn = styled.div`
  font-weight: bold;
  font-size: 0.7rem;
  margin-top: 0.6rem;
  margin-right: 0.2rem;

  @media only screen and (max-width: 1920px) {
    font-size: 0.9rem;
  }
`;
