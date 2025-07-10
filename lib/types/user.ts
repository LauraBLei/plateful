export type UserProfile = {
  id: string;
  created_at: string;
  name: string;
  email: string | null;
  bio: string;
  avatar: string;
  favorites: number[];
  followers: string[];
  following: string[];
  followersInfo?: Array<{
    id: string;
    name: string;
    avatar: string;
    bio: string;
  }>;
  followingInfo?: Array<{
    id: string;
    name: string;
    avatar: string;
    bio: string;
  }>;
};
