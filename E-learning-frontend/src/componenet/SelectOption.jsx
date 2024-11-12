import * as React from "react";

export default function BasicSelect({ options, title }) {
  const [selectedValue, setSelectedValue] = React.useState("");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div className="w-full max-w-xs mx-auto my-4">
      {/* Title with more margin for better spacing */}
      <select
        value={selectedValue}
        onChange={handleChange}
        className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500 py-2 px-4 text-lg"
      >
        <option value="" disabled>
          Select an option
        </option>
        {options?.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
