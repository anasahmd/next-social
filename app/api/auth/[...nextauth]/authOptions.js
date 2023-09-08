import Connect from '@/app/db/dbConnect';
import User from '@/app/models/User';
import { compare } from 'bcrypt';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
const authOptions = {
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
				await Connect();
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
	secret: process.env.NEXTAUTH_SECRET,

	callbacks: {
		async signIn({ user, account, profile }) {
			await Connect();
			if (account.provider === 'google') {
				if (profile.email_verified) {
					const data = await User.findOne({ email: profile.email });
					if (data) {
						user.id = data._id;
						user.username = data.username;
						return true;
					} else {
						return false;
					}
				}
			}
			return true;
		},
		async jwt({ token, user }) {
			console.log(user);
			if (user) {
				return {
					...token,
					id: user._id,
					username: user.username,
				};
			}
			return token;
		},
		async session({ session, token }) {
			session.user.id = token.id;
			session.user.username = token.username;
			return session;
		},
	},
	pages: {
		signIn: '/login',
	},
};

export default authOptions;
