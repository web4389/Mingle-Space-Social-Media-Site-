import React from "react";
import './Css/button.css'

const Button = (props) => {
  const {value,apidata} = props
  return (
    <>
      <button
      type="submit"
      className="w-[100%] flex justify-center gap-3 bg-sky-600 text-white mt-3 py-[10px] hover:bg-sky-800 transition-colors rounded-3xl font-semibold text-[17px]">
     {apidata.loading === true? <> <div className="loader"></div> <p>Loading...</p></>: value}
      </button>

      </>

  );
};

export default Button;
