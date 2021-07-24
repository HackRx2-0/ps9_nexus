import { Container, Grid } from '@material-ui/core';
import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Bot from './chatbbot/Bot';
import DiabetesCareBasic from './Pages/DiabetesCareBasic';
import HealthPrime from './Pages/HealthPrime';
import HomePage from './Pages/HomePage';
import users from './Data/usersData';
import UserPanel from './Components/UserPanel';
import BajajHeading from './Components/BajajHeading';
import NavigationPanel from './Components/NavigationPanel';

class App extends Component {
	state = { user: users[0] };

	changeUser = (activeUser) => {
		this.setState({
			user: activeUser,
		});
	};

	render() {
		return (
			<>
				<Container
					maxWidth='lg'
					style={{
						paddingTop: '2rem',
						paddingBottom: '1rem',
					}}
				>
					<Grid
						container
						direction='column'
						justifyContent='center'
						alignItems='center'
						spacing={3}
					>
						<Grid item>
							<BajajHeading />
							<Switch>
								<Route
									path='/'
									exact
									render={() => (
										<HomePage user={this.state.user} />
									)}
								/>
								<Route
									path='/diabetescarebasic'
									exact
									render={() => (
										<DiabetesCareBasic
											user={this.state.user}
										/>
									)}
								/>
								<Route
									path='/healthprime'
									exact
									render={() => (
										<HealthPrime user={this.state.user} />
									)}
								/>
							</Switch>
						</Grid>
						<Grid item>
							<UserPanel
								changeUser={this.changeUser}
								currentUser={this.state.user}
							/>
						</Grid>
						<Grid item>
							<NavigationPanel />
						</Grid>
					</Grid>
					<Bot user={this.state.user} />
				</Container>
			</>
		);
	}
}

export default withRouter(App);
