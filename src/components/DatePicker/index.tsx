import { useState, useCallback } from "react";
import { DatePickerComponent, Container } from "./styles";

import { pt } from "date-fns/locale";
import { format } from "date-fns";

import "react-datepicker/dist/react-datepicker.css";

interface DatePickerProps {
  setDate(date: string | null): void;
  initialDate: Date | null;
  placeholder: string;
}

const DatePicker: React.FC<DatePickerProps> = ({
  setDate,
  placeholder,
  initialDate,
}) => {
  const [startDate, setStartDate] = useState<Date | null>(initialDate);

  const handleDateChange = useCallback(
    (date: Date) => {
      setStartDate(date);
      setDate(format(date, "yyyy-MM-dd").toString());
    },
    [setDate]
  );

  return (
    <Container>
      <DatePickerComponent
        selected={startDate}
        placeholderText={placeholder}
        dateFormat="dd/MM/yyyy"
        locale={pt}
        onChange={handleDateChange}
      />
    </Container>
  );
};

export default DatePicker;
