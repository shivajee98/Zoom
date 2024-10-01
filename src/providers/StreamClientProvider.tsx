'use client'

import {
  StreamCall,
  StreamVideo,
  StreamVideoClient,
  User as StreamUser,
} from '@stream-io/video-react-sdk';

import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { tokenProvider } from '@/actions/stream.actions';
import Loader from '@/components/Loader';

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;


const StreamVideoProvider = ({ children }: { children: React.ReactNode }) => {

  const { user, isLoaded } = useUser();

  const [videoClient, setVideoClient] = useState<StreamVideoClient>();

  useEffect(() => {

    if (!isLoaded || !user) {
      return;
    }

    if (!apiKey) {
      throw new Error('Stream API key missing');
    }


    const client = new StreamVideoClient({
      apiKey,
      user: {
        id: user.id,
        name: user.username || user.id,
        image: user.imageUrl,
      },
      tokenProvider,
    });

    console.log("Checkpoint 8: StreamVideoClient instance created", client);

    setVideoClient(client);
    console.log("Checkpoint 9: videoClient state updated");

  }, [user, isLoaded]);

  if (!videoClient) {
    // console.log("Checkpoint 10: videoClient not available, rendering Loader");
    return <Loader />;
  }

//   console.log("Checkpoint 11: videoClient available, rendering StreamVideo");

  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
};

export default StreamVideoProvider;
