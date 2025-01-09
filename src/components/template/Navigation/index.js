import React, { useState } from "react";
import YouTubeLogin from "../../organisms/YouTubeLogin";
import SpotifyLogin from "../../organisms/SpotifyLogin";
import TransferPage from "../../organisms/Transfer";
import LockIcon from "../../atoms/LockIcon";
import BlankTickIcon from "../../atoms/BlankTickIcon";
import TickIcon from "../../atoms/TickIcon";
import "./index.css";

const Navigation = ({
  isSpotifyAuthenticated,
  setIsSpotifyAuthenticated,
  isYoutubeAuthenticated,
  setIsYoutubeAuthenticated
}) => {
  const [activeTab, setActiveTab] = useState("youtube");

  const renderActiveTab = () => {
    switch (activeTab) {
      case "youtube":
        return <YouTubeLogin
				  isYoutubeAuthenticated={isYoutubeAuthenticated}
          setIsYoutubeAuthenticated={setIsYoutubeAuthenticated}
				/>;
      case "spotify":
        return <SpotifyLogin
				  isSpotifyAuthenticated={isSpotifyAuthenticated}
				  setIsSpotifyAuthenticated={setIsSpotifyAuthenticated}
				/>;
      case "transfer":
        return <TransferPage />;
      default:
        return <YouTubeLogin 
          isYoutubeAuthenticated={isYoutubeAuthenticated}
          setIsYoutubeAuthenticated={setIsYoutubeAuthenticated}
        />;
    }
  };

  return (
    <div className="navigation-container">
      <div className="tabs">
        <button
          className={activeTab === "youtube" ? "active" : ""}
          onClick={() => setActiveTab("youtube")}
        >
          YouTube Login
          {isYoutubeAuthenticated?
					  <TickIcon />
						: <BlankTickIcon />
					}
        </button>
        <button
          className={activeTab === "spotify" ? "active" : ""}
          onClick={() => setActiveTab("spotify")}
        >
          Spotify Login
          {isSpotifyAuthenticated?
					  <TickIcon />
						: <BlankTickIcon />
					}
        </button>
        <button
          className={activeTab === "transfer" ? "active" : ""}
          onClick={() => setActiveTab("transfer")}
          disabled={!(isSpotifyAuthenticated && isYoutubeAuthenticated)}
        >
          Transfer Page
          {isSpotifyAuthenticated && isYoutubeAuthenticated? <></>: <LockIcon />}
        </button>
      </div>
      <div className="content">{renderActiveTab()}</div>
    </div>
  );
};

export default Navigation;
