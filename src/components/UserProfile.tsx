import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useToast } from "./ui/use-toast";

interface UserProfileData {
  displayName: string;
  avatar: string;
  status: "online" | "offline" | "away";
}

const UserProfile = () => {
  const { toast } = useToast();
  const [profile, setProfile] = useState<UserProfileData>({
    displayName: "You",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=CurrentUser",
    status: "online",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(profile.displayName);

  const handleSave = () => {
    if (tempName.trim()) {
      setProfile(prev => ({
        ...prev,
        displayName: tempName,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${tempName}`,
      }));
      setIsEditing(false);
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
    }
  };

  return (
    <div className="p-4 border-t border-accent">
      <div className="flex items-center space-x-3">
        <img
          src={profile.avatar}
          alt="Your avatar"
          className="w-10 h-10 rounded-full"
        />
        <div className="flex-1">
          {isEditing ? (
            <div className="flex gap-2">
              <Input
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                className="h-8"
                placeholder="Enter your name"
              />
              <Button size="sm" onClick={handleSave}>Save</Button>
              <Button size="sm" variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <p className="text-primary-foreground font-medium">{profile.displayName}</p>
              <Button size="sm" variant="ghost" onClick={() => setIsEditing(true)}>Edit</Button>
            </div>
          )}
          <p className="text-sm text-muted-foreground capitalize">{profile.status}</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;