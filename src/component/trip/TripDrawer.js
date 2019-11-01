import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import LocationEditForm from './LocationEditForm';

const styles = {
	list: {
		width: 500
	},
	fullList: {
		width: 'auto'
	}
};

class TripDrawer extends React.Component {
	state = {
		right: false,
		location: {}
	};

	toggleDrawer = (side, open) => () => {
		this.setState({
			[side]: open
		});
	};

	openDrawer = obj => {
		this.setState({
			right: true,
			location: obj
		});
	};

	closeDrawer = () => {
		this.setState({
			right: false,
			location: {}
		});
	};

	render() {
		const { classes } = this.props;

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
			<div>
				{/* <Button onClick={this.toggleDrawer('right', true)}>Open Right</Button> */}

				<Drawer
					anchor='right'
					open={this.state.right}
					// onClose={this.toggleDrawer('right', false)}
				>
					<div
						tabIndex={0}
						role='button'
						// onClick={this.toggleDrawer('right', false)}
						//onKeyDown={this.toggleDrawer('right', false)}
					>
						{/* {sideList} */}
						<div className='drawerWrapper'>
							<LocationEditForm
								location={this.state.location}
								getData={this.props.getData}
								closeDrawer={this.closeDrawer}
							/>
						</div>
					</div>
				</Drawer>
			</div>
		);
	}
}

TripDrawer.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TripDrawer);
