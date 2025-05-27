import React, { useContext } from "react";
import InputDropdown from "./childComponents/InputDropdown";
import TileInputsContext from "../context/TileInputContext";

function Unit() {
  const { inputs, setInputs } = useContext(TileInputsContext);
  const choices = ["Feet", "Meters"];

  return (
    <div>
      <InputDropdown
        choices={["Meter", "Feet"]}
        selected={inputs.unit}
        onChange={(val) => setInputs({ ...inputs, unit: val })}
      />
    </div>
  );
}

export default Unit;
