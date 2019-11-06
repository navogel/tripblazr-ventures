import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
// import MessagesManager from '../../modules/MessagesManager';
// import EditMessageForm from './EditMessageForm';
import moment from 'moment';
import TripManager from '../../modules/TripManager';
import DialogTitle from '@material-ui/core/DialogTitle';

class LocationNoteCard extends Component {
	state = {
		myCard: ''
	};

	handleDelete = id => {
		TripManager.deleteNote(id).then(() => {
			this.props.getNotes();
		});
	};

	componentDidMount() {
		if (parseInt(this.props.activeUSer) === this.props.note.userId) {
			this.setState({
				myCard: true
			});
		} else {
			this.setState(
				{
					myCard: false
				}
				// () => console.log('my card state', this.state)
			);
		}
	}

	render() {
		let timeStamp = moment(this.props.note.date).fromNow();

		return (
			<>
				<div className='locNoteCard'>
					{this.state.myCard ? (
						<div className='myCard'>
							<p>Posted: {timeStamp} </p>
							<DialogTitle>{this.props.note.message}</DialogTitle>
							{this.props.note.editTimeStamp !== '' ? (
								<p>
									Last Edited {moment(this.props.note.editTimeStamp).fromNow()}
								</p>
							) : (
								''
							)}
							<div className='cardButtonRow'>
								{/* <EditMessageForm
								{...this.props.Note}
								getData={this.props.getNotes}
							/> */}

								<Button
									size='small'
									color='primary'
									onClick={() => this.handleDelete(this.props.note.id)}
								>
									Delete
								</Button>
							</div>
						</div>
					) : (
						<>
							<div className='friendCard'>
								<div className='msgHeader'>
									<h5>
										<span>{this.props.note.user.userName}</span>
									</h5>
									<p>Posted: {timeStamp} </p>
								</div>
								<div className='msgBody'>
									<DialogTitle>{this.props.note.message}</DialogTitle>
									{this.props.note.editTimeStamp !== '' ? (
										<p>
											Last Edited{' '}
											{moment(this.props.note.editTimeStamp).fromNow()}
										</p>
									) : (
										''
									)}
								</div>
							</div>
						</>
					)}
				</div>
			</>
		);
	}
}

export default LocationNoteCard;
