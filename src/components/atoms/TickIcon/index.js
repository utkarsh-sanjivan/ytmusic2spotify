import React from 'react';
import './index.css';

const TickIcon = () => {
  return <svg 
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      height="20px"
      width="20px"
      viewBox="0 0 20 20"
      className="tick-icon"
    >
    <title>Tick Icon</title>
    <g
      id="Page-1"
      fill="none"
      fillRule="evenodd"
      stroke="none"
      strokeWidth="1"
    >
      <g
        id="Core"
        fill="#40C057"
        transform="translate(-44.000000, -86.000000)"
      >
        <g
          id="check-circle"
          transform="translate(44.000000, 86.000000)"
        >
          <path
            id="Shape"
            d="M10,0 C4.5,0 0,4.5 0,10 C0,15.5 4.5,20 10,20 C15.5,20 20,15.5 20,10 C20,4.5 15.5,0 10,0 L10,0 Z M8,15 L3,10 L4.4,8.6 L8,12.2 L15.6,4.6 L17,6 L8,15 L8,15 Z"
          />
        </g>
      </g>
    </g>
  </svg>;
}

export default TickIcon;
