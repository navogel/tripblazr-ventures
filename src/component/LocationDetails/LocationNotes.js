import React, { Component } from 'react';
import MessagesManager from '../../modules/MessagesManager';
import MessageCard from './MessageCard';
import AddNoteForm from './AddNoteForm';

class LocationNotes extends Component {
	//define what this component needs to render
	state = {
		messages: []
	};

	componentDidMount() {
		//getAll from AnimalManager and hang on to that data; put it in state
		TripManager.getLocationNotes(this.props.locationId).then(messages => {
			this.setState({
				messages: messages
			});
		});
	}

	getMessages = () => {
		MessagesManager.getMessages(this.props.locationId).then(messages => {
			this.setState({
				messages: messages
			});
		});
	};

	render() {
		return (
			<div className='mainContainer'>
				<div className='sectionHeader'>
					<h1>MESSAGES</h1>
				</div>
				{this.state.messages.map(message => (
					<LocationNoteCard
						key={message.id}
						message={message}
						{...this.props}
						getMessages={this.getMessages}
					/>
				))}
				{/* <AddMessageForm ref={this.myRef} getData={this.getData} /> */}
			</div>
		);
	}
}

export default LocationNotes;
