import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { firstLetterCase } from '../../modules/helpers';
import TripManager from '../../modules/TripManager';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import './tripCard.css';

//table

class TripCard extends Component {
	handleDelete = id => {
		TripManager.deleteTrip(id).then(() => this.props.getTrips());
	};
	render() {
		//console.log('tripcard props', this.props.trip);
		return (
			<>
				<Card className='tripCard'>
					<CardActionArea className='cardActionArea'>
						<Link to={`/mytrips/${this.props.trip.id}`}>
							{/* <CardMedia
								className='tripCardMedia'
								image=
								
							/> */}
							<CardContent className='cardContent'>
								<h3>
									Name:{' '}
									<span className='card-tripname'>
										{/* {firstLetterCase(this.props.trip.name)} */}
										{this.props.trip.name}
									</span>
								</h3>
								<p>Summary: {this.props.trip.summary}</p>
							</CardContent>
						</Link>
					</CardActionArea>
					<CardActions className='cardButtons'>
						<Button
							size='small'
							color='primary'
							onClick={() => this.handleDelete(this.props.trip.id)}
						>
							Delete
						</Button>
						<Button
							size='small'
							color='primary'
							onClick={() => this.props.focusMarker(this.props.trip)}
						>
							Zoom to Trip
						</Button>
						{/* <EditAnimalModal id={this.props.animal.id} {...this.props} /> */}
						{/* <Link to={`/animals/${this.props.animal.id}`}>
						<Button size='small' color='primary'>
							Info
						</Button>
					</Link> */}
					</CardActions>
				</Card>
			</>
		);
	}
}

export default TripCard;
