import { motion } from 'motion/react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Track {
  name: string;
  artist: string;
  artworkUrl: string;
}

export default function TopTrack() {
  const [topTrack, setTopTrack] = useState<Track | null>(null);
  const [mostRecentTrack, setMostRecentTrack] = useState<Track | null>(null);

  useEffect(() => {
    const fetchTopTrack = async () => {
      try {
        const params = {
          method: 'user.gettoptracks',
          user: 'InfinityBowman',
          api_key: 'e03f73854d4ce7c32d21bea38e51d407',
          format: 'json',
          limit: '1',
        };
        const response = await axios.get(
          `https://ws.audioscrobbler.com/2.0/?method=${params.method}&user=${params.user}&api_key=${params.api_key}&format=json&limit=${params.limit}`
        );
        const track = response.data.toptracks.track[0];

        const trackInfoParams = {
          method: 'track.getInfo',
          api_key: 'e03f73854d4ce7c32d21bea38e51d407',
          artist: track.artist.name,
          track: track.name,
          format: 'json',
        };

        const trackInfoResponse = await axios.get(
          `https://ws.audioscrobbler.com/2.0/?method=${trackInfoParams.method}&api_key=${trackInfoParams.api_key}&artist=${trackInfoParams.artist}&track=${trackInfoParams.track}&format=json`
        );

        const trackInfo = trackInfoResponse.data.track;
        setTopTrack({
          name: track.name,
          artist: track.artist.name,
          artworkUrl: trackInfo.album.image[2]['#text'],
        });

        const recentParams = {
          method: 'user.getrecenttracks',
          user: 'InfinityBowman',
          api_key: 'e03f73854d4ce7c32d21bea38e51d407',
          format: 'json',
          limit: '1',
        };
        const recentResponse = await axios.get(
          `https://ws.audioscrobbler.com/2.0/?method=${recentParams.method}&user=${recentParams.user}&api_key=${recentParams.api_key}&format=json&limit=${recentParams.limit}`
        );
        const recentTrack = recentResponse.data.recenttracks.track[0];
        setMostRecentTrack({
          name: recentTrack.name,
          artist: recentTrack.artist['#text'],
          artworkUrl: recentTrack.image[2]['#text'],
        });
      } catch (error) {
        console.error('Error fetching tracks:', error);
      }
    };

    fetchTopTrack();
  }, []);

  return (
    <motion.div
      className="flex flex-col md:flex-row justify-evenly mt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <div>
        <div className="flex text-2xl justify-center my-4">My most listened to track:</div>
        {topTrack ?
          <div className="text-center mb-4 flex justify-center">
            <div className="max-w-sm bg-primary-foreground p-4 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold">{topTrack.name}</h3>
              <p className="text-sm text-muted-foreground">{topTrack.artist}</p>
              <img
                src={topTrack.artworkUrl}
                alt={`${topTrack.name} artwork`}
                className="mx-auto mt-2"
              />
            </div>
          </div>
        : <div className="text-center text-muted-foreground">Loading...</div>}
      </div>
      <div>
        <div className="flex text-2xl justify-center my-4">Last track I listened to:</div>
        {mostRecentTrack ?
          <div className="text-center mb-4 flex justify-center">
            <div className="max-w-sm bg-primary-foreground p-4 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold">{mostRecentTrack.name}</h3>
              <p className="text-sm text-muted-foreground">{mostRecentTrack.artist}</p>
              <img
                src={mostRecentTrack.artworkUrl}
                alt={`${mostRecentTrack.name} artwork`}
                className="mx-auto mt-2"
              />
            </div>
          </div>
        : <div className="text-center text-destructive">Failed to load</div>}
      </div>
    </motion.div>
  );
}
