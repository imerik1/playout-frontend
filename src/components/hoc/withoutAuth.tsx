import React, { Component } from 'react';
import Router from 'next/router';
import { User } from '~/services';

export default function withoutAuth(NonAuthComponent: any) {
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
				NonAuthComponent.getInitialProps &&
				(await NonAuthComponent.getInitialProps(ctx));
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
					Router.push('/dashboard');
				})
				.catch(() => {
					this.setState({ isLoading: false });
				});
		}

		render() {
			return (
				<div>
					{(this.state as any).isLoading ? (
						<></>
					) : (
						<NonAuthComponent {...this.props} />
					)}
				</div>
			);
		}
	};
}
