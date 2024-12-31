import { useState } from "react";
import UserProfile from "./UserProfile";

interface User {
  id: string;
  name: string;
  avatar: string;
  status: "online" | "offline" | "away";
}

const MOCK_USERS: User[] = [
  {
    id: "1",
    name: "Chan Kim",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Chan",
    status: "online",
  },
  {
    id: "2",
    name: "Sally Park",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sally",
    status: "online",
  }
];

interface SidebarProps {
  onSelectUser: (userId: string) => void;
  selectedUser: string | null;
  currentUser: string;
}

const Sidebar = ({ onSelectUser, selectedUser, currentUser }: SidebarProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = MOCK_USERS.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-accent">
        <h1 className="text-xl font-bold text-primary-foreground">Messages</h1>
      </div>

      {/* Search */}
      <div className="p-4">
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 rounded-md bg-chat-message text-primary-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* User List */}
      <div className="flex-1 overflow-y-auto">
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            onClick={() => onSelectUser(user.id)}
            className={`p-4 flex items-center space-x-3 cursor-pointer hover:bg-chat-hover transition-colors ${
              selectedUser === user.id ? "bg-chat-hover" : ""
            }`}
          >
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-10 h-10 rounded-full"
              />
              <div
                className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-muted ${
                  user.status === "online"
                    ? "bg-green-500"
                    : user.status === "away"
                    ? "bg-yellow-500"
                    : "bg-gray-500"
                }`}
              />
            </div>
            <div>
              <p className="text-primary-foreground font-medium">{user.name}</p>
              <p className="text-sm text-muted-foreground capitalize">
                {user.status}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* User Profile */}
      <UserProfile />
    </div>
  );
};

export default Sidebar;