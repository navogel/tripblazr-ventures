import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
// import MessagesManager from '../../modules/MessagesManager';
// import EditMessageForm from './EditMessageForm';
import moment from 'moment';
import TripManager from '../../modules/TripManager';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import NoteEditForm from './NoteEditForm';

class LocationNoteCard extends Component {
	state = {
		myCard: '',
		note: false,
		url: false,
		YT: false,
		open: false
	};

	handleDelete = id => {
		TripManager.deleteLocationNote(id).then(() => {
			this.props.getNotes();
		});
	};

	//edit modal control
	handleClickOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	componentDidMount() {
		if (this.props.note.type === 'YT') {
			this.setState({ YT: true });
		} else if (this.props.note.type === 'note') {
			this.setState({ note: true });
		} else if (this.props.note.type === 'url') {
			this.setState({ url: true });
		}
	}

	// componentDidMount() {
	// 	if (parseInt(this.props.activeUSer) === this.props.note.userId) {
	// 		this.setState({
	// 			myCard: true
	// 		});
	// 	} else {
	// 		this.setState(
	// 			{
	// 				myCard: false
	// 			}
	// 			// () => console.log('my card state', this.state)
	// 		);
	// 	}
	// }

	render() {
		let timeStamp = moment(this.props.note.date).fromNow();

		return (
			<>
				{this.state.note && (
					<div className='locNoteCard'>
						<div className='myCard'>
							<div className='msgHeader'>
								{this.props.note.title !== '' ? (
									<p>
										<b>{this.props.note.title}</b>
									</p>
								) : (
									''
								)}
							</div>
							<DialogTitle>{this.props.note.note}</DialogTitle>
							<div className='cardButtonRow'>
								{/* <EditMessageForm
								{...this.props.Note}
								getData={this.props.getNotes}
							/> */}
								{this.props.note.editTimeStamp !== '' ? (
									<p className='editStamp'>
										Last Edited:{' '}
										{moment(this.props.note.editTimeStamp).fromNow()}
									</p>
								) : (
									<p className='editStamp'>Posted: {timeStamp} </p>
								)}
								{!this.props.publicTrip && (
									<>
										<Button
											size='small'
											color='primary'
											onClick={() => this.handleDelete(this.props.note.id)}
										>
											Delete
										</Button>
										<Button
											size='small'
											color='primary'
											onClick={() => this.handleClickOpen()}
										>
											Edit
										</Button>
									</>
								)}
							</div>
						</div>
					</div>
				)}

				{this.state.url && (
					<div className='locNoteCard'>
						<div className='myCard'>
							<div className='msgHeader'>
								{this.props.note.title !== '' ? (
									<p>
										<b>{this.props.note.title}</b>
									</p>
								) : (
									''
								)}
							</div>
							<DialogTitle className='urlNoteLink'>
								<a
									href={this.props.note.note}
									rel='noopener noreferrer'
									target='_blank'
								>
									{this.props.note.note}
								</a>
							</DialogTitle>
							<div className='cardButtonRow'>
								{/* <EditMessageForm
								{...this.props.Note}
								getData={this.props.getNotes}
							/> */}
								{this.props.note.editTimeStamp !== '' ? (
									<p className='editStamp'>
										Last Edited:{' '}
										{moment(this.props.note.editTimeStamp).fromNow()}
									</p>
								) : (
									<p className='editStamp'>Posted: {timeStamp} </p>
								)}
								{!this.props.publicTrip && (
									<>
										<Button
											size='small'
											color='primary'
											onClick={() => this.handleDelete(this.props.note.id)}
										>
											Delete
										</Button>
										<Button
											size='small'
											color='primary'
											onClick={() => this.handleClickOpen()}
										>
											Edit
										</Button>
									</>
								)}
							</div>
						</div>
					</div>
				)}

				{this.state.YT && (
					<div className='locNoteCard'>
						<div className='myCard'>
							<div className='msgHeader'>
								{this.props.note.title !== '' ? (
									<p>
										<b>{this.props.note.title}</b>
									</p>
								) : (
									''
								)}
							</div>
							<div className='video-responsive'>
								<iframe
									title={this.props.note.id}
									width='560'
									height='315'
									src={`https://www.youtube.com/embed/${this.props.note.note}`}
									frameBorder='0'
									allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
									allowFullScreen
								></iframe>
							</div>
							<div className='cardButtonRow'>
								{/* <EditMessageForm
								{...this.props.Note}
								getData={this.props.getNotes}
							/> */}
								{this.props.note.editTimeStamp !== '' ? (
									<p className='editStamp'>
										Last Edited:{' '}
										{moment(this.props.note.editTimeStamp).fromNow()}
									</p>
								) : (
									<p className='editStamp'>Posted: {timeStamp} </p>
								)}
								{!this.props.publicTrip && (
									<>
										<Button
											size='small'
											color='primary'
											onClick={() => this.handleDelete(this.props.note.id)}
										>
											Delete
										</Button>
										<Button
											size='small'
											color='primary'
											onClick={() => this.handleClickOpen()}
										>
											Edit
										</Button>
									</>
								)}
							</div>
						</div>
					</div>
				)}
				<Dialog
					open={this.state.open}
					onClose={this.handleClose}
					aria-labelledby='form-dialog-title'
				>
					<NoteEditForm
						note={this.props.note}
						handleClose={this.handleClose}
						activeUser={this.props.activeUser}
						getNotes={this.props.getNotes}
					/>
				</Dialog>
			</>
		);
	}
}

export default LocationNoteCard;

// multi user notes which markes name and user - save for later?

// <>
// 				<div className='locNoteCard'>
// 					{this.state.myCard ? (
// 						<div className='myCard'>
// 							<p>Posted: {timeStamp} </p>
// 							<DialogTitle>{this.props.note.message}</DialogTitle>
// 							{this.props.note.editTimeStamp !== '' ? (
// 								<p>
// 									Last Edited {moment(this.props.note.editTimeStamp).fromNow()}
// 								</p>
// 							) : (
// 								''
// 							)}
// 							<div className='cardButtonRow'>
// 								{/* <EditMessageForm
// 								{...this.props.Note}
// 								getData={this.props.getNotes}
// 							/> */}

// 								<Button
// 									size='small'
// 									color='primary'
// 									onClick={() => this.handleDelete(this.props.note.id)}
// 								>
// 									Delete
// 								</Button>
// 							</div>
// 						</div>
// 					) : (
// 						<>
// 							<div className='friendCard'>
// 								<div className='msgHeader'>
// 									<h5>
// 										<span>{this.props.note.user.userName}</span>
// 									</h5>
// 									<p>Posted: {timeStamp} </p>
// 								</div>
// 								<div className='msgBody'>
// 									<DialogTitle>{this.props.note.message}</DialogTitle>
// 									{this.props.note.editTimeStamp !== '' ? (
// 										<p>
// 											Last Edited{' '}
// 											{moment(this.props.note.editTimeStamp).fromNow()}
// 										</p>
// 									) : (
// 										''
// 									)}
// 								</div>
// 							</div>
// 						</>
// 					)}
// 				</div>
// 			</>
