import React from 'react'

const SubmitBtn = (props) => {
  return (
    <div className="border rounded bg-green-600 flex justify-center items-center font-bold">
      <button className="text-white text-lg p-2">
        {props.ButtonText}
      </button>
    </div>
  );
};


export default SubmitBtn;
