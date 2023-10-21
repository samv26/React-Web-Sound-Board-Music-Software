import React from "react";

const ButtonGroup = ({ handlePreview, handleSave, isSaving }) => {
  return (
    <div className="button-group-container">
      <button
        onClick={(e) => {
          e.preventDefault();
          handlePreview();
        }}
        style={{ cursor: "pointer" }}
        className="bright-button"
      >
        Preview
      </button>
      <button
        onClick={handleSave}
        type="button"
        className="bright-button"
        disabled={isSaving}
      >
        Save
      </button>
    </div>
  );
};

export default ButtonGroup;
