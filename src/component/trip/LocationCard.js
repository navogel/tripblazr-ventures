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
				<Card className={hoverCard}>
					<CardActionArea
						onClick={() => this.props.focusMarker(this.props.location)}
						className='cardActionArea'
					>
						<p className='cardLabel'>
							{this.props.location.locationType.locationType}
						</p>
						<div className={'scroll' + this.props.location.id}></div>
						{/* <Link to={`/mytrips/${this.props.location.id}`}> */}
						{/* <CardMedia
								className='tripCardMedia'
								image=
								
							/> */}
						<CardContent className='cardContent'>
							<h3>
								<span className='card-tripname'>
									{/* {firstLetterCase(this.props.location.name)} */}
									{this.props.location.name}
								</span>
							</h3>

							<p>{this.props.location.summary}</p>
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
