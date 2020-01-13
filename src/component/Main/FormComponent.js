import React, { Component } from 'react';
import '@material-ui/icons';
import '../../../node_modules/material-design-icons/iconfont/material-icons.css';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import {POINT_ADDED, UPDATE_FIELD_POINT} from "../../actions/types";
import { connect } from 'react-redux';
import agent from '../../agent';
import { TextField } from '@material-ui/core';

const mapStateToProps = state => ({ ...state.points });


const mapDispatchToProps = dispatch => ({
    onClickX: value =>
        dispatch({ type: UPDATE_FIELD_POINT, key: 'xc', value }),
    onChangeY: value =>
        dispatch({ type: UPDATE_FIELD_POINT, key: 'yc', value }),
    onClickR: value =>
        dispatch({ type: UPDATE_FIELD_POINT, key: 'rc', value }),
    onSubmit: (x, y, r) => 
        dispatch({ type: POINT_ADDED, payload: agent.Points.addpoint(x, y, r), r: r}),   
});

class FormComponent extends Component {
    constructor() {
        super();
        this.clickX = ev => this.props.onClickX(ev.currentTarget.value);
        this.changeY = ev => this.props.onChangeY(ev.currentTarget.value);
        this.clickR = ev => this.props.onClickR(ev.currentTarget.value);

        this.submitForm = (x, y, r) => ev => {
            ev.preventDefault();
            this.props.onSubmit(x, y, r);
        };
    }

    componentWillReceiveProps(nextProps){
    }

    render() {
        const x = this.props.xc;
        const y = this.props.yc;
        const r = this.props.rc;
        return (
            <form onSubmit={this.submitForm(x, y, r)}>
            <div className='float-left mx-2'>
            <div className='py-2'> 
            <p className="text-monospace">X VALUE: {x}</p>
                <ButtonGroup color="primary" aria-label="outlined primary button group">
                    <Button value={-5} onClick={this.clickX}>-5</Button>
                    <Button value={-4} onClick={this.clickX}>-4</Button>
                    <Button value={-3} onClick={this.clickX}>-3</Button>
                    <Button value={-2} onClick={this.clickX}>-2</Button>
                    <Button value={-1} onClick={this.clickX}>-1</Button>
                    <Button value={0} onClick={this.clickX}>0</Button>
                    <Button value={1} onClick={this.clickX}>1</Button>
                    <Button value={2} onClick={this.clickX}>2</Button>
                    <Button value={3} onClick={this.clickX}>3</Button>
                </ButtonGroup>
            </div>
            <div className='py-2'>
            <p className="text-monospace">Y VALUE:</p>
            <TextField 
            type='text'
            value={y}
            onChange={this.changeY}
            className="mw-100"
            placeholder="y value" />
            </div>
            <div className='py-2'>
            <p className="text-monospace">R VALUE: {r}</p>
                <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                    <Button value={-5} onClick={this.clickR}>-5</Button>
                    <Button value={-4} onClick={this.clickR}>-4</Button>
                    <Button value={-3} onClick={this.clickR}>-3</Button>
                    <Button value={-2} onClick={this.clickR}>-2</Button>
                    <Button value={-1} onClick={this.clickR}>-1</Button>
                    <Button value={0} onClick={this.clickR}>0</Button>
                    <Button value={1} onClick={this.clickR}>1</Button>
                    <Button value={2} onClick={this.clickR}>2</Button>
                    <Button value={3} onClick={this.clickR}>3</Button>
                </ButtonGroup>
            </div>
            <div className='py-2'>
            <Button 
            type='submit'
            variant="outlined" 
            color="primary"
            >SUBMIT</Button> 
            </div>
            </div>
            </form>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(FormComponent)