import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import { Link } from 'react-router';
import agent from '../agent';
import { connect } from 'react-redux';
import {LOGIN, UPDATE_FIELD_AUTH} from "../actions/types";
import ListErrors from './ListErrors';

const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
    onChangeUsername: value =>
        dispatch({ type: UPDATE_FIELD_AUTH, key: 'username', value }),
    onChangePassword: value =>
        dispatch({ type: UPDATE_FIELD_AUTH, key: 'password', value }),
    onSubmit: (username, password) =>
        dispatch({ type: LOGIN, payload: agent.Auth.login(username, password), username: username })
});

class Login extends Component {
    constructor() {
        super();
        this.changeUsername = ev => this.props.onChangeUsername(ev.target.value);
        this.changePassword = ev => this.props.onChangePassword(ev.target.value);

        this.submitForm = (username, password) => ev => {
            ev.preventDefault();
            this.props.onSubmit(username, password);
        };
    }

    render() {
        const username = this.props.username;
        const password = this.props.password;
        return (
            
            <form onSubmit={this.submitForm(username, password)}>
            <ListErrors errors={this.props.errors} />
            <div className='float-center p-4'>
                <div className='p-4'>  <TextField
                 value={username}
                 onChange={this.changeUsername}
                 type='text' 
                 label='Username' 
                 maxLength={16} 
                 required/> </div>
                <div className='p-4'>  <TextField
                 value={password}
                 onChange={this.changePassword}
                 type='password' 
                 label='Password' 
                 minLength={8}
                 required /> </div> 
                <div className='p-4'> <Button 
                type='submit'
                variant='contained' 
                color='primary'
                disabled={this.props.inProgress}
                >Login</Button> </div>
                <div className='text-muted'><small> <Link to="signup"> Dont have an account? Register </Link></small>  </div>
            </div>
            </form>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);