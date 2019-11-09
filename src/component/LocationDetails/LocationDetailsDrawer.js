import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import LocationDetails from './LocationDetails';

const styles = {
	list: {
		width: 500
	},
	fullList: {
		width: 'auto'
	}
};

class LocDrawer extends React.Component {
	state = {
		right: false,
		location: {}
	};

	toggleLocDrawer = (side, open) => () => {
		this.setState({
			[side]: open
		});
	};

	openLocDrawer = obj => {
		this.setState({
			right: true,
			location: obj
		});
	};

	closeLocDrawer = () => {
		this.setState({
			right: false
		});
	};

	render() {
		//const { classes } = this.props;

		// const sideList = (
		// 	<div className={classes.list}>
		// 		<List>
		// 			{['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
		// 				<ListItem button key={text}>
		// 					<ListItemIcon>
		// 						{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
		// 					</ListItemIcon>
		// 					<ListItemText primary={text} />
		// 				</ListItem>
		// 			))}
		// 		</List>
		// 		<Divider />
		// 		<List>
		// 			{['All mail', 'Trash', 'Spam'].map((text, index) => (
		// 				<ListItem button key={text}>
		// 					<ListItemIcon>
		// 						{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
		// 					</ListItemIcon>
		// 					<ListItemText primary={text} />
		// 				</ListItem>
		// 			))}
		// 		</List>
		// 	</div>
		// );

		// const fullList = (
		// 	<div className={classes.fullList}>
		// 		<List>
		// 			{['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
		// 				<ListItem button key={text}>
		// 					<ListItemIcon>
		// 						{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
		// 					</ListItemIcon>
		// 					<ListItemText primary={text} />
		// 				</ListItem>
		// 			))}
		// 		</List>
		// 		<Divider />
		// 		<List>
		// 			{['All mail', 'Trash', 'Spam'].map((text, index) => (
		// 				<ListItem button key={text}>
		// 					<ListItemIcon>
		// 						{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
		// 					</ListItemIcon>
		// 					<ListItemText primary={text} />
		// 				</ListItem>
		// 			))}
		// 		</List>
		// 	</div>
		// );

		return (
			<>
				{/* <Button onClick={this.toggleDrawer('right', true)}>Open Right</Button> */}
				{/* <ClickAwayListener onClickAway={this.closeDrawer}> */}
				<Drawer
					anchor='right'
					open={this.state.right}
					onClose={this.toggleLocDrawer('right', false)}
				>
					<div
						tabIndex={0}
						role='button'
						// onClick={this.toggleDrawer('right', false)}
						//onKeyDown={this.toggleDrawer('right', false)}
					>
						{/* {sideList} */}
						<div className='drawerWrapper'>
							<LocationDetails
								location={this.state.location}
								getData={this.props.getData}
								closeLocDrawer={this.closeLocDrawer}
								toggleDrawer={this.props.toggleDrawer}
								activeUser={this.props.activeUser}
								publicTrip={this.props.publicTrip}
							/>
						</div>
					</div>
				</Drawer>
				{/* </ClickAwayListener> */}
			</>
		);
	}
}

LocDrawer.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LocDrawer);
