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
				username: {
					label: 'Username',
					type: 'text',
					placeholder: 'Enter your username',
				},
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
			async authorize(credentials, req) {
				const user = { id: '1', name: 'J Smith', email: 'jsmith@example.com' };

				if (user) {
					return user;
				} else {
					return null;
				}
			},
		}),
	],
};

export default options;
