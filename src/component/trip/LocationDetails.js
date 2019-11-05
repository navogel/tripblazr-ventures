import React, { Component } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import YouTube from 'react-youtube';

class LocationDetail extends Component {
	switchToEdit = location => {
		this.props.toggleDrawer(location);
		this.props.closeLocDrawer();
	};

	truncate = str => {
		console.log('trunked try');
		return str.length > 10 ? str.substring(0, 7) + '...' : str;
	};

	render() {
		// let siteLink = 'https://';
		console.log('deets props', this.props);

		return (
			<>
				<div className='locDetailsWrapper'>
					<div className='absoluteCloseFab'>
						<Fab
							color='primary'
							size='small'
							onClick={e => this.props.closeLocDrawer()}
						>
							<CloseIcon />
						</Fab>
					</div>
					<div className='locCard'>
						<DialogTitle className='modalTitle'>
							{this.props.location.name} {' - '}
							{this.props.location.locationType.locationType}
						</DialogTitle>
						{this.props.location.address && (
							<h3>Address: {this.props.location.address}</h3>
						)}
						{this.props.location.summary && (
							<>
								<h3>Description:</h3> <p>{this.props.location.summary}</p>
							</>
						)}
						{this.props.location.url && (
							<h3 className='urlLink'>
								<a href={this.props.location.url} target='_blank'>
									{this.props.location.url}
								</a>
							</h3>
						)}

						{this.props.location.price && (
							<h3>Est Price: ${this.props.location.price}</h3>
						)}
						<Button
							size='small'
							color='primary'
							onClick={() => this.switchToEdit(this.props.location)}
						>
							edit details
						</Button>
					</div>
					{/* <Fab
					variant='extended'
					size='small'
					color='primary'
					onClick={() => this.switchToEdit(this.props.location)}
				>
					<EditIcon />
					Edit
				</Fab> */}
					<div className='locVideo'>
						<div className='video-responsive'>
							<iframe
								width='560'
								height='315'
								src='https://www.youtube.com/embed/Z8cjC2pViSo'
								frameborder='0'
								allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
								allowfullscreen
							></iframe>
						</div>
						<div className='video-responsive'>
							<iframe
								width='560'
								height='315'
								src='https://www.youtube.com/embed/Z8cjC2pViSo'
								frameborder='0'
								allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
								allowfullscreen
							></iframe>
						</div>
						<div className='video-responsive'>
							<iframe
								width='560'
								height='315'
								src='https://www.youtube.com/embed/Z8cjC2pViSo'
								frameborder='0'
								allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
								allowfullscreen
							></iframe>
						</div>
					</div>
				</div>
			</>
		);
	}
}

export default LocationDetail;
