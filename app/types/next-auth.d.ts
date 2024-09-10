import  { DefaultSession } from "next-auth";
import { UserType } from "./commonTypes";

declare module "next-auth" {
  interface Session {
    user: UserType & DefaultSession["user"];
  }
}
