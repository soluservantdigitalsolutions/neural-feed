import React from "react";
import { Link } from "react-router-dom";

const SubmitBtn = (props) => {
  return (
    <div className="border rounded transition  bg-green-600 flex justify-center items-center font-bold hover:shadow-2xl hover:bg-green-700">
      <button
        disabled={props.disabled}
        type="submit"
        className="text-white text-lg p-1 disabled:bg-slate-300  "
        onClick={props.onClick}
      >
        {props.ButtonText}
      </button>
    </div>
  );
};

export default SubmitBtn;
