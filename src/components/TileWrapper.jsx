import React, { useState } from 'react';
import Dimension from './Dimension';
import SelectTileSize from './SelectTileSize';
import BoxSummary from './BoxSummary';

export default function TileWrapper() {
  const [step, setStep] = useState(1);
  const tilesNeeded = 857; // You can pass dynamic value from step 1

  const goToNextStep = () => {
    setStep((prev) => prev + 1);
  };

  const goToPreviousStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Step Indicators */}
      <div className="flex justify-center items-center gap-4 mb-6">
        {[1, 2, 3].map((n) => (
          <button
            key={n}
            onClick={() => setStep(n)} // ✅ Go to selected step
            className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold transition ${step === n
                ? 'bg-green-600 text-white'
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
          >
            {n}
          </button>
        ))}
      </div>

      {/* Step Components */}
      {step === 1 && <Dimension onNext={goToNextStep} />}
      {step === 2 && (
        <SelectTileSize tilesNeeded={tilesNeeded} goToNextStep={goToNextStep} />
      )}
      {step === 3 && (
        <BoxSummary/>
      )}
    </div>
  );
}
