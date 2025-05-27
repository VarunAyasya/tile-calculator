import React from 'react';

function InputDropdown({ choices = [], value, onChange, className = '' }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)} // ✅ FIXED
        className={`appearance-none pr-6 focus:outline-none ${className}`}
      >
        <option value="">Choose</option>
        {choices.map((choice, idx) => (
          <option key={idx} value={choice}>
            {choice}
          </option>
        ))}
      </select>

      {/* Custom arrow */}
      <div className="pointer-events-none absolute right-1 top-1/2 transform -translate-y-1/2">
        <svg
          className="w-4 h-4 text-gray-500"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}

export default InputDropdown;
