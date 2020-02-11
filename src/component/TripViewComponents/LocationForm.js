import React, { Component } from 'react';
import TripManager from '../../modules/TripManager';
import DialogTitle from '@material-ui/core/DialogTitle';
import ReactDOM from 'react-dom';
//import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import '../WorldViewComponents/tripCard.css';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputAdornment from '@material-ui/core/InputAdornment';

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
        width: 400
    },
    extendedIcon: {
        marginRight: theme.spacing(1)
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 200
    }
});
class LocationForm extends Component {
    state = {
        tripId: '',
        summary: '',
        lat: '',
        lng: '',
        address: '',
        price: '',
        likes: 0,
        locationTypeId: '',
        name: '',
        star: false,
        url: '',
        loadingStatus: false,
        labelWidth: 0
        // imageLink: ''
    };

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    constructNewLocation = evt => {
        evt.preventDefault();
        if (this.state.name === '' || this.state.locationTypeId === '') {
            window.alert(
                'Well this is awkward...  you have to enter a name and type.'
            );
        } else if (isNaN(this.state.price)) {
            window.alert(
                'Well this is awkward... you need to enter numbers for the cost... youll thank us later.'
            );
        } else {
            this.setState({ loadingStatus: true });
            const location = {
                tripId: this.state.tripId,
                summary: this.state.summary,
                lat: this.state.lat,
                lng: this.state.lng,
                address: this.state.address,
                price: parseFloat(this.state.price),
                likes: this.state.likes,
                locationTypeId: parseInt(this.state.locationTypeId),
                name: this.state.name,
                url: this.state.url,
                star: false
            };

            this.props.handleClose();
            TripManager.postLocation(location).then(() => {
                this.props.getData();
                this.setState({ loadingStatus: false });
            });
        }
    };
    componentDidMount() {
        this.setState({
            labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth
        });
        console.log('location form props', this.props);
        //add some logic here to manage the obj that is passed
        if (this.props.geoMarker.properties) {
            this.setState({
                tripId: this.props.tripDetails.id,
                lat: this.props.geoMarker.center.lat,
                lng: this.props.geoMarker.center.lng,
                address: this.props.geoMarker.name.split(/,(.+)/)[1],
                name: this.props.geoMarker.properties.text
            });
        } else {
            this.setState({
                tripId: this.props.tripDetails.id,
                lat: this.props.geoMarker.center.lat,
                lng: this.props.geoMarker.center.lng,
                address: this.props.geoMarker.name
            });
        }
    }

    render() {
        const { classes } = this.props;
        console.log('state', this.state.locationTypeId);
        return (
            <>
                <form
                    className={classes.container}
                    noValidate
                    autoComplete='off'
                >
                    <div className='formWrapper'>
                        <DialogTitle className='modalTitle'>
                            {
                                "OK, we got the location.  Now let's get a few more details:"
                            }
                        </DialogTitle>
                        <div className='LocationInputWrapper'>
                            <TextField
                                id='name'
                                label='Name'
                                className={classes.textField}
                                value={this.state.name}
                                onChange={this.handleFieldChange}
                                margin='dense'
                                variant='outlined'
                                placeholder='Enter the place name'
                            />

                            <FormControl
                                variant='outlined'
                                margin='dense'
                                className={classes.formControl}
                            >
                                <InputLabel
                                    ref={ref => {
                                        this.InputLabelRef = ref;
                                    }}
                                    htmlFor='outlined-type-native-simple'
                                >
                                    Type
                                </InputLabel>
                                <NativeSelect
                                    value={this.state.locationTypeId}
                                    onChange={this.handleChange(
                                        'locationTypeId'
                                    )}
                                    input={
                                        <OutlinedInput
                                            name='type'
                                            labelWidth={this.state.labelWidth}
                                            id='locationTypeId'
                                        />
                                    }
                                >
                                    <option value='' />
                                    <option value={1}>Lodging</option>
                                    <option value={2}>Activity</option>
                                    <option value={3}>Food</option>
                                    <option value={4}>Transportation</option>
                                </NativeSelect>
                            </FormControl>
                            <div className='midFormText'>
                                <p> Optional:</p>
                            </div>

                            <TextField
                                id='address'
                                label='Address'
                                className={classes.textField}
                                value={this.state.address}
                                onChange={this.handleFieldChange}
                                margin='dense'
                                variant='outlined'
                                placeholder='Got an address?'
                            />
                            <TextField
                                id='summary'
                                label='Description'
                                className={classes.textField}
                                value={this.state.summary}
                                onChange={this.handleFieldChange}
                                margin='dense'
                                variant='outlined'
                                placeholder='What kind of place is this?'
                                multiline
                                rows=''
                            />
                            <TextField
                                id='url'
                                label='URL'
                                className={classes.textField}
                                value={this.state.url}
                                onChange={this.handleFieldChange}
                                margin='dense'
                                variant='outlined'
                                placeholder='Enter a link to the source'
                            />
                            <TextField
                                id='price'
                                label='Cost'
                                className={classes.textField}
                                value={this.state.price}
                                onChange={this.handleFieldChange}
                                margin='dense'
                                variant='outlined'
                                placeholder='Estimate your costs'
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position='start'>
                                            $
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </div>
                        {/* <div className='tripNotes'>
								<TextField
									id='communication'
									label='Communication Notes'
									className={classes.textField}
									value={this.state.communication}
									onChange={this.handleFieldChange}
									margin='dense'
									variant='outlined'
									placeholder='Will your phone work?'
									multiline
									rows='2'
								/>
								<TextField
									id='money'
									label='Money Notes'
									className={classes.textField}
									value={this.state.money}
									onChange={this.handleFieldChange}
									margin='dense'
									variant='outlined'
									placeholder='Do you need to exchange money?'
									multiline
									rows='2'
								/>
							</div> */}

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
                                onClick={this.constructNewLocation}
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

export default withStyles(styles)(LocationForm);
