import React, { useState, useEffect } from 'react';

import { updateSessionStorage } from '../../../utils/session-storage';
import { getSecretValue } from '../../../utils/get-secret';

const CLIENT_ID = getSecretValue('SPOTIFY_CLIENT_ID');
const REDIRECT_URI = getSecretValue('SPOTIFY_REDIRECT_URL');
const SCOPES = [
  'user-read-private',
  'user-read-email',
  'playlist-read-private',
  'playlist-modify-public',
  'playlist-modify-private',
];

const SpotifyLogin = () => {
  const [userInfo, setUserInfo] = useState(null);

  const getSpotifyLoginURL = () => {
    const scopes = SCOPES.join('%20');
    return `https://accounts.spotify.com/authorize?response_type=token&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
      REDIRECT_URI
    )}&scope=${scopes}`;
  };

  const fetchUserInfo = () => {
    const query = new URLSearchParams(window.location.search);
    function getUserInfoFromSession() {
      updateSessionStorage('isSpotifyAuthenticated', true);
      setUserInfo({
        user_name: sessionStorage.getItem('spotify_user_name'),
        profile_picture: sessionStorage.getItem('spotify_profile_picture'),
      });
    }

    function getUserInfoFromSpotify() {
      const params = new URLSearchParams(window.location.hash.slice(1));
      const accessToken = params.get('access_token');

      fetch('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          updateSessionStorage('isSpotifyAuthenticated', true);
          setUserInfo({
            user_name: data?.display_name,
            profile_picture: data?.images[0]?.url,
          });
          sessionStorage.setItem('spotify_user_name', data?.display_name);
          sessionStorage.setItem(
            'spotify_profile_picture',
            data?.images[0]?.url
          );
        })
        .catch((error) => {
          console.error('Failed to fetch Spotify user info:', error);
        });
    }

    if (
      query.get('tab') === 'spotify' &&
      !sessionStorage.getItem('spotify_user_name')
    ) {
      getUserInfoFromSpotify();
    } else if (
      query.get('tab') !== 'spotify' &&
      sessionStorage.getItem('spotify_user_name')
    ) {
      getUserInfoFromSession();
    } else if (
      query.get('tab') === 'spotify' &&
      sessionStorage.getItem('spotify_user_name')
    ) {
      getUserInfoFromSession();
    }
  };

  useEffect(() => {
    fetchUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    window.location, // see if this can be improved
  ]);

  return (
    <div>
      <h2>Spotify Login</h2>
      {!sessionStorage.getItem('isSpotifyAuthenticated') ? (
        <div>
          <a href={getSpotifyLoginURL()}>
            <button>Log in with Spotify</button>
          </a>
        </div>
      ) : (
        <div>
          {userInfo?.profile_picture && (
            <img
              src={userInfo.profile_picture}
              alt="User Avatar"
              style={{ borderRadius: '50%', width: '100px' }}
            />
          )}
          <h3>Welcome, {userInfo?.user_name}!</h3>
        </div>
      )}
    </div>
  );
};

export default SpotifyLogin;
