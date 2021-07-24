import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import users from '../Data/usersData';
import { Button } from '@material-ui/core';

const StyledTableCell = withStyles((theme) => ({
	head: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	body: {
		fontSize: 14,
	},
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
	root: {
		'&:nth-of-type(odd)': {
			backgroundColor: theme.palette.action.hover,
		},
	},
}))(TableRow);

const style = {
	table: {
		minWidth: '400px',
	},
};

class UserPanel extends Component {
	render() {
		const { changeUser, currentUser, classes } = this.props;
		return (
			<TableContainer component={Paper} className={classes.table}>
				<Table aria-label='customized table'>
					<TableHead>
						<TableRow>
							<StyledTableCell align='center'>
								User Name
							</StyledTableCell>
							<StyledTableCell align='center'>
								Gender
							</StyledTableCell>
							<StyledTableCell align='center'>
								Age
							</StyledTableCell>
							<StyledTableCell align='center'>
								Health Conditions
							</StyledTableCell>
							<StyledTableCell align='center'>
								Status
							</StyledTableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{users.map((user) => (
							<StyledTableRow key={user.name}>
								<StyledTableCell component='th' scope='row'>
									{user.name}
								</StyledTableCell>
								<StyledTableCell component='th' scope='row'>
									{user.gender}
								</StyledTableCell>
								<StyledTableCell component='th' scope='row'>
									{user.age}
								</StyledTableCell>
								<StyledTableCell component='th' scope='row'>
									{user.healthConditions &&
										user.healthConditions.map(
											(condition) => condition + ' '
										)}
								</StyledTableCell>
								<StyledTableCell align='right'>
									{currentUser.email !== user.email && (
										<Button
											color='primary'
											variant='contained'
											onClick={() => {
												changeUser(user);
											}}
										>
											Log In
										</Button>
									)}
									{currentUser.email === user.email && (
										<Button variant='contained' disabled>
											Active
										</Button>
									)}
								</StyledTableCell>
							</StyledTableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		);
	}
}

export default withStyles(style)(UserPanel);
