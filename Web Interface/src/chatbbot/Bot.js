import React, { Component } from 'react';
import history from '../history';

class Bot extends Component {
	getCurrentPage = () => {
		const pathname = history.location.pathname;
		switch (pathname) {
			case '/':
				return 'Home';
			case '/diabetescarebasic':
				return 'Diabetes Care Basic';
			case '/healthprime':
				return 'Health Prime';
			default:
				return 'default';
		}
	};

	setCurrentPage = () => {
		const { user } = this.props;
		// let pages = {
		// 	'/': 'home',
		// 	'/diabetescarebasic': 'diabetes',
		// 	'/healthprime': 'prime',
		// };
		// const pathname = history.location.pathname;
		// let defaultSettings = {
		// 	WELCOME_MESSAGE: pages[pathname],
		// };

		// if (pages[pathname]) window.Kommunicate.updateSettings(defaultSettings);

		let chatContext = {
			userDetails: { ...user },
			siteDetails: { currentPage: this.getCurrentPage() },
		};

		window.Kommunicate.updateChatContext(chatContext);
	};

	setUserDetails = () => {
		if (window.Kommunicate) {
			//Set user details in communicate and update the chat context
			const { user } = this.props;
			console.log('Current User : ' + user.name);

			let userDetail = {
				email: user.email,
				displayName: user.name,
				metadata: {
					age: user.age.toString(),
					gender: user.gender,
					healthConditions: JSON.stringify(user.healthConditions),
				},
			};
			let chatContext = {
				userDetails: { ...user },
				siteDetails: { currentPage: this.getCurrentPage() },
			};

			window.Kommunicate.updateUser(userDetail);
			window.Kommunicate.updateChatContext(chatContext);
		}
	};

	initializeKommunicate = (user) => {
		((d, m) => {
			let kommunicateSettings = {
				appId: '2c65b709479f97d29c7b123619a81e21f',
				popupWidget: true,
				automaticChatOpenOnNavigation: true,
				onInit: () => {
					this.setCurrentPage();
				},
			};
			if (user.email)
				kommunicateSettings = {
					appId: '2c65b709479f97d29c7b123619a81e21f',
					popupWidget: true,
					automaticChatOpenOnNavigation: true,
					userId: user.email,
					email: user.email,
					password: user.email,
					authenticationTypeId: 1,
					onInit: () => {
						this.setUserDetails();
					},
				};

			var s = document.createElement('script');
			s.type = 'text/javascript';
			s.async = true;
			s.src = 'https://widget.kommunicate.io/v2/kommunicate.app';
			var h = document.getElementsByTagName('head')[0];
			h.appendChild(s);
			window.kommunicate = m;
			m._globals = kommunicateSettings;
		})(document, window.kommunicate || {});
	};

	async componentDidMount() {
		if (window.Kommunicate) await window.Kommunicate.logout();
		this.initializeKommunicate(this.props.user);
	}

	async componentDidUpdate(prevProps) {
		if (prevProps.user.email !== this.props.user.email) {
			if (window.Kommunicate) await window.Kommunicate.logout();
			this.initializeKommunicate(this.props.user);
		} else this.setCurrentPage();
	}

	render() {
		return <div></div>;
	}
}

export default Bot;
