// types.ts
export interface Provider {
  id: string;
  name: string;
  title: string;
  avatarUrl: string;
  photoUrl?: string;
  availability: string;
  location: string;
  education: string;
  languages: string[];
  bio: string;
}
