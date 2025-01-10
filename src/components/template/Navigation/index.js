import React, { useState, useEffect } from 'react';

import YouTubeLogin from '../../organisms/YouTubeLogin';
import SpotifyLogin from '../../organisms/SpotifyLogin';
import TransferPage from '../../organisms/Transfer';
import LockIcon from '../../atoms/LockIcon';
import BlankTickIcon from '../../atoms/BlankTickIcon';
import TickIcon from '../../atoms/TickIcon';
import './index.css';

const Navigation = () => {
  const [activeTab, setActiveTab] = useState('youtube');
  const [isSpotifyAuthenticated, setIsSpotifyAuthenticated] = useState(false);
  const [isYoutubeAuthenticated, setIsYoutubeAuthenticated] = useState(false);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const tab = query.get('tab');
    if (tab && tab === 'spotify') setActiveTab(tab);
    if (tab && tab === 'youtube') setActiveTab(tab);
  }, []);

  useEffect(() => {
    const handleSessionStorageChange = () => {
      if (
        sessionStorage.getItem('isSpotifyAuthenticated') !==
        isSpotifyAuthenticated
      )
        setIsSpotifyAuthenticated(
          sessionStorage.getItem('isSpotifyAuthenticated') === 'true'
        );
      if (
        sessionStorage.getItem('isYoutubeAuthenticated') !==
        isYoutubeAuthenticated
      )
        setIsYoutubeAuthenticated(
          sessionStorage.getItem('isYoutubeAuthenticated') === 'true'
        );
    };

    window.addEventListener('sessionStorageChange', handleSessionStorageChange);

    return () => {
      window.removeEventListener(
        'sessionStorageChange',
        handleSessionStorageChange
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'youtube':
        return <YouTubeLogin />;
      case 'spotify':
        return <SpotifyLogin />;
      case 'transfer':
        return <TransferPage />;
      default:
        return <YouTubeLogin />;
    }
  };

  return (
    <div className="navigation-container">
      <div className="tabs">
        <button
          className={activeTab === 'youtube' ? 'active' : ''}
          onClick={() => setActiveTab('youtube')}
        >
          YouTube Login
          {isYoutubeAuthenticated ? <TickIcon /> : <BlankTickIcon />}
        </button>
        <button
          className={activeTab === 'spotify' ? 'active' : ''}
          onClick={() => setActiveTab('spotify')}
        >
          Spotify Login
          {isSpotifyAuthenticated ? <TickIcon /> : <BlankTickIcon />}
        </button>
        <button
          className={activeTab === 'transfer' ? 'active' : ''}
          onClick={() => setActiveTab('transfer')}
          disabled={!(isSpotifyAuthenticated && isYoutubeAuthenticated)}
        >
          Transfer Page
          {isSpotifyAuthenticated && isYoutubeAuthenticated ? (
            <></>
          ) : (
            <LockIcon />
          )}
        </button>
      </div>
      <div className="content">{renderActiveTab()}</div>
    </div>
  );
};

export default Navigation;
