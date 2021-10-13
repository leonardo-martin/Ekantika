import { useState, useMemo } from "react";

interface UseGlobalCheckboxProps {
  values: (number | string)[];
  defaultValues?: (number | string)[];
  /** In a search, for example, `values` prop might change over time and you may want to maintain the checked state from previous `values`.
   * @defaultOption `reset` clean all state.
   * @option `maintainPrevCheckedValues` clean just checked from the current `values`. WARNING: if you are dealing with deleting options while selection, you must use the returned `deleteValue`,
   * in order to avoid non-existing checked values.
   */
  globalUncheckMode?: "reset" | "maintainPrevCheckedValues";
}

export default function useGlobalCheckbox(props: UseGlobalCheckboxProps) {
  const [checkedValues, setCheckedValues] = useState<(number | string)[]>(
    props.defaultValues || []
  );

  function deleteValue(value: string | number) {
    setCheckedValues((checkedValues) =>
      checkedValues.filter((checkedValue) => checkedValue !== value)
    );
  }

  function handleCheck(newValue: string | number) {
    if (checkedValues.includes(newValue)) deleteValue(newValue);
    else setCheckedValues((checkedValues) => [...checkedValues, newValue]);
  }

  const isAllValuesChecked = useMemo(() => {
    return props.values.every((value) => checkedValues.includes(value));
  }, [props.values, checkedValues]);

  function handleGlobalCheck() {
    if (isAllValuesChecked) {
      setCheckedValues((checkedValues) => {
        switch (props.globalUncheckMode) {
          default:
          case "reset":
            return [];

          case "maintainPrevCheckedValues":
            return checkedValues.filter(
              (checkedValue) => !props.values.includes(checkedValue)
            );
        }
      });
    } else {
      setCheckedValues(
        (checkedValues) =>
          new Array(...new Set([...checkedValues, ...props.values]))
      );
    }
  }

  function isChecked(value: string | number) {
    return checkedValues.includes(value);
  }

  return {
    handleCheck,
    handleGlobalCheck,
    isChecked,
    deleteValue,
    isAllValuesChecked,
    checkedValues,
  };
}
