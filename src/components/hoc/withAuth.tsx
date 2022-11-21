import React, { Component } from 'react';
import Router from 'next/router';
import { User } from '~/services';

export default function withAuth(AuthComponent: any) {
	return class Authenticated extends Component {
		static async getInitialProps(ctx: any) {
			// Ensures material-ui renders the correct css prefixes server-side
			let userAgent;
			if (process.browser) {
				userAgent = navigator.userAgent;
			} else {
				userAgent = ctx.req.headers['user-agent'];
			}

			// Check if Page has a `getInitialProps`; if so, call it.
			const pageProps =
				AuthComponent.getInitialProps &&
				(await AuthComponent.getInitialProps(ctx));
			// Return props.
			return { ...pageProps, userAgent };
		}

		constructor(props: any) {
			super(props);
			this.state = {
				isLoading: true,
			};
		}

		componentDidMount() {
			User.getProfile({ first_name: true })
				.then(() => {
					this.setState({ isLoading: false });
				})
				.catch(() => {
					Router.push('/');
				});
		}

		render() {
			return (
				<div>
					{(this.state as any).isLoading ? (
						<></>
					) : (
						<AuthComponent {...this.props} />
					)}
				</div>
			);
		}
	};
}
