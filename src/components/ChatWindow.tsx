import { useState } from "react";

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: Date;
}

const MOCK_MESSAGES: Record<string, Message[]> = {
  "1": [
    {
      id: "1",
      senderId: "1",
      text: "Hey! Welcome to FriendLink!",
      timestamp: new Date(Date.now() - 3600000),
    },
    {
      id: "2",
      senderId: "current",
      text: "Thanks Chan! The app looks great!",
      timestamp: new Date(Date.now() - 3500000),
    },
  ],
  "2": [
    {
      id: "1",
      senderId: "2",
      text: "Hi there! How are you today?",
      timestamp: new Date(Date.now() - 7200000),
    },
  ],
};

interface ChatWindowProps {
  selectedUser: string | null;
  currentUser: string;
}

const ChatWindow = ({ selectedUser, currentUser }: ChatWindowProps) => {
  const [newMessage, setNewMessage] = useState("");
  const messages = selectedUser ? MOCK_MESSAGES[selectedUser] || [] : [];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedUser) return;

    console.log("Sending message:", newMessage, "to user:", selectedUser);
    
    // Add the new message to the messages array (in a real app, this would be sent to a backend)
    const newMessageObj = {
      id: Date.now().toString(),
      senderId: "current",
      text: newMessage,
      timestamp: new Date(),
    };
    
    MOCK_MESSAGES[selectedUser] = [...(MOCK_MESSAGES[selectedUser] || []), newMessageObj];
    setNewMessage("");
  };

  if (!selectedUser) {
    return (
      <div className="h-full flex items-center justify-center bg-chat-background">
        <p className="text-muted-foreground text-lg">
          Select a friend to start chatting
        </p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-chat-background">
      {/* Chat Header */}
      <div className="p-4 border-b border-accent flex items-center space-x-3">
        <img
          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedUser === "1" ? "Chan" : "Sally"}`}
          alt="User avatar"
          className="w-10 h-10 rounded-full"
        />
        <div>
          <p className="text-primary-foreground font-medium">
            {selectedUser === "1" ? "Chan Kim" : "Sally Park"}
          </p>
          <p className="text-sm text-muted-foreground">online</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.senderId === "current" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[70%] animate-message-in ${
                message.senderId === "current"
                  ? "bg-primary text-primary-foreground"
                  : "bg-chat-message text-secondary-foreground"
              } rounded-lg p-3`}
            >
              <p>{message.text}</p>
              <p className="text-xs opacity-70 mt-1">
                {new Date(message.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <form onSubmit={handleSendMessage} className="p-4 border-t border-accent">
        <div className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 p-2 rounded-md bg-chat-message text-primary-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatWindow;