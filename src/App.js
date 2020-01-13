import React from 'react';
import { Component } from 'react';
import './App.css';
import ApplicationViews from './component/ApplicationViews';
import Login from './component/auth/Login';

class App extends Component {
    state = {
        user: sessionStorage.getItem('activeUser') !== null,
        activeUser: this.getUser(),
        email: this.getEmail()
    };

    isAuthenticated = () => sessionStorage.getItem('activeUser') !== null;

    setUser = user => {
        // console.log(user);
        sessionStorage.setItem('activeUser', user.id);
        sessionStorage.setItem('userEmail', user.email);
        this.setState({
            activeUser: this.getUser(),
            user: true,
            email: this.getEmail()
        });
    };

    getUser() {
        if (sessionStorage.getItem('activeUser')) {
            return parseInt(sessionStorage.getItem('activeUser'));
        } else {
            return '';
        }
    }

    getEmail() {
        if (sessionStorage.getItem('userEmail')) {
            return sessionStorage.getItem('userEmail');
        } else {
            return '';
        }
    }

    clearUser = () => {
        sessionStorage.removeItem('activeUser');
        sessionStorage.removeItem('userEmail');
        this.setState({
            user: this.isAuthenticated()
        });
    };

    render() {
        // console.log('app.js user', this.state.activeUser);
        return (
            <div className='App'>
                {this.state.user ? (
                    <>
                        <ApplicationViews
                            user={this.state.user}
                            {...this.props}
                            activeUser={this.state.activeUser}
                            clearUser={this.clearUser}
                            email={this.state.email}
                        />
                    </>
                ) : (
                    <Login
                        getUser={this.getUser}
                        setUser={this.setUser}
                        user={this.state.user}
                        {...this.props}
                        activeUser={this.state.activeUser}
                    />
                )}
            </div>
        );
    }
}

export default App;
