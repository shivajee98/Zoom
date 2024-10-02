'use client';

import MeetingRoom from "@/components/MeetingRoom";
import MeetingSetup from "@/components/MeetingSetup";
import { useGetCallById } from "@/hooks/useGetCallById";
import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import React, { useState } from "react";

const MeetingPage = ({ params }: { params: { id: string } }) => {
  const { user, isLoaded } = useUser();
  const [isSetupCompleted, setIsSetupCompleted] = useState(false);
  const { id } = params; // Destructure id from params
  const { call, isCallLoading } = useGetCallById(id);

  if (isCallLoading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="h-screen w-full text-white">
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetupCompleted ? <MeetingSetup setIsSetupCompleted={setIsSetupCompleted} /> : <MeetingRoom />}
        </StreamTheme>
      </StreamCall>
    </main>
  );
};

export default MeetingPage;
