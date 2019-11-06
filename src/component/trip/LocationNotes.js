import React, { Component } from 'react';
import MessagesManager from '../../modules/MessagesManager';
import MessageCard from './MessageCard';
import AddNoteForm from './AddNoteForm';

class MessagesList extends Component {
	//define what this component needs to render
	state = {
		messages: []
	};

	//function for scrolling 5000px down from top
	scrollToMyRef = () => {
		window.scrollTo({
			top: 5000,
			behavior: 'smooth'
		});
	};

	componentDidMount() {
		//getAll from AnimalManager and hang on to that data; put it in state
		MessagesManager.getMessages(this.props.activeUser).then(messages => {
			this.setState({
				messages: messages
			});
			this.scrollToMyRef();
		});
	}

	getData = () => {
		MessagesManager.getMessages(this.props.activeUser).then(messages => {
			this.setState({
				messages: messages
			});
			this.scrollToMyRef();
		});
	};

	render() {
		return (
			<div className='mainContainer'>
				<div className='sectionHeader'>
					<h1>MESSAGES</h1>
				</div>
				{this.state.messages.map(message => (
					<MessageCard
						key={message.id}
						message={message}
						{...this.props}
						getData={this.getData}
					/>
				))}
				<AddMessageForm ref={this.myRef} getData={this.getData} />
			</div>
		);
	}
}

export default MessagesList;