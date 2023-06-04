import React from 'react';
import { Link } from 'react-router-dom';

const SubmitBtn = (props) => {
  return (
    <div className="border rounded bg-green-600 flex justify-center items-center font-bold">
      <button className="text-white text-lg p-1">{props.ButtonText}</button>
    </div>
  );
};

export default SubmitBtn;
