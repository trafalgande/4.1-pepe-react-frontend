import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import {REGISTER, UPDATE_FIELD_AUTH} from "../actions/types";
import agent from '../agent';
import ListErrors from './ListErrors';

const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
    onChangePassword: value =>
        dispatch({ type: UPDATE_FIELD_AUTH, key: 'password', value }),
    onChangeUsername: value =>
        dispatch({ type: UPDATE_FIELD_AUTH, key: 'username', value }),
    onSubmit: (username, password) => {
        const payload = agent.Auth.register(username, password);
        dispatch({ type: REGISTER, payload })
    }
});


class Register extends Component {
    constructor() {
        super();
        this.changePassword = ev => this.props.onChangePassword(ev.target.value);
        this.changeUsername = ev => this.props.onChangeUsername(ev.target.value);
        this.submitForm = (username, password) => ev => {
            ev.preventDefault();
            this.props.onSubmit(username, password);
        }
    }



    render() {
        const password = this.props.password;
        const username = this.props.username;
        return (
            
            <form onSubmit={this.submitForm(username, password)}>
            <ListErrors errors={this.props.errors} />
            <div className='center p-4'>
                <div className='p-4'>  <TextField
                name='username'
                value={this.props.username}
                onChange={this.changeUsername}
                type='text' 
                label='Username' 
                maxLength={16} 
                required/> </div>
                <div className='p-4'> <TextField 
                name='password'
                value={this.props.password}
                onChange={this.changePassword}
                type='password' 
                label='Password' 
                minLength={8} 
                required/> </div> 
                <div className='p-4'> <Button type='submit' 
                variant='contained' 
                color='primary'
                disabled={this.props.inProgress}
                >Register</Button> </div>
            </div>
            </form>
        
        )
    }
 }
 

 export default connect(mapStateToProps, mapDispatchToProps)(Register);