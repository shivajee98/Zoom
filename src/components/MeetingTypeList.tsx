"use client";

import Image from "next/image";
import React, { useState } from "react";
import HomeCard from "./HomeCard";
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/nextjs";

const MeetingTypeList = () => {
  const router = useRouter();

  const [meetingState, setMeetingState] = useState<
    "isScheduleMeeting" | "isJoingingMeeting" | "isInstantMeeting" | undefined
  >();

  const { user } = useUser()

  const createMeeting = () => {};

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      <HomeCard
        img="/icons/add-meeting.svg"
        title="New Meeting"
        description="Stat an instant meeting."
        handleClick={() => setMeetingState("isInstantMeeting")}
        cardColor="bg-orange-1"
      />
      <HomeCard
        img="/icons/schedule.svg"
        title="Schedule Meeting"
        description="Plan your meeting."
        handleClick={() => setMeetingState("isScheduleMeeting")}
        cardColor="bg-blue-1"
      />
      <HomeCard
        img="/icons/recordings.svg"
        title="View Recordings"
        description="Check out your recordings."
        handleClick={() => router.push("/recordings")}
        cardColor="bg-purple-1"
      />
      <HomeCard
        img="/icons/join-meeting.svg"
        title="Join Meeting"
        description="Via invitation link."
        handleClick={() => setMeetingState("isJoingingMeeting")}
        cardColor="bg-yellow-1"
      />

      <MeetingModal
        isOpen={meetingState === "isInstantMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Start an instant meeting"
        handleClick={() => {
          // navigator.clipboard.writeText(meetingLink);
          // toast({ title: 'Link Copied' });
        }}
        image="/icons/checked.svg"
        buttonIcon="/icons/copy.svg"
        className="text-center"
        buttonText="Copy Meeting Link"
      />
    </section>
  );
};

export default MeetingTypeList;
