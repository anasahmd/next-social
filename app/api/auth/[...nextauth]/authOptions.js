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
						const generateUniqueUsername = async (username, random = 1) => {
							let genUsername = username;
							if (random !== 1) {
								genUsername =
									genUsername + String(Math.floor(Math.random() * random));
							}
							let user = await User.findOne({ username: genUsername });
							if (user) {
								return generateUniqueUsername(username, random * 10);
							} else {
								return genUsername;
							}
						};

						const username = await generateUniqueUsername(
							user.email.split('@')[0]
						);

						const newUser = new User({
							fullName: user.name,
							email: user.email,
							username,
							dp: { url: user.image },
						});
						const saveUser = await newUser.save();
						user.id = saveUser._id;
						user.username = saveUser.username;
						user.image = saveUser.dp.url;
						return true;
					}
				}
			}
			return true;
		},
		async jwt({ token, user }) {
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
