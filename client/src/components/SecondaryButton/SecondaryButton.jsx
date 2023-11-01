import React from "react";

const SecondaryButton = (props) => {
  return (
    <div className="LoginButtonDiv border rounded border-green-600 hover:bg-green-600 flex justify-center items-center font-bold">
      <button
        onClick={props.onClick}
        className="text-green-600 text-lg p-1  transition hover:text-white active:bg-green-700 cursor-pointer"
      >
        {props.SecondaryButtonText}
      </button>
    </div>
  );
};

export default SecondaryButton;
