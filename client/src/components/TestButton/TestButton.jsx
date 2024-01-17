import React from "react";
import { Link } from "react-router-dom";

const TestButton = ({ feedId, contentType }) => {
  return (
    <Link to={`/${contentType}/tests/${feedId}`}>
      <button className="text-center  hover:shadow-md focus:bg-green-700 transition-all w-full rounded-md text-white bg-green-600 p-2.5">
        Test Your Understanding
      </button>
    </Link>
  );
};

export default TestButton;
