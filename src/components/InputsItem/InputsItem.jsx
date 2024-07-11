import React from "react";

const InputsItem = ({
  label,
  type,
  value,
  onChange,
  min,
  max,
  disabled,
  placeholder,
  error,
}) => {
  return (
    <div className="">
      {label && (
        <label className="text-sm block mb-2" htmlFor="">
          {label}
        </label>
      )}
      <input
        className={`block mb-3 border p-2 transition  hover:border-indigo-400 disabled:hover:border-gray-400 rounded ring-0 w-full text-sm focus:outline-1 focus:outline-indigo-400 focus:outline-none focus:ring-0 focus:-outline-offset-0 ${
          error ? "outline outline-red-600" : ""
        }`}
        type={type}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        disabled={disabled}
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputsItem;
