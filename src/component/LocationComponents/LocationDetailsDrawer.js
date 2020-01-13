import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import LocationDetails from './LocationDetails';

const styles = {
    list: {
        width: 500
    },
    fullList: {
        width: 'auto'
    }
};

class LocDrawer extends React.Component {
    state = {
        right: false,
        location: {}
    };

    toggleLocDrawer = (side, open) => () => {
        this.setState({
            [side]: open
        });
    };

    openLocDrawer = obj => {
        this.setState({
            right: true,
            location: obj
        });
    };

    closeLocDrawer = () => {
        this.setState({
            right: false
        });
    };

    render() {
        return (
            <>
                <Drawer
                    anchor='right'
                    open={this.state.right}
                    onClose={this.toggleLocDrawer('right', false)}
                >
                    <div
                        tabIndex={0}
                        role='button'
                        // onClick={this.toggleDrawer('right', false)}
                        //onKeyDown={this.toggleDrawer('right', false)}
                    >
                        {/* {sideList} */}
                        <div className='drawerWrapper'>
                            <LocationDetails
                                location={this.state.location}
                                getData={this.props.getData}
                                closeLocDrawer={this.closeLocDrawer}
                                toggleDrawer={this.props.toggleDrawer}
                                activeUser={this.props.activeUser}
                                publicTrip={this.props.publicTrip}
                                tripId={this.props.tripId}
                                likes={this.props.likes}
                            />
                        </div>
                    </div>
                </Drawer>
                {/* </ClickAwayListener> */}
            </>
        );
    }
}

LocDrawer.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LocDrawer);
