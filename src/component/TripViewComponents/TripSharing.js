import React, { Component } from 'react';
import TripManager from '../../modules/TripManager';
import DialogTitle from '@material-ui/core/DialogTitle';
//import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import '../WorldViewComponents/tripForm.css';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1)
    },
    dense: {
        marginTop: 16
    },
    menu: {
        width: 200
    },
    extendedIcon: {
        marginRight: theme.spacing(1)
    }
});
class TripDetails extends Component {
    state = {
        tripShares: [],
        friendEmail: '',
        loadingStatus: false,
        published: false
        // imageLink: ''
    };

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };

    handleDelete = id => {
        TripManager.deleteTripShare(id).then(() => this.getShares());
    };

    constructNewTripShare = evt => {
        evt.preventDefault();
        if (this.state.friendEmail === '') {
            window.alert('Please input an email to share this trip');
        } else {
            this.setState({ loadingStatus: true });
            const share = {
                friendEmail: this.state.friendEmail,
                userId: this.props.activeUser,
                tripId: this.props.tripId,
                loadingStatus: true
            };

            TripManager.postTripShare(share).then(() => {
                //console.log('addform props', this.props);
                TripManager.getTripsShares(this.props.tripId).then(data => {
                    this.setState({
                        tripShares: data,
                        loadingStatus: false,
                        friendEmail: ''
                    });
                });
            });
        }
    };

    ShareTrip = () => {
        let trip = {
            id: this.props.tripId,
            published: true,
            loadingState: true
        };
        TripManager.updateTrip(trip).then(() => {
            this.setState({
                published: true,
                loadingState: false
            });
        });
    };

    HideTrip = () => {
        let trip = {
            id: this.props.tripId,
            published: false
        };
        TripManager.updateTrip(trip).then(() => {
            this.setState({
                published: false,
                loadingState: false
            });
        });
    };

    getShares = () => {
        TripManager.getTripsShares(this.props.tripId).then(data => {
            this.setState({
                tripShares: data
            });
        });
    };

    componentDidMount() {
        this.getShares();
        this.setState({
            published: this.props.published
        });
    }

    render() {
        const { classes } = this.props;
        return (
            <>
                <div className='tripDetailsWrapper'>
                    <div className='formWrapperTrip'>
                        <DialogTitle className='modalTitle'>
                            {
                                'Make this trip a collab or share it with the world.'
                            }
                        </DialogTitle>
                        {!this.state.published && (
                            <Tooltip title='click to let people see, but not touch'>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={this.state.published}
                                            onChange={this.ShareTrip}
                                            value='this.state.shareView'
                                            disabled={this.state.loadingStatus}
                                        />
                                    }
                                    label='This trip is NOT published.'
                                />
                            </Tooltip>
                        )}
                        {this.state.published && (
                            <Tooltip title='click to hide this trip'>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={this.state.published}
                                            onChange={this.HideTrip}
                                            value='this.state.shareView'
                                            disabled={this.state.loadingStatus}
                                        />
                                    }
                                    label='This trip is published.'
                                />
                            </Tooltip>
                        )}
                    </div>

                    <div className='shareList'>
                        <p>These people can access and edit your trip.</p>

                        <div className='tripShareInput'>
                            <TextField
                                id='friendEmail'
                                label='Email'
                                className={classes.textField}
                                value={this.state.friendEmail}
                                onChange={this.handleFieldChange}
                                margin='dense'
                                variant='outlined'
                                placeholder='trip together, stick together'
                            />

                            {/* <button
						type='button'
						disabled={this.state.loadingStatus}
						onClick={this.props.handleClose()}
					>
						Submit
                    </button> */}

                            <Fab
                                size='small'
                                color='primary'
                                aria-label='submit'
                                disabled={this.state.loadingStatus}
                                onClick={this.constructNewTripShare}
                                //className='addTripBtn'
                            >
                                <AddIcon />
                            </Fab>
                        </div>
                        {this.state.tripShares.map(share => (
                            <div key={share.id} className='tripShare'>
                                <p>
                                    <b>{share.friendEmail}</b>
                                </p>
                                <Tooltip title='remove from trip'>
                                    <IconButton
                                        onClick={e =>
                                            this.handleDelete(share.id)
                                        }
                                    >
                                        <DeleteIcon className='warning' />
                                    </IconButton>
                                </Tooltip>
                            </div>
                        ))}
                    </div>
                </div>
            </>
        );
    }
}

export default withStyles(styles)(TripDetails);
