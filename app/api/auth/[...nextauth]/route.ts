import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

// Mock user database
const users = [
  {
    id: "1",
    name: "John Doe",
    email: "student@example.com",
    password: "password123",
    role: "student",
    points: 350,
    level: 2,
    image: "https://i.pravatar.cc/150?u=1",
  },
  {
    id: "2",
    name: "Emily Taylor",
    email: "recruiter@example.com",
    password: "password123",
    role: "recruiter",
    image: "https://i.pravatar.cc/150?u=recruiter1",
  },
  {
    id: "3",
    name: "Admin User",
    email: "admin@example.com",
    password: "password123",
    role: "admin",
    image: "https://i.pravatar.cc/150?u=admin1",
  },
];

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "mock-client-id",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "mock-client-secret",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        
        // Find user in mock database
        const user = users.find(user => user.email === credentials.email);
        
        // Check password (in a real app, you'd use bcrypt to compare hashed passwords)
        if (user && user.password === credentials.password) {
          // Return user without password
          const { password, ...userWithoutPassword } = user;
          return userWithoutPassword;
        }
        
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Add role and other custom fields to the token
      if (user) {
        token.role = user.role;
        token.points = user.points;
        token.level = user.level;
      }
      return token;
    },
    async session({ session, token }) {
      // Add role and other custom fields to the session
      if (session.user) {
        session.user.id = token.sub;
        session.user.role = token.role;
        session.user.points = token.points;
        session.user.level = token.level;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
  },
});

export { handler as GET, handler as POST };
