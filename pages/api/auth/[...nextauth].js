import { connectDB } from "@/util/database";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs'

export const authOptions = {
  providers: [
    CredentialsProvider({
      id: "email-password-credential",
      name: 'Credentials',
      type: 'credentials',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "test@test.com" },
        password: { label: "Password", type: "password" }
    },
      async authorize(credentials) {
        let db = (await connectDB).db('jeju');
        let user = await db.collection('user_cred').findOne({email : credentials.email})
        if (!user) {
          console.log('이메일이 존재하지 않음');
          return null
        }
        const pwcheck = await bcrypt.compare(credentials.password, user.password);
        if (!pwcheck) {
          console.log('비밀번호가 틀렸습니다');
          return null
        }
        return user
      }
    })
  ],

  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60  //1일 로그인 유지
  },


  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = {};
        token.user.name = user.name
        token.user.email = user.email
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.user = token.user;  
    
      return session;
    },
  },

  secret: process.env.NEXT_PUBLIC_PASSWORD ,
  pages: {
    signIn: "/login",
}
};
export default NextAuth(authOptions); 