import React, { useState, useEffect } from "react";

const ToggleButtons = ({ typeProps, onSelectedTypeChange }) => {
  const [selectedType, setSelectedType] = useState(typeProps);

  useEffect(() => {
    setSelectedType(typeProps);
  }, [typeProps]);

  //Assign new type
  const handleClick = (type) => {
    setSelectedType((prevType) => (prevType === type ? prevType : type));
    onSelectedTypeChange(selectedType === type ? selectedType : type);
  };

  return (
    <div className="sequence-row-container">
      <button
        className={`toggle${selectedType === "guitar" ? "-selected" : ""}`}
        onClick={() => handleClick("guitar")}
      >
        Guitar
      </button>
      <button
        className={`toggle${selectedType === "piano" ? "-selected" : ""}`}
        onClick={() => handleClick("piano")}
      >
        Piano
      </button>
      <button
        className={`toggle${selectedType === "french horn" ? "-selected" : ""}`}
        onClick={() => handleClick("french horn")}
      >
        French Horn
      </button>
      <button
        className={`toggle${selectedType === "drums" ? "-selected" : ""}`}
        onClick={() => handleClick("drums")}
      >
        Drums
      </button>
    </div>
  );
};

export default ToggleButtons;
