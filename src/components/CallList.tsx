// @ts-nocheck

"use client";

import { useGetCalls } from "@/hooks/useGetCalls";
import { Call, CallRecording } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import { useState } from "react";
import MeetingCard from "./MeetingCard";
import Loader from "./Loader";

interface CallListProps {
  type: "ended" | "upcoming" | "recordings";
}

const CallList = ({ type }: CallListProps) => {
  const { endedCalls, upcomingCalls, callRecordings, isLoading } =
    useGetCalls();

  const [recordings, setRecordings] = useState<CallRecording[]>([]);

  const router = useRouter();

  const getCalls = () => {
    switch (type) {
      case "ended":
        return endedCalls;
      case "upcoming":
        return upcomingCalls;
      case "recordings":
        return callRecordings;
      default:
        return [];
    }
  };

  const getNoCallsMessages = () => {
    switch (type) {
      case "ended":
        return "No Previous Calls";
      case "upcoming":
        return "No Upcoming Calls";
      case "recordings":
        return "No Recordings";
      default:
        return "";
    }
  };

  const calls = getCalls();
  const noCallsMessage = getNoCallsMessages();

  if (isLoading) return <Loader />

  return (
    <>
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2 ">
        {calls && calls.length > 0 ? (
          calls.map((meeting: Call | CallRecording) => (
            <MeetingCard
            key={(meeting as Call).id}
              icon = {
                type === "ended" ? '/icons/previous.svg' :
                type === 'upcoming' ? '/icons/upcoming.svg' :
                '/icons/recordings.svg'
              }

              title= { (meeting as Call).state.custom.description.substring(0, 20) || 'No description' }

              date= { (meeting as Call).state.startsAt?.toLocaleString() || meeting.start_time.toLocaleString() }

              isPreviousMeeting = { type === 'ended'}

              buttonIcon1 = { type === 'recordings' ? '/icons/paly.svg' : undefined }

              buttonText={ type === 'recordings' ? 'Play' : 'Start' }

              link = { type === 'recordings' ? meeting.url : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meeting.id}` }

              handleClick = { type === 'recordings' ? () => router.push(`${meeting.url}`) : () => router.push(`/meeting/${meeting.id}`) }
            />
          ))
        ) : (
          <h1> {noCallsMessage} </h1>
        )}
      </div>
    </>
  );
};

export default CallList;
