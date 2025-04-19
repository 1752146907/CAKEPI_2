import React from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  title: string;
}

const ComponentName = (props: any) => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <div
      className="relative text-center w-[100vw]"
      style={{
        boxShadow: "0px 5px 20px 0px rgba(0, 0, 0, 0.08)",
      }}
    >
      <svg
        onClick={goBack}
        className="absolute top-[16px] left-[24px]"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M9.21988 12.0006L17.3749 4.11744C17.8556 3.65202 17.8556 2.89876 17.3749 2.43482C16.8943 1.97013 16.1145 1.97013 15.6338 2.43482L6.60896 11.1595C6.12904 11.6242 6.12904 12.3778 6.60896 12.841L15.6338 21.5653C15.8749 21.7977 16.19 21.9138 16.5051 21.9138C16.8203 21.9138 17.1353 21.7977 17.3749 21.5646C17.8556 21.0999 17.8556 20.3477 17.3749 19.883L9.21988 12.0006Z"
          fill="#fff"
        />
      </svg>
      <div className="text-[#fff] text-[18px] font-[600] p-17">
        {props.title}
      </div>
    </div>
  );
};

export default ComponentName;
