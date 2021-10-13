import { useState } from "react";

import { Checkbox } from "./styles";

interface ColumnProps {
  columnId: string;
  isCheckboxSelected: boolean;
  isCheckboxDisabled: boolean;
  hasSwitch: boolean;
  isSwitchSelected: boolean;
  background: string;
}

export interface FuncionalitiesListProps {
  id: string;
  description: string;
  name?: string;
  columns: Array<ColumnProps>;
}

export interface CheckboxPostProps {
  planId: string;
  funcionalityId: string;
  roleType?: string;
}
export interface RowProps {
  isCheckboxSelected: boolean;
  isCheckboxDisabled: boolean;
  planId: string;
  roleType?: string;
  funcionalityId: string;
  handleCheckBoxChange(data: CheckboxPostProps): void;
}

const FuncionalitiesList: React.FC<RowProps> = ({
  isCheckboxSelected,
  isCheckboxDisabled,
  planId,
  roleType,
  funcionalityId,
  handleCheckBoxChange,
}) => {
  const [isSelected, setIsSelected] = useState(isCheckboxSelected);

  return (
    <Checkbox
      color="primary"
      checked={isSelected}
      disabled={isCheckboxDisabled}
      onChange={() => {
        setIsSelected(!isSelected);
        handleCheckBoxChange({
          planId: String(planId),
          funcionalityId,
          roleType,
        });
      }}
    />
  );
};

export default FuncionalitiesList;
