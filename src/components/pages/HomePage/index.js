import React, { useState } from 'react';

import Header from '../../template/Header';
import Footer from '../../template/Footer';
import Navigation from '../../template/Navigation';
import Marquee from '../../elements/Marquee';
import './index.css';

const HomePage = () => {
  const [isSpotifyAuthenticated, setIsSpotifyAuthenticated] = useState(false);
  const [isYoutubeAuthenticated, setIsYoutubeAuthenticated] = useState(false);

  return (
    <>
      <Header />
      <Marquee />
      <Navigation
        isSpotifyAuthenticated={isSpotifyAuthenticated}
        setIsSpotifyAuthenticated={setIsSpotifyAuthenticated}
        isYoutubeAuthenticated={isYoutubeAuthenticated}
        setIsYoutubeAuthenticated={setIsYoutubeAuthenticated}
      />
      <Footer />
    </>
  );
};

export default HomePage;
