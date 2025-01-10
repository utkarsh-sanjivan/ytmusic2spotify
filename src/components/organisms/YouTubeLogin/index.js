import React, { useState, useEffect } from 'react';

import { updateSessionStorage } from '../../../utils/session-storage';
import { getSecretValue } from '../../../utils/get-secret';

const CLIENT_ID = getSecretValue('YOUTUBE_CLIENT_ID');
const REDIRECT_URI = getSecretValue('YOUTUBE_REDIRECT_URL');

const SCOPES = 'https://www.googleapis.com/auth/youtube.readonly';

const YouTubeLogin = () => {
  const [userInfo, setUserInfo] = useState(null);

  const handleLogin = () => {
    const authUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=token&scope=${encodeURIComponent(
      SCOPES
    )}&include_granted_scopes=true`;

    window.location.href = authUrl;
  };

  const fetchUserInfo = () => {
    const query = new URLSearchParams(window.location.search);
    function getUserInfoFromSession() {
      updateSessionStorage('isYoutubeAuthenticated', true);
      setUserInfo({
        user_name: sessionStorage.getItem('youtube_user_name'),
        profile_picture: sessionStorage.getItem('youtube_profile_picture'),
      });
    }

    function getUserInfoFromYoutube() {
      const params = new URLSearchParams(window.location.hash.slice(1));
      const accessToken = params.get('access_token');
      fetch(
        'https://www.googleapis.com/youtube/v3/channels?part=snippet&mine=true',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          updateSessionStorage('isYoutubeAuthenticated', true);
          setUserInfo({
            user_name: data.items[0].snippet.title,
            profile_picture: data.items[0].snippet.thumbnails?.default?.url,
          });
          sessionStorage.setItem(
            'youtube_user_name',
            data.items[0].snippet.title
          );
          sessionStorage.setItem(
            'youtube_profile_picture',
            data.items[0].snippet.thumbnails?.default?.url
          );
        })
        .catch((error) => {
          console.error('Failed to fetch user info:', error);
        });
    }

    if (
      query.get('tab') === 'youtube' &&
      !sessionStorage.getItem('youtube_user_name')
    ) {
      getUserInfoFromYoutube();
    } else if (
      query.get('tab') !== 'youtube' &&
      sessionStorage.getItem('youtube_user_name')
    ) {
      getUserInfoFromSession();
    } else if (
      query.get('tab') === 'youtube' &&
      sessionStorage.getItem('youtube_user_name')
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
      <h2>YouTube Login</h2>
      {!sessionStorage.getItem('isYoutubeAuthenticated') ? (
        <div>
          <button onClick={handleLogin}>Log in with YouTube</button>
        </div>
      ) : (
        <div>
          {userInfo?.profile_picture ? (
            <img
              src={userInfo?.profile_picture}
              alt="User Avatar"
              style={{ borderRadius: '50%' }}
            />
          ) : null}
          <h3>Welcome, {userInfo?.user_name}!</h3>
        </div>
      )}
    </div>
  );
};

export default YouTubeLogin;
