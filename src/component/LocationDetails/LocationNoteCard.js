import React, { Component } from 'react';
import { Button } from 'antd';
import MessagesManager from '../../modules/MessagesManager';
import EditMessageForm from './EditMessageForm';
import moment from 'moment';
class MessageCard extends Component {
	state = {
		myCard: ''
	};

	handleDelete = id => {
		MessagesManager.delete(id).then(() => {
			this.props.getData();
		});
	};

	componentDidMount() {
		if (
			parseInt(sessionStorage.getItem('activeUser')) ===
			this.props.message.userId
		) {
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
		let timeStamp = moment(this.props.message.date).fromNow();

		return (
			<>
				{this.state.myCard ? (
					<div className='myCard'>
						<p>Posted: {timeStamp} </p>
						<p>{this.props.message.message}</p>
						{this.props.message.editTimeStamp !== '' ? (
							<p>
								Last Edited {moment(this.props.message.editTimeStamp).fromNow()}
							</p>
						) : (
							''
						)}
						<div className='cardButtonRow'>
							<EditMessageForm
								{...this.props.message}
								getData={this.props.getData}
							/>
							<Button
								className='addItemBtn'
								type='primary'
								shape='round'
								icon='delete'
								size='small'
								onClick={() => this.handleDelete(this.props.message.id)}
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
									<span>{this.props.message.user.userName}</span>
								</h5>
								<p>Posted: {timeStamp} </p>
							</div>
							<div className='msgBody'>
								<p>{this.props.message.message}</p>
								{this.props.message.editTimeStamp !== '' ? (
									<p>
										Last Edited{' '}
										{moment(this.props.message.editTimeStamp).fromNow()}
									</p>
								) : (
									''
								)}
								<div>
									<img
										className='cardImg'
										src={`/images/ghost${this.props.message.userId}.png`}
										alt='Smiley face'
										height='42'
										width='42'
									/>
								</div>
							</div>
						</div>
					</>
				)}
			</>
		);
	}
}

export default MessageCard;
