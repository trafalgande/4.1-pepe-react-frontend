import React from 'react';
import { connect } from 'react-redux';
import PointsList from "../PointsList";

const mapStateToProps = state => ({
    points: state.home.points,
    currentUser: state.common.currentUser
});

const MainView = props => {
    return (
        <div className="col-md-9">
            <PointsList
                points={props.points} currentUser={props.currentUser}/>
        </div>
    );
};

export default connect(mapStateToProps, () => ({}))(MainView);
