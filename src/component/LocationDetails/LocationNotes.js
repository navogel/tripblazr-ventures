import React, { Component } from 'react';
// import MessagesManager from '../../modules/MessagesManager';
import LocationNoteCard from './LocationNoteCard';
// import AddNoteForm from './AddNoteForm';
import TripManager from '../../modules/TripManager';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import AddNoteForm from './AddNoteForm';

class LocationNotes extends Component {
	//define what this component needs to render
	state = {
		notes: [],
		addNote: false
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

	newNote = () => {
		if (this.state.addNote === false) {
			this.setState({ addNote: true });
		} else {
			this.setState({ addNote: false });
		}
	};

	closeNewNote = () => {
		this.setState({ addNote: false });
	};

	render() {
		return (
			<div className='mainContainer'>
				<div className='sectionHeader'>
					<h2>Travel Notes</h2>
					{!this.props.publicTrip && (
						<Fab
							onClick={this.newNote}
							size='small'
							color='primary'
							aria-label='add'
						>
							<AddIcon />
						</Fab>
					)}
				</div>
				{this.state.addNote && (
					<AddNoteForm
						getNotes={this.getNotes}
						activeUser={this.props.activeUser}
						closeNewNote={this.closeNewNote}
						locationId={this.props.locationId}
					/>
				)}
				{this.state.notes.map(note => (
					<LocationNoteCard
						key={note.id}
						note={note}
						{...this.props}
						getNotes={this.getNotes}
						activeUser={this.props.activeUser}
						locationId={this.props.locationId}
						publicTrip={this.props.publicTrip}
					/>
				))}
				{/* <AddMessageForm ref={this.myRef} getData={this.getData} /> */}
			</div>
		);
	}
}

export default LocationNotes;
