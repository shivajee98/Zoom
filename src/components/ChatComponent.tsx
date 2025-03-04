import { Channel, ChannelHeader, MessageList, MessageInput } from 'stream-chat-react';
import { StreamChat } from 'stream-chat';

const chatClient = StreamChat.getInstance(`${process.env.NEXT_PUBLIC_STREAM_API_KEY}`);

const ChatComponent = () => {
  const channel = chatClient.channel('messaging', 'general');

  return (
    <Channel channel={channel}>
      <ChannelHeader />
      <MessageList />
      <MessageInput />
    </Channel>
  );
};

export default ChatComponent;
