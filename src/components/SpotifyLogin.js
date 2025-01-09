import React from 'react';

const SPOTIFY_CLIENT_ID = 'your_spotify_client_id';
const SPOTIFY_REDIRECT_URI = 'your_redirect_uri';
const SPOTIFY_SCOPES = [
  'playlist-read-private',
  'playlist-modify-private',
  'playlist-modify-public',
];

const SpotifyLogin = () => {
  const getSpotifyAuthURL = () => {
    const scopes = encodeURIComponent(SPOTIFY_SCOPES.join(' '));
    return `https://accounts.spotify.com/authorize?response_type=token&client_id=${SPOTIFY_CLIENT_ID}&scope=${scopes}&redirect_uri=${SPOTIFY_REDIRECT_URI}`;
  };

  return (
    <div>
      <h1>Login to Spotify</h1>
      <a href={getSpotifyAuthURL()} className="login-button">
        Login with Spotify
      </a>
    </div>
  );
};

export default SpotifyLogin;
