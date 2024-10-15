export interface UserType {
  id: string;
  username?: string;
  email: string;
  image: string;
}

interface Creator {
  _id: string;
  email: string;
  username: string;
  image: string;
}
export interface Prompt {
  _id: string;
  prompt: string;
  tag: string;
  creator: Creator;
}

