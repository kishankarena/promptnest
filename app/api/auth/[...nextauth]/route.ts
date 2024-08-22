import NextAuth from "next-auth";
import { custom } from "openid-client";

import { options } from "@/utils/authOptions";

custom.setHttpOptionsDefaults({
  timeout: 10000, 
});

const handler = NextAuth(options);

export { handler as GET, handler as POST };
