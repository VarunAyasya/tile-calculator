import React, { useContext } from 'react';
import InputDropdown from './childComponents/InputDropdown';
import TileInputsContext from '../context/TileInputContext';

function Space() {
  const { inputs, setInputs } = useContext(TileInputsContext);
  const choices = ['Wall', 'Floor'];

  return (
    <div>
      <InputDropdown
        choices={['Wall', 'Floor']}
        selected={inputs.tileType}
        onChange={(val) => setInputs({ ...inputs, tileType: val })}
      />

    </div>
  );
}

export default Space;
