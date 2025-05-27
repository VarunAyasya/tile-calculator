import React, { useContext, useState, useMemo } from 'react';
import TileInputsContext from '../context/TileInputContext';

function BoxSummary({ onRecalculate }) {
  const { inputs, setInputs } = useContext(TileInputsContext);
  const [grout, setGrout] = useState(inputs.groutWidth || 0);
  const [wastage, setWastage] = useState(inputs.wastage || 0);

  const getTileArea = (sizeStr, groutWidth) => {
    if (!sizeStr) return 0;
    const [w, h] = sizeStr.replace(' mm', '').split('x').map(Number);
    const totalWidth = w + parseFloat(groutWidth || 0);
    const totalHeight = h + parseFloat(groutWidth || 0);
    return (totalWidth / 1000) * (totalHeight / 1000); // m²
  };

  const boxesNeeded = useMemo(() => {
    const totalArea = parseFloat(inputs.totalArea || 0);
    const tileArea = getTileArea(inputs.tileSize, grout);
    const pcsPerBox = parseInt(inputs.pcsPerBox || 0);

    if (!tileArea || !pcsPerBox || !totalArea) return 0;

    let tilesNeeded = Math.ceil(totalArea / tileArea);
    tilesNeeded += Math.ceil((tilesNeeded * parseFloat(wastage || 0)) / 100);

    return Math.ceil(tilesNeeded / pcsPerBox);
  }, [inputs.totalArea, inputs.tileSize, inputs.pcsPerBox, grout, wastage]); // 👈 react to changes

  const handleRecalculate = () => {
    setInputs({ ...inputs, groutWidth: grout, wastage });
    if (onRecalculate) onRecalculate();
  };

  return (
    <div className="bg-white rounded shadow p-6 max-w-xl mx-auto space-y-6">
      {/* Boxes Needed */}
      <div>
        <p className="text-lg font-semibold">
          Boxes Needed: <span className="text-2xl text-black font-bold">{boxesNeeded}</span>
        </p>
      </div>

      {/* Grout */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="text-sm font-medium">Grout</label>
          <div className="flex items-center gap-2 mt-1">
            <select
              value={grout}
              onChange={(e) => setGrout(Number(e.target.value))}
              className="border rounded px-2 py-1 text-sm"
            >
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((val) => (
                <option key={val} value={val}>{val}</option>
              ))}
            </select>
            <span className="text-sm bg-gray-200 rounded px-2 py-1">mm</span>
          </div>
        </div>

        {/* Wastage */}
        <div>
          <label className="text-sm font-medium">Wastage</label>
          <div className="flex items-center gap-2 mt-1">
            <select
              value={wastage}
              onChange={(e) => setWastage(Number(e.target.value))}
              className="border rounded px-2 py-1 text-sm"
            >
              {[0, 5, 10, 15, 20].map((val) => (
                <option key={val} value={val}>{val}</option>
              ))}
            </select>
            <span className="text-sm bg-gray-200 rounded px-2 py-1">%</span>
          </div>
        </div>
      </div>

      {/* Recalculate */}
      <div className="flex justify-end">
        <button
          onClick={handleRecalculate}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded"
        >
          Recalculate
        </button>
      </div>
    </div>
  );
}

export default BoxSummary;
