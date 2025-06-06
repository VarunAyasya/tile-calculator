import React, { useState, useContext } from 'react';
import InputText from './childComponents/InputText';
import TileInputsContext from '../context/TileInputContext';

function CalculateTotalArea() {
  const [error, setError] = useState("");
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const { inputs, setInputs, walls, setWalls } = useContext(TileInputsContext);

  const convertToMeters = (val) => (inputs.unit === 'Feet' ? val * 0.3048 : val);

  const handleAddWall = () => {
    if ((!width || !height) && !inputs.totalArea) {
      setError("❌ Please enter Width and Height or use 'Total Area' tab.");
      return;
    }

    if (isNaN(width) || isNaN(height)) {
      setError("Width and Height must be numbers.");
      return;
    }

    setError("");

    const wInMeters = convertToMeters(parseFloat(width));
    const hInMeters = convertToMeters(parseFloat(height));

    const newWalls = [...walls, { width: wInMeters.toFixed(2), height: hInMeters.toFixed(2) }];
    setWalls(newWalls);
    setWidth("");
    setHeight("");

    const totalArea = newWalls.reduce((sum, wall) => {
      const w = parseFloat(wall.width) || 0;
      const h = parseFloat(wall.height) || 0;
      return sum + w * h;
    }, 0);

    setInputs({ ...inputs, totalArea: totalArea.toFixed(2) });
  };

  const unitChoices = ['Meter', 'Feet'];

  return (
    <div>
      <div className="flex flex-col gap-2 m-4">
        <label className="text-lg font-semibold">Calculate Total Area</label>

        <InputText
          title="Width"
          placeholder="Enter Width"
          choices={unitChoices}
          value={width}
          onChange={(e) => setWidth(e.target.value)}
          unit={inputs.unit}
          onUnitChange={(val) => setInputs({ ...inputs, unit: val })}
        />

        <InputText
          title="Height"
          placeholder="Enter Height"
          choices={unitChoices}
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          unit={inputs.unit}
          onUnitChange={(val) => setInputs({ ...inputs, unit: val })}
        />

        <button
          type="button"
          onClick={handleAddWall}
          className="mt-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-fit"
        >
          Add another wall
        </button>
      </div>
      {error && <p className="text-red-600 text-sm mt-2">{error}</p>}

      {walls.length > 0 && (
        <div className="mt-4 mx-4 text-sm text-gray-800">
          <p className="font-semibold mb-2">You have already added:</p>
          <ul className="list-disc ml-5 space-y-1">
            {walls.map((wall, index) => (
              <li key={index}>
                Wall {index + 1} of {wall.width} × {wall.height} (Meters)
              </li>
            ))}
          </ul>

          <p className="mt-2 font-medium text-green-700">
            Total Area: {inputs.totalArea} m²
          </p>
        </div>
      )}
    </div>
  );
}

export default CalculateTotalArea;
