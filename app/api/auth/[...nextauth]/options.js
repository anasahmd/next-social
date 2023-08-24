import User from '@/app/models/User';
import { compare } from 'bcrypt';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
const options = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
		CredentialsProvider({
			name: 'Next Social',
			credentials: {
				email: {
					label: 'Email',
					type: 'email',
					placeholder: 'Enter your email',
				},
				password: {
					label: 'Password',
					type: 'password',
					placeholder: 'Enter your password',
				},
			},
			async authorize(credentials) {
				const user = await User.findOne({ email: credentials.email });
				const validPassword = await compare(
					credentials.password,
					user.password
				);
				if (validPassword) {
					return user;
				} else {
					return null;
				}
			},
		}),
	],

	session: {
		strategy: 'jwt',
	},

	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user._id;
				token.username = user.username;
			}
			return token;
		},
		async session({ session, token }) {
			session.user.id = token.id;
			session.user.username = token.username;
			return session;
		},
	},
	secret: process.env.NEXT_SECRET,
};

export default options;
