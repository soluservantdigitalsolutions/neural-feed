import React from 'react'

const SecondaryButton = (props) => {
  return (
    <div className="LoginButtonDiv border rounded border-green-600 flex justify-center items-center font-bold">
      <button className="text-green-600 text-lg p-1 hover:bg-green-600 transition hover:text-white">{props.SecondaryButtonText}</button>
    </div>
  );
}

export default SecondaryButton
