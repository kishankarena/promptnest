import NextAuth from "next-auth";

import { options } from "@/utils/authOptions";

const handler = NextAuth(options);

export { handler as GET, handler as POST };
