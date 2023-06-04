import React from 'react';
import Dropzone from '../../components/DropZone/Dropzone';

const Upload = () => {
  return (
    <div
      className="MainFormCard border p-5 rounded flex justify-center  flex-col gap-2.5 shadow-xl "
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <Dropzone/>
    </div>
  );
};

export default Upload;
