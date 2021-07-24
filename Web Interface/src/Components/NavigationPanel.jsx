import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { Link, useLocation } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	link: {
		textDecoration: 'none',
		color: '#F3F3F3',
	},
}));

function NavigationPanel() {
	const classes = useStyles();
	const pathname = useLocation().pathname;

	return (
		<ButtonGroup
			variant='contained'
			color='primary'
			aria-label='contained primary button group'
		>
			<Button disabled={pathname === '/'}>
				<Link to='/' className={classes.link}>
					Home
				</Link>
			</Button>
			<Button disabled={pathname === '/diabetescarebasic'}>
				<Link to='/diabetescarebasic' className={classes.link}>
					Diabetes Care Basic
				</Link>
			</Button>
			<Button disabled={pathname === '/healthprime'}>
				<Link to='/healthprime' className={classes.link}>
					Health Prime
				</Link>
			</Button>
		</ButtonGroup>
	);
}

export default NavigationPanel;
