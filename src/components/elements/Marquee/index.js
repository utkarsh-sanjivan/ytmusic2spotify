import React from 'react';
import "./index.css";

const Marquee = () => {
  return <div className='marquee-container'>
    <div className={`marquee-text-header`}>Note**</div>
    <marquee
      className={`marquee-text`}
      onMouseOver={event => event.target.stop()}
      onMouseOut={event => event.target.start()}
      behavior="scroll"
    >
      You need to login to Youtube and Spotify to unlock the music transfer tab.
    </marquee>
  </div>
}

export default Marquee;
