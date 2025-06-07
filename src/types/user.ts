export type User = {
  id: string;
  email: string | null;
  aud: string;
  created_at: string;
  role: string;
  user_metadata: UserMeta;
};

export type UserMeta = {
  avatar_url: string;
  email: string;
  email_verified: boolean;
  full_name: string;
  iss: string;
  name: string;
  picture: string;
  provider_id: string;
  sub: string;
};
