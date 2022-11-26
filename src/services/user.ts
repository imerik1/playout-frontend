import { AxiosError } from 'axios';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import moment from 'moment';
import { api, ResponseError } from '~/services';
import { PLAYOUT_JWT } from '~/utils';

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

type ByUser =
	| any
	| {
			[key: string]:
				| string
				| number
				| {
						contains: string;
				  };
	  };

type QueryUser =
	| {
			first_name: boolean;
			username: boolean;
			email: boolean;
			last_name: boolean;
			birthday: boolean;
			created_at: boolean;
			updated_at: boolean;
			posts:
				| {
						select: {
							body: boolean;
							created_at: boolean;
						};
				  }
				| boolean;
			metadata:
				| {
						select: {
							image_photo: true;
						};
				  }
				| boolean;
			notifications:
				| {
						select: {
							id: boolean;
							message: boolean;
							read: boolean;
							created_at: boolean;
							type: boolean;
							link: boolean;
						};
				  }
				| boolean;
	  }
	| Record<string, any>;

type QueryPaginated = {
	take?: number;
	index?: number;
};

class User {
	static async signIn(
		user: UserSignIn | {} = {},
		session: boolean = false,
	): Promise<any> {
		return await api
			.post<{ data: string }>('v1/auth/sign-in', user, {
				headers: {
					Authorization: getCookie(PLAYOUT_JWT),
				},
			})
			.then(({ data }) => {
				deleteCookie(PLAYOUT_JWT);
				setCookie(PLAYOUT_JWT, data.data, {
					path: '/',
					expires: !session
						? moment().utc().add(200, 'year').toDate()
						: undefined,
					sameSite: 'none',
					secure: true,
				});
			})
			.catch((err) => {
				throw err;
			});
	}

	static async follow(username: string) {
		return await api.post<void>(
			'v1/user/follow',
			{ username },
			{
				headers: {
					Authorization: getCookie(PLAYOUT_JWT),
				},
			},
		);
	}

	static async likePost(post_id: string) {
		return await api.post(
			`v1/user/like`,
			{ post_id },
			{
				headers: {
					Authorization: getCookie(PLAYOUT_JWT),
				},
			},
		);
	}

	static async getMyPosts({ take = 30, index = 1 }) {
		return await api.post(
			`v1/user/my-posts?take=${take}&index=${index}`,
			{},
			{
				headers: {
					Authorization: getCookie(PLAYOUT_JWT),
				},
			},
		);
	}

	static async forgotPassword(email: string) {
		return await api.post<void>(
			'v1/user/forgot-password',
			{ email },
			{
				headers: {
					Authorization: getCookie(PLAYOUT_JWT),
				},
			},
		);
	}

	static async changePassword(changePassword: ChangePassword) {
		return await api.post('v1/user/change-password', changePassword, {
			headers: {
				Authorization: getCookie(PLAYOUT_JWT),
			},
		});
	}

	static async getProfile<T>(
		query: Partial<QueryUser>,
		where: Record<string, any> = {},
	) {
		return await api.post<{ data: T }>(
			'v1/user/profile',
			{ query, where },
			{
				headers: {
					Authorization: getCookie(PLAYOUT_JWT),
				},
			},
		);
	}

	static async updateUser(query: any) {
		return await api.patch('v1/user/update', query, {
			headers: {
				Authorization: getCookie(PLAYOUT_JWT),
			},
		});
	}

	static async signOut() {
		deleteCookie(PLAYOUT_JWT, {});
		return await api.delete('v1/auth/sign-out');
	}

	static async findUsers<T>(
		by: Partial<ByUser>,
		query: Partial<QueryUser>,
		{ take = 10, index = 1 }: QueryPaginated = { take: 10, index: 1 },
	) {
		return await api.post<{ data: T[] }>(
			`v1/user/all?take=${take}&index=${index}`,
			{ by, query },
			{
				headers: {
					Authorization: getCookie(PLAYOUT_JWT),
				},
			},
		);
	}

	static async signUp(user: UserSignUp) {
		return await api.post('v1/user/create', user, {
			headers: {
				Authorization: getCookie(PLAYOUT_JWT),
			},
		});
	}

	static async uploadPhoto(file: File) {
		const formData = new FormData();
		formData.append('metadata.update.image_photo', file);

		return await api.patch('v1/user/update', formData, {
			headers: {
				Authorization: getCookie(PLAYOUT_JWT),
				'Content-Type': 'multipart/form-data',
			},
		});
	}

	static async confirmAccount(confirm_account_id: string) {
		return await api.post(
			'v1/user/confirm-account',
			{ confirm_account_id },
			{
				headers: {
					Authorization: getCookie(PLAYOUT_JWT),
				},
			},
		);
	}
}

export { User };
