import { Session } from "next-auth";

export interface customSession extends Session {
  user: {
    id: string;
    email?: string;
    image: string;
  };
}
