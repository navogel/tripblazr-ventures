import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
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


		return (
			<>
				
				<Drawer
					anchor='right'
					open={this.state.right}
					onClose={this.toggleDrawer('right', false)}
				>
					<div
						tabIndex={0}
						role='button'
						
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
				{/* </ClickAwayListener> */}
			</>
		);
	}
}

TripDrawer.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TripDrawer);
