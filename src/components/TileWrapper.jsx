import React, { useState, useContext } from 'react';
import Dimension from './Dimension';
import SelectTileSize from './SelectTileSize';
import BoxSummary from './BoxSummary';
import TileInputsContext from '../context/TileInputContext';

export default function TileWrapper() {
  const [step, setStep] = useState(1);
  const { inputs, walls } = useContext(TileInputsContext);
  const tilesNeeded = 857;

  const validateStep1 = () => {
    const hasWalls = walls.length > 0;
    const totalArea = parseFloat(inputs.totalArea || "0");
    return hasWalls || (!isNaN(totalArea) && totalArea > 0);
  };

  const validateStep2 = () => {

    const tileSize = parseFloat(inputs.tileSize || "0");
    return   tileSize > 0 
  };

  const goToNextStep = () => {
    if (step === 1 && !validateStep1()) {
      alert("Please complete Step 1 before proceeding.");
      return;
    }
    if (step === 2 && !validateStep2()) {
      alert("Please complete Step 2 before proceeding.");
      return;
    }
    setStep((prev) => prev + 1);
  };

  const goToPreviousStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleStepClick = (n) => {
    if (n > 1 && !validateStep1()) {
      alert("Please complete Step 1 before continuing.");
      return;
    }
    if (n > 2 && !validateStep2()) {
      alert("Please complete Step 2 before continuing.");
      return;
    }
    setStep(n);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
    
      <div className="flex justify-center items-center gap-4 mb-6">
        {[1, 2, 3].map((n) => (
          <button
            key={n}
            onClick={() => handleStepClick(n)}
            className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold transition ${
              step === n
                ? 'bg-green-600 text-white'
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
          >
            {n}
          </button>
        ))}
      </div>

      {step === 1 && <Dimension onNext={goToNextStep} />}
      {step === 2 && (
        <SelectTileSize tilesNeeded={tilesNeeded} goToNextStep={goToNextStep} />
      )}
      {step === 3 && <BoxSummary />}
    </div>
  );
}
