import React, { useState, useEffect } from "react";

const CLIENT_ID = "YOUR_SPOTIFY_CLIENT_ID";
const REDIRECT_URI = "YOUR_REDIRECT_URI";
const SCOPES = [
  "user-read-private",
  "user-read-email",
  "playlist-read-private",
  "playlist-modify-public",
  "playlist-modify-private",
];

const SpotifyLogin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const getSpotifyLoginURL = () => {
    const scopes = SCOPES.join("%20");
    return `https://accounts.spotify.com/authorize?response_type=token&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
      REDIRECT_URI
    )}&scope=${scopes}`;
  };

  const fetchUserInfo = (accessToken) => {
    fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUserInfo(data);
        setIsAuthenticated(true);
      })
      .catch((error) => {
        console.error("Failed to fetch Spotify user info:", error);
      });
  };

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const accessToken = params.get("access_token");

    if (accessToken) {
      fetchUserInfo(accessToken);
    }
  }, []);

  return (
    <div>
      <h2>Spotify Login</h2>
      {!isAuthenticated ? (
        <div>
          <a href={getSpotifyLoginURL()}>
            <button>Log in with Spotify</button>
          </a>
        </div>
      ) : (
        <div>
          <h3>Welcome, {userInfo?.display_name}!</h3>
          {userInfo?.images?.[0]?.url && (
            <img
              src={userInfo.images[0].url}
              alt="User Avatar"
              style={{ borderRadius: "50%", width: "100px" }}
            />
          )}
          <p>Email: {userInfo?.email}</p>
        </div>
      )}
    </div>
  );
};

export default SpotifyLogin;
