import React, { Component } from 'react';
// import MessagesManager from '../../modules/MessagesManager';
import LocationNoteCard from './LocationNoteCard';
// import AddNoteForm from './AddNoteForm';
import TripManager from '../../modules/TripManager';

class LocationNotes extends Component {
	//define what this component needs to render
	state = {
		notes: []
	};

	componentDidMount() {
		//getAll from AnimalManager and hang on to that data; put it in state
		TripManager.getLocationNotes(this.props.locationId).then(notes => {
			this.setState({
				notes: notes
			});
		});
	}

	getNotes = () => {
		TripManager.getLocationNotes(this.props.locationId).then(notes => {
			this.setState({
				notes: notes
			});
		});
	};

	render() {
		return (
			<div className='mainContainer'>
				<div className='sectionHeader'>
					<h3>Notes</h3>
				</div>
				{this.state.notes.map(note => (
					<LocationNoteCard
						key={note.id}
						note={note}
						{...this.props}
						getNotes={this.getNotes}
						activeUser={this.props.activeUser}
					/>
				))}
				{/* <AddMessageForm ref={this.myRef} getData={this.getData} /> */}
			</div>
		);
	}
}

export default LocationNotes;
