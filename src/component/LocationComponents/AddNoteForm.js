import React from 'react';
import TripManager from '../../modules/TripManager';
import ReactDOM from 'react-dom';
//import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
// import './tripForm.css';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';

import moment from 'moment';

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
        //margin: theme.spacing(1),
        minWidth: 200
    }
});

class AddNoteForm extends React.Component {
    state = {
        // visible: false,
        //locationId: '',
        date: '',
        note: '',
        loadingStatus: false,
        editTimeStamp: '',
        type: 'note',
        title: '',
        labelWidth: 0
    };

    componentDidMount() {
        this.setState({
            labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth
        });
    }

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    addNewNote = () => {
        // evt.preventDefault();
        this.setState({ loadingStatus: true });
        if (this.state.message === '' || this.state.type === '') {
            window.alert('Please fill out the note and type of note');
        } else {
            let userId = this.props.activeUser;
            const message = {
                locationId: this.props.locationId,
                date: moment(new Date()),
                note: this.state.note,
                userId: userId,
                editTimeStamp: '',
                title: this.state.title,
                type: this.state.type
            };
            TripManager.postLocationNote(message)
                .then(this.props.getNotes)
                .then(
                    this.setState({
                        date: '',
                        note: '',
                        loadingStatus: false,
                        editTimeStamp: '',
                        title: '',
                        type: ''
                    })
                );
            this.props.closeNewNote();
        }
    };

    handleClick = evt => {
        evt.preventDefault();
        this.addNewMessage();
        this.onClose();
        document.querySelector('#note').value = '';
    };

    render() {
        const { classes } = this.props;

        return (
            <div className='msgSubmitRow'>
                <div className='formField'>
                    <TextField
                        fullWidth
                        id='title'
                        label='Optional Title'
                        value={this.state.title}
                        onChange={this.handleFieldChange}
                        margin='dense'
                        variant='outlined'
                        placeholder='Optional Title'
                    />
                    <TextField
                        fullWidth
                        id='note'
                        label='add a note, URL, or Youtube video ID'
                        value={this.state.note}
                        onChange={this.handleFieldChange}
                        margin='dense'
                        variant='outlined'
                        placeholder='Add note'
                        multiline
                        rowsMax='4'
                    />
                </div>
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
                        Note Type
                    </InputLabel>
                    <NativeSelect
                        value={this.state.type}
                        onChange={this.handleChange('type')}
                        input={
                            <OutlinedInput
                                name='type'
                                labelWidth={this.state.labelWidth}
                                id='type'
                            />
                        }
                    >
                        <option value={'note'}>{'Travel Note '}</option>
                        <option value={'url'}>{'Link '}</option>
                        <option value={'YT'}>{'YouTube Id '}</option>
                    </NativeSelect>
                </FormControl>

                <div className='noteSubmit'>
                    <Fab
                        variant='extended'
                        size='small'
                        color='primary'
                        aria-label='submit'
                        disabled={this.state.loadingStatus}
                        onClick={this.addNewNote}
                    >
                        <AddIcon />
                        Submit
                    </Fab>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(AddNoteForm);
