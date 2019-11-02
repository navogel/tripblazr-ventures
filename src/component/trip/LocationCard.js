import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
//import { firstLetterCase } from '../../modules/helpers';
import TripManager from '../../modules/TripManager';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Select from '@material-ui/core/Select';
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
				<Card className={hoverCard} elevation={4}>
					<div className={'scroll' + this.props.location.id}></div>
					<CardActionArea
						onClick={() => this.props.focusMarker(this.props.location)}
						className='cardActionArea'
					>
						<p className='cardLabel'>
							{this.props.location.locationType.locationType}
						</p>

						{/* <Link to={`/mytrips/${this.props.location.id}`}> */}
						{/* <CardMedia
								className='tripCardMedia'
								image=
								
							/> */}

						<h3 className='card-tripname'>
							{/* {firstLetterCase(this.props.location.name)} */}
							{this.props.location.name}
						</h3>

						<p>{this.props.location.summary}</p>
					</CardActionArea>

					<CardActions
						className={'cardButtons' + this.props.location.locationTypeId}
					>
						<p className='price'>
							<b>
								{this.props.location.price && `$${this.props.location.price}`}
							</b>
						</p>
						<Button
							size='small'
							color='primary'
							onClick={() => this.handleDelete(this.props.location.id)}
						>
							Delete
						</Button>
						<Button
							size='small'
							color='primary'
							// onClick={() => this.toggleDrawer(this.props.location)}
							onClick={() => this.props.toggleDrawer(this.props.location)}
						>
							Edit
						</Button>
					</CardActions>
				</Card>
			</>
		);
	}
}

export default LocationCard;
