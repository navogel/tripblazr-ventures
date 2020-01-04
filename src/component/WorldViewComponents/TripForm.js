import React, { Component } from 'react';
import TripManager from '../../modules/TripManager';
import DialogTitle from '@material-ui/core/DialogTitle';
//import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import './tripForm.css';

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
class TripForm extends Component {
    state = {
        tripName: '',
        city: this.props.newName,
        summary: '',
        lat: this.props.newLat,
        lng: this.props.newLng,
        communication: '',
        money: '',
        likes: 0,
        published: false,
        userId: this.props.activeUser,
        loadingStatus: false
        // imageLink: ''
    };

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };

    /*  Local method for validation, set loadingStatus, create animal object, invoke the AnimalManager post method, and redirect to the full animal list
     */
    constructNewTrip = evt => {
        evt.preventDefault();
        if (this.state.tripName === '' || this.state.city === '') {
            window.alert('Please input an trip destination and name');
        } else {
            this.setState({ loadingStatus: true });
            const trip = {
                name: this.state.tripName,
                city: this.state.city,
                summary: this.state.summary,
                lat: this.state.lat,
                lng: this.state.lng,
                communication: this.state.communication,
                money: this.state.money,
                likes: this.state.likes,
                published: false,
                userId: this.state.userId
            };

            // Create the animal and redirect user to animal list
            this.props.handleClose();
            TripManager.postTrip(trip).then(() => {
                console.log('addform props', this.props);
                this.props.getTrips();
            });
        }
    };

    render() {
        const { classes } = this.props;
        return (
            <>
                <form
                    className={classes.container}
                    noValidate
                    autoComplete='off'
                >
                    <div className='formWrapper'>
                        <DialogTitle className='modalTitle'>
                            {'Lets get this trip started.'}
                        </DialogTitle>
                        <div className='inputWrapper'>
                            <div className='nameCity'>
                                <TextField
                                    id='city'
                                    label='Destination'
                                    className={classes.textField}
                                    value={this.state.city}
                                    onChange={this.handleFieldChange}
                                    margin='dense'
                                    variant='outlined'
                                    placeholder='Where ya going?'
                                />
                                <TextField
                                    id='tripName'
                                    label='Name'
                                    className={classes.textField}
                                    value={this.state.name}
                                    onChange={this.handleFieldChange}
                                    margin='dense'
                                    variant='outlined'
                                    placeholder='Name your Trip!'
                                />
                            </div>
                        </div>

                        {/* <button
						type='button'
						disabled={this.state.loadingStatus}
						onClick={this.constructNewTrip}
					>
						Submit
                    </button> */}
                        <div className='formSubmit'>
                            <Fab
                                variant='extended'
                                size='small'
                                color='primary'
                                aria-label='submit'
                                className={classes.margin}
                                disabled={this.state.loadingStatus}
                                onClick={this.constructNewTrip}
                            >
                                <AddIcon className={classes.extendedIcon} />
                                Submit
                            </Fab>
                        </div>
                    </div>
                </form>
            </>
        );
    }
}

export default withStyles(styles)(TripForm);
