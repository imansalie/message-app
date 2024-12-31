import { useState } from "react";
import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";
import Auth from "./Auth";
import { useIsMobile } from "@/hooks/use-mobile";

const ChatLayout = () => {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<string>("");
  const isMobile = useIsMobile();
  const [showSidebar, setShowSidebar] = useState(!isMobile);

  const handleLogin = (username: string) => {
    setIsAuthenticated(true);
    setCurrentUser(username);
  };

  const toggleSidebar = () => setShowSidebar(!showSidebar);

  if (!isAuthenticated) {
    return <Auth onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen bg-secondary">
      {/* Sidebar */}
      <div
        className={`${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out fixed md:relative z-30 h-full ${
          isMobile ? "w-[80%]" : "w-64"
        } bg-muted`}
      >
        <Sidebar 
          onSelectUser={setSelectedUser} 
          selectedUser={selectedUser}
          currentUser={currentUser}
        />
      </div>

      {/* Chat Window */}
      <div className="flex-1 relative">
        <button
          onClick={toggleSidebar}
          className="md:hidden absolute top-4 left-4 z-20 p-2 bg-primary rounded-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white"
          >
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
        <ChatWindow selectedUser={selectedUser} currentUser={currentUser} />
      </div>
    </div>
  );
};

export default ChatLayout;