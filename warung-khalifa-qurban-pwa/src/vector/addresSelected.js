import React from "react";

const Address = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="20"
      cy="20"
      r="19.5"
      fill="white"
      stroke={process.env.REACT_APP_COLOR_PRIMARY || "#FFD101"}
    />
    <g clipPath="url(#clip0)">
      <path
        d="M27.6852 12.0603C27.5241 11.9796 27.3344 11.9796 27.1733 12.0603L12.3166 19.4886C12.0344 19.6299 11.9202 19.9731 12.0614 20.2553C12.1418 20.416 12.293 20.5295 12.4698 20.5617L18.3661 21.6343L19.4387 27.5306C19.4825 27.7723 19.6761 27.9589 19.9192 27.994C19.9461 27.9979 19.9732 27.9998 20.0003 27.9998C20.2169 27.9999 20.4149 27.8775 20.5118 27.6838L27.9401 12.8271C28.0815 12.545 27.9673 12.2016 27.6852 12.0603Z"
        fill={process.env.REACT_APP_COLOR_PRIMARY || "#FFD101"}
      />
    </g>
    <defs>
      <clipPath id="clip0">
        <rect
          width="16"
          height="16"
          fill="white"
          transform="translate(12 12)"
        />
      </clipPath>
    </defs>
  </svg>
);

export default Address;
