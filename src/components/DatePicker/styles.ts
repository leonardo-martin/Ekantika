import styled from "styled-components";

import DatePicker from "react-datepicker";

export const Container = styled.div`
  .react-datepicker {
    font-size: 1.2rem;
  }

  .react-datepicker__current-month {
    font-size: 1.3rem;
  }

  .react-datepicker__day-names {
    margin-top: 0.2rem;
  }

  .react-datepicker__month {
    margin: 0.8rem 0.6rem 0.6rem;
  }

  .react-datepicker__day,
  .react-datepicker__day-name {
    margin: 0.3rem;
  }

  .react-datepicker__day--selected,
  .react-datepicker__day--keyboard-selected {
    background-color: #6e54ff !important;
  }

  .react-datepicker__day--outside-month {
    color: transparent;
    background: transparent;
  }

  .react-datepicker__day--outside-month:hover {
    background: transparent;
  }
`;

export const DatePickerComponent = styled(DatePicker)`
  width: 100%;
  height: 100%;

  border-radius: 10px;
  border: 1px solid #ddd7e5;
  width: 100%;
  padding: 1.2rem;

  display: flex;
  align-items: center;

  & + div {
    margin-top: 1rem;
  }
`;
