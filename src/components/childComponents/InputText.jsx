function InputText({ title, placeholder, choices, value, onChange, unit, onUnitChange }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center">
        <div className="flex items-stretch border border-gray-300 rounded-md w-80 overflow-hidden shadow-sm p-2">
          {/* Label */}
          <span className="bg-white text-sm text-gray-600 px-3 flex items-center border-r">
            {title}
          </span>

          {/* Input */}
          <input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="flex-1 px-3 text-sm text-gray-800 focus:outline-none"
          />

          {/* Unit Dropdown */}
          <select
          disabled
            value={unit}
            onChange={(e) => onUnitChange && onUnitChange(e.target.value)}
            className="px-2 py-1 bg-white text-sm outline-none appearance-none"
          >
            {choices.map((c, idx) => (
              <option key={idx} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
export default InputText;