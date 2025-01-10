import React from 'react';

import Header from '../../template/Header';
import Footer from '../../template/Footer';
import Navigation from '../../template/Navigation';
import Marquee from '../../elements/Marquee';
import './index.css';

const HomePage = () => {
  return (
    <>
      <Header />
      <Marquee />
      <Navigation />
      <Footer />
    </>
  );
};

export default HomePage;
