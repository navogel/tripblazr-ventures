import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
//import { firstLetterCase } from '../../modules/helpers';
import TripManager from '../../modules/TripManager';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
//import CardMedia from '@material-ui/core/CardMedia';
import '../WorldViewComponents/tripCard.css';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';

//table

class LocationCard extends Component {
	state = { star: false };

	componentDidMount() {
		this.setState({ star: this.props.location.star });
	}

	handleDelete = id => {
		TripManager.deleteLocation(id).then(() => this.props.getData());
	};

	addStar = (e, locationId) => {
		e.stopPropagation();
		let location = {
			id: locationId,
			star: true
		};
		TripManager.updateLocation(location);
		this.setState({ star: true });
	};

	removeStar = (e, locationId) => {
		e.stopPropagation();
		let location = {
			id: locationId,
			star: false
		};
		TripManager.updateLocation(location);
		this.setState({ star: false });
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
						onClick={() => this.props.toggleLocDrawer(this.props.location)}
						className='cardActionArea'
					>
						{!this.props.publicTrip ? (
							<p className='cardLabel'>
								{this.props.location.locationType.locationType}

								{this.state.star ? (
									<StarIcon
										className='starred'
										color='secondary'
										onClick={e => this.removeStar(e, this.props.location.id)}
									/>
								) : (
									<StarBorderIcon
										className='starred'
										onClick={e => this.addStar(e, this.props.location.id)}
									/>
								)}
							</p>
						) : (
							<p className='cardLabel'>
								{this.props.location.locationType.locationType}

								{this.state.star ? (
									<StarIcon
										className='starred'
										color='secondary'
										//onClick={e => this.removeStar(e, this.props.location.id)}
									/>
								) : (
									<StarBorderIcon
										className='starred'
										//onClick={e => this.addStar(e, this.props.location.id)}
									/>
								)}
							</p>
						)}
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
						{!this.props.publicTrip && (
							<>
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
							</>
						)}
						<Button
							size='small'
							color='primary'
							// onClick={() => this.toggleDrawer(this.props.location)}
							onClick={() => this.props.clickedCardItem(this.props.location)}
						>
							Fly to
						</Button>
					</CardActions>
				</Card>
			</>
		);
	}
}

export default LocationCard;
