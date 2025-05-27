import React, { useEffect, useState } from 'react';
import TileInputsContext from './TileInputContext';

const defaultState = {
  inputs: {
    length: '',
    width: '',
    height: '',
    tileSize: '',
    tileType: '',
    groutWidth: 0,
    unit: 'Meter',
    totalArea: '',
    pcsPerBox: 0,
    wastage: 0,
  },
  walls: [],
};

const TileInputsContextProvider = ({ children }) => {
  const [inputs, setInputs] = useState(defaultState.inputs);
  const [walls, setWalls] = useState(defaultState.walls);

  useEffect(() => {
    const stored = localStorage.getItem('tile-calc-data');
    if (stored) {
      const parsed = JSON.parse(stored);
      setInputs(parsed.inputs || defaultState.inputs);
      setWalls(parsed.walls || []);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tile-calc-data', JSON.stringify({ inputs, walls }));
  }, [inputs, walls]);

  const resetInputs = () => {
    setInputs(defaultState.inputs);
    setWalls([]);
    localStorage.removeItem('tile-calc-data');
  };

  return (
    <TileInputsContext.Provider value={{ inputs, setInputs, walls, setWalls, resetInputs }}>
      {children}
    </TileInputsContext.Provider>
  );
};

export default TileInputsContextProvider;
