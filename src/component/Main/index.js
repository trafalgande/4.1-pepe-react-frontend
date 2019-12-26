
import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';
import PointInput from "./FormComponent";
import Graphic from "./Plot";
import { POINTS_LOADED } from "../../actions/types";
import View from './View';
import 'bootstrap/dist/css/bootstrap.min.css';

const mapStateToProps = state => ({
    appName: state.common.appName,
    currentUser: state.common.currentUser,
});

const mapDispatchToProps = dispatch => ({
    onLoad: (payload) =>
        dispatch({ type: POINTS_LOADED, payload }),
});

class Home extends React.Component {


    componentWillMount() {
        if (this.props.currentUser)
            this.props.onLoad(agent.Points.currentpoints());
    }

    render() {
        if (this.props.currentUser) {
            return (
                <div className="text-center">
                    <Graphic/>
                    <PointInput/>
                    <div className="container page">
                    <View/>
                </div>
                </div>
            );
        } else
            return null;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
