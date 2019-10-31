import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
//import { firstLetterCase } from '../../modules/helpers';
import TripManager from '../../modules/TripManager';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
//import CardMedia from '@material-ui/core/CardMedia';
import './tripCard.css';

//table

class LocationCard extends Component {
	handleDelete = id => {
		TripManager.deleteLocation(id).then(() => this.props.getData());
	};
	render() {
		let hoverCard;
		if (this.props.hovered === this.props.location.id) {
			hoverCard = 'tripCardHover';
		} else {
			hoverCard = 'tripCard' + this.props.location.locationTypeId;
		}
		//console.log('hovered props', this.props.hovered);
		return (
			<>
				<Card className={hoverCard}>
					<div className={'scroll' + this.props.location.id}></div>
					<CardActionArea
						onClick={() => this.props.focusMarker(this.props.location)}
						className='cardActionArea'
					>
						{/* <Link to={`/mytrips/${this.props.location.id}`}> */}
						{/* <CardMedia
								className='tripCardMedia'
								image=
								
							/> */}
						<CardContent className='cardContent'>
							<h3>
								<span className='card-tripname'>
									{/* {firstLetterCase(this.props.location.name)} */}
									{this.props.location.name}{' '}
									{this.props.location.locationType.locationType}
								</span>
							</h3>
							<p>Summary: {this.props.location.summary}</p>
						</CardContent>
					</CardActionArea>
					<CardActions className='cardButtons'>
						<Button
							size='small'
							color='primary'
							onClick={() => this.handleDelete(this.props.location.id)}
						>
							Delete
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

export default LocationCard;
