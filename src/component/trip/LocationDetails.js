import React, { Component } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';

class LocationDetail extends Component {
	switchToEdit = location => {
		this.props.toggleDrawer(location);
		this.props.closeLocDrawer();
	};

	render() {
		console.log('deets props', this.props);
		return (
			<>
				<Fab
					color='primary'
					size='small'
					onClick={e => this.props.closeLocDrawer()}
				>
					<CloseIcon />
				</Fab>
				<DialogTitle className='modalTitle'>
					{this.props.location.name} <br />
					{this.props.location.locationType.locationType}
				</DialogTitle>
				{this.props.location.address && (
					<DialogTitle>Address: {this.props.location.address}</DialogTitle>
				)}
				{this.props.location.summary && (
					<DialogTitle>Description: {this.props.location.summary}</DialogTitle>
				)}
				{this.props.location.url && (
					<DialogTitle>{this.props.location.url}</DialogTitle>
				)}

				{this.props.location.price && (
					<DialogTitle>Est Price: ${this.props.location.price}</DialogTitle>
				)}

				<Fab
					variant='extended'
					size='small'
					color='primary'
					onClick={() => this.switchToEdit(this.props.location)}
				>
					<EditIcon />
					Edit
				</Fab>
			</>
		);
	}
}

export default LocationDetail;
