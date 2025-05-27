import React, { useContext } from 'react';
import InputText from './childComponents/InputText';
import TileInputsContext from '../context/TileInputContext';

function TotalArea() {
  const { inputs, setInputs } = useContext(TileInputsContext);

  const handleTotalAreaChange = (e) => {
    const raw = e.target.value;
    const converted = inputs.unit === 'Feet'
      ? (parseFloat(raw) * 0.092903).toFixed(4) // ✅ Convert to meter
      : raw;

    setInputs({ ...inputs, totalArea: converted });
  };

  const handleUnitChange = (unit) => {
    setInputs({ ...inputs, unit });
  };

  return (
    <div>
      <div className="flex flex-col gap-2 m-4">
        <label className="text-lg font-semibold">I Know Total Area</label>

        <InputText
          title="Total"
          placeholder="Enter Total Area"
          choices={['Meter', 'Feet']}
          value={inputs.unit === 'Feet'
            ? (parseFloat(inputs.totalArea || 0) / 0.092903).toFixed(2)
            : inputs.totalArea || ''}
          onChange={handleTotalAreaChange}
          unit={inputs.unit}
          onUnitChange={handleUnitChange}
        />
      </div>
    </div>
  );
}

export default TotalArea;
