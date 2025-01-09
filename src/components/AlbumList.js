import React, { useState, useEffect } from "react";
import { fetchSpotifyAlbums, fetchYouTubeMusicAlbums } from "../services/apis";

const AlbumList = () => {
  const [spotifyAlbums, setSpotifyAlbums] = useState([]);
  const [youtubeAlbums, setYoutubeAlbums] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const spotifyData = await fetchSpotifyAlbums();
      const youtubeData = await fetchYouTubeMusicAlbums();
      setSpotifyAlbums(spotifyData);
      setYoutubeAlbums(youtubeData);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Albums</h1>
      <div>
        <h2>Spotify Albums</h2>
        <ul>
          {spotifyAlbums.map((album) => (
            <li key={album.id}>{album.name}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>YouTube Music Albums</h2>
        <ul>
          {youtubeAlbums.map((album) => (
            <li key={album.id}>{album.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AlbumList;