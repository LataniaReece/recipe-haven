import "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    isNewUser: boolean;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      isNewUser: boolean;
    };
  }

  interface JWT {
    id: string;
    email: string;
  }
}
