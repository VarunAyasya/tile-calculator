import React, { useContext, useMemo } from 'react';
import TileInputsContext from '../context/TileInputContext';

const tileSizes = ['600x600 mm', '800x800 mm', '1200x1200 mm', '300x600 mm'];
const pcsPerBoxOptions = [2, 4, 6];

export default function SelectTileSize({ goToNextStep }) {
  const { inputs, setInputs } = useContext(TileInputsContext);

  // ✅ Convert "600x600 mm" to m² (with context unit)
  const calculateTileAreaInSqMeters = (sizeStr) => {
    if (!sizeStr) return 0;
    const [w, h] = sizeStr.replace(' mm', '').split('x').map(Number);
    const area = (w / 1000) * (h / 1000); // in m²
    return area;
  };

  const tileArea = useMemo(() => calculateTileAreaInSqMeters(inputs.tileSize), [inputs.tileSize]);

  const totalArea = parseFloat(inputs.totalArea || '0');
  const tilesNeeded = tileArea > 0 ? Math.ceil(totalArea / tileArea) : 0;
  const boxesNeeded = inputs.pcsPerBox ? Math.ceil(tilesNeeded / inputs.pcsPerBox) : null;

  return (
    <div className="bg-white rounded shadow p-6 space-y-6">
      <h2 className="text-lg font-semibold">Select Size of Tiles</h2>

      {/* Tile Size Dropdown */}
      <select
        value={inputs.tileSize}
        onChange={(e) =>
          setInputs({ ...inputs, tileSize: e.target.value })
        }
        className="w-full border border-gray-300 rounded px-4 py-2 text-sm"
      >
        <option value="">Select size</option>
        {tileSizes.map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>

      {/* Tiles Needed */}
      {tileArea > 0 && (
        <p className="text-md font-medium">
          Tiles Needed:{' '}
          <span className="font-bold text-xl text-gray-800">{tilesNeeded}</span>
        </p>
      )}

      {/* Pcs Per Box */}
      <div>
        <p className="mb-2 font-medium">
          Select Pcs/box to see number of boxes required
        </p>
        <div className="flex gap-4">
          {pcsPerBoxOptions.map((pcs) => (
            <button
              key={pcs}
              onClick={() => setInputs({ ...inputs, pcsPerBox: pcs })}
              className={`px-4 py-2 text-sm rounded border ${
                inputs.pcsPerBox === pcs
                  ? 'bg-indigo-100 border-indigo-400'
                  : 'bg-white border-gray-300'
              }`}
            >
              {pcs} PCS
            </button>
          ))}
        </div>
      </div>

      {/* Boxes Needed */}
      {boxesNeeded && (
        <div className="mt-4 text-green-700 font-semibold">
          📦 Boxes Required: {boxesNeeded}
        </div>
      )}

      {/* Next Button */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={goToNextStep}
          className="mt-6 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Next
        </button>
      </div>
    </div>
  );
}
