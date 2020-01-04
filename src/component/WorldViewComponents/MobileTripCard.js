import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//import { firstLetterCase } from '../../modules/helpers';
import TripManager from '../../modules/TripManager';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
//import CardMedia from '@material-ui/core/CardMedia';
import './tripCard.css';
import TextField from '@material-ui/core/TextField';

//table

class MobileTripCard extends Component {
    state = {
        edit: false,
        name: ''
    };

    editView = () => {
        this.setState({ edit: true });
    };

    editName = tripId => {
        let trip = {
            id: tripId,
            name: this.state.name
        };
        TripManager.updateTrip(trip).then(() => this.props.getTrips());
        this.setState({ edit: false });
    };

    componentDidMount() {
        this.setState({ name: this.props.trip.name });
    }

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };

    handleDelete = id => {
        TripManager.deleteTrip(id).then(() => this.props.getTrips());
    };
    render() {
        //console.log('tripcard props', this.props.trip);
        let hoverCard;
        if (this.props.hovered === this.props.trip.id) {
            hoverCard = 'mobileTripCardHover';
        } else {
            hoverCard = 'mobileTripCard';
        }
        return (
            <>
                <Card className={hoverCard} elevation={4}>
                    <div className={'scroll' + this.props.trip.id}></div>
                    {this.state.edit ? (
                        <CardActionArea className='cardActionArea'>
                            <CardContent className='cardContent'>
                                <h3>
                                    <span className='card-tripname'>
                                        <TextField
                                            id='name'
                                            label='Name'
                                            value={this.state.name}
                                            onChange={this.handleFieldChange}
                                            margin='dense'
                                            variant='outlined'
                                            placeholder='Enter the place name'
                                        />
                                    </span>
                                </h3>
                                <p>Destination: {this.props.trip.city}</p>
                            </CardContent>
                        </CardActionArea>
                    ) : (
                        <CardActionArea className='cardActionArea'>
                            <Link
                                to={`/mytrips/${this.props.trip.id}`}
                                trip={this.props.trip}
                            >
                                <CardContent className='cardContent'>
                                    <h3>
                                        <span className='card-tripname'>
                                            {this.props.trip.name}
                                        </span>
                                    </h3>
                                    <p>Destination: {this.props.trip.city}</p>
                                    {this.props.name && (
                                        <p>Created By: {this.props.name}</p>
                                    )}
                                    {this.props.publicView &&
                                        this.props.trip.user.userName && (
                                            <p>
                                                Created By:{' '}
                                                {this.props.trip.user.userName}
                                            </p>
                                        )}
                                </CardContent>
                            </Link>
                        </CardActionArea>
                    )}
                    {!this.props.publicView && (
                        <CardActions className='cardButtons'>
                            {this.state.edit ? (
                                <Button
                                    size='small'
                                    color='primary'
                                    onClick={() =>
                                        this.editName(this.props.trip.id)
                                    }
                                >
                                    submit
                                </Button>
                            ) : (
                                <Button
                                    size='small'
                                    color='primary'
                                    onClick={() => this.editView()}
                                >
                                    Edit
                                </Button>
                            )}
                            {!this.props.name && (
                                <Button
                                    size='small'
                                    color='primary'
                                    onClick={() =>
                                        this.handleDelete(this.props.trip.id)
                                    }
                                >
                                    Delete
                                </Button>
                            )}
                            <Button
                                size='small'
                                color='primary'
                                onClick={() =>
                                    this.props.clickedCardItem(this.props.trip)
                                }
                            >
                                Fly to
                            </Button>
                            {/* <EditAnimalModal id={this.props.animal.id} {...this.props} /> */}
                            {/* <Link to={`/animals/${this.props.animal.id}`}>
						<Button size='small' color='primary'>
							Info
						</Button>
					</Link> */}
                        </CardActions>
                    )}
                    {this.props.publicView && (
                        <CardActions className='cardButtons'>
                            {this.props.trip.likes > 0 && (
                                <p className='price'>
                                    <b>
                                        {'Likes: '}
                                        {this.props.trip.likes}
                                    </b>
                                </p>
                            )}
                            <Button
                                size='small'
                                color='primary'
                                onClick={() =>
                                    this.props.clickedCardItem(this.props.trip)
                                }
                            >
                                Fly to
                            </Button>
                        </CardActions>
                    )}
                </Card>
            </>
        );
    }
}

export default MobileTripCard;
