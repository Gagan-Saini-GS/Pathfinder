import React from "react";

const Select = ({
  options,
  selectedValue,
  className,
  handleChange,
  placeholder,
}) => {
  return (
    <select
      className={className}
      value={selectedValue}
      onChange={(e) => {
        handleChange(e);
      }}
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {options?.map((option) => {
        return (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        );
      })}
    </select>
  );
};

export default Select;
