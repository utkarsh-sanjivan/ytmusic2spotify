import React, { useState } from "react";

const CLIENT_ID = "522581562627-fknj5gh7c78g9kf7bmjtqdqv26lpovah.apps.googleusercontent.com";
const REDIRECT_URI = "YOUR_REDIRECT_URI";
const SCOPES = "https://www.googleapis.com/auth/youtube.readonly";

const YouTubeLogin = ({
  isYoutubeAuthenticated,
  setIsYoutubeAuthenticated
}) => {
  const [userInfo, setUserInfo] = useState(null);

  const handleLogin = () => {
    const authUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=token&scope=${encodeURIComponent(
      SCOPES
    )}&include_granted_scopes=true`;

    window.location.href = authUrl;
  };

  const fetchUserInfo = (accessToken) => {
    fetch("https://www.googleapis.com/oauth2/v1/userinfo?alt=json", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUserInfo(data);
        setIsYoutubeAuthenticated(true);
      })
      .catch((error) => {
        console.error("Failed to fetch user info:", error);
      });
  };

  React.useEffect(() => {
    const hashParams = new URLSearchParams(window.location.hash.slice(1));
    const accessToken = hashParams.get("access_token");

    if (accessToken) {
      fetchUserInfo(accessToken);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h2>YouTube Login</h2>
      {!isYoutubeAuthenticated ? (
        <div>
          <button onClick={handleLogin}>Log in with YouTube</button>
        </div>
      ) : (
        <div>
          <h3>Welcome, {userInfo?.name}!</h3>
          <img src={userInfo?.picture} alt="User Avatar" style={{ borderRadius: "50%" }} />
          <p>Email: {userInfo?.email}</p>
        </div>
      )}
    </div>
  );
};

export default YouTubeLogin;
