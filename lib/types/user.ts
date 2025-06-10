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
};
