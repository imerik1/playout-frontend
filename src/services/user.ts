import { api } from '~/services';

type UserSignIn = {
	email: string;
	password: string;
};

type UserSignUp = {
	first_name: string;
	last_name: string;
	username: string;
	email: string;
	birthday: string;
	password: string;
	confirm_password: string;
};

type ChangePassword = {
	password: string;
	confirm_password: string;
	forgot_password_id: string;
};

type ByUser = {
	[key: string]:
		| string
		| number
		| {
				contains: string;
		  };
};

type QueryUser = {
	first_name: boolean;
	username: boolean;
	email: boolean;
	last_name: boolean;
	birthday: boolean;
	created_at: boolean;
	updated_at: boolean;
	metadata: {
		select: {
			image_photo: true;
		};
	};
};

class User {
	static async signIn(user: UserSignIn | {} = {}) {
		return await api.post<{ data: string }>('v1/auth/sign-in', user);
	}

	static async forgotPassword(email: string) {
		return await api.post<void>('v1/user/forgot-password', { email });
	}

	static async changePassword(changePassword: ChangePassword) {
		return await api.post('v1/user/change-password', changePassword);
	}

	static async getProfile<T>(query: Partial<QueryUser>) {
		return await api.post<{ data: T }>('v1/user/profile', { query });
	}

	static async signOut() {
		return await api.delete('v1/auth/sign-out');
	}

	static async findUsers<T>(by: Partial<ByUser>, query: Partial<QueryUser>) {
		return await api.post<{ data: T[] }>('v1/user/all', { by, query });
	}

	static async signUp(user: UserSignUp) {
		return await api.post('v1/user/create', user);
	}

	static async confirmAccount(confirm_account_id: string) {
		return await api.post('v1/user/confirm-account', { confirm_account_id });
	}
}

export { User };
