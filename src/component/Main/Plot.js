import React, { Component } from 'react'
import { connect } from 'react-redux';
import agent from "../../agent";
import {POINT_ADDED, POINTS_RECALCULATED} from "../../actions/types";

const mapStateToProps = state => ({
    points: state.points.points,
    rc: state.points.rc,
    current_r: state.points.current_r
});

const mapDispatchToProps = dispatch => ({
    recalculatedPoints: (r) => {
        dispatch({ type: POINTS_RECALCULATED, payload: agent.Points.update(r), r: r})
    },
    onCanvasClick: (x, y, r) => {
        dispatch({ type: POINT_ADDED, payload: agent.Points.addpoint(x, y, r), r: r})
    }
});



class Plot extends Component {

    addPointFromCanvas = this.addPointFromCanvas.bind(this);

    
    componentWillMount() {
        this.props.recalculatedPoints(1);
    }

    componentDidMount() {
        this.plotW(1);
    }   

    render() {
        return (
        <div className='canvas float-right m-4'>
        <canvas id='canvas' width="230px" height="230px" ref={node => this.canvas = node} onClick={this.addPointFromCanvas}></canvas>
        </div>
        )
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.rc) {
            this.plotW(nextProps.rc);
            if (!nextProps.current_r || nextProps.current_r !== nextProps.rc)
                this.props.recalculatedPoints(nextProps.rc);
        }
        if (nextProps.points) {
            nextProps.points.map(point => this.drawPoint(point));
        }
    }
    drawPoint(point) {
        let x = point.x, y = point.y, result = point.result, r = this.props.rc;
        let ctx = this.canvas.getContext("2d");

        ctx.beginPath();
        ctx.rect(Math.round((108 + (x / r) * 80)), Math.round((108 - (y / r) * 80)), 4, 4);
        ctx.fillStyle = "#e11751";
        if (r > 0) {
        if (x >= 0 && y <= 0 && (x * x + y * y) <= (r / 2 * r / 2) ||
            x >= -r && x <= 0 && y >= -r / 2 && y <= 0  ||
            x <= 0 && y >= 0 && y <= x / 2 + r / 2
        ) { 
            ctx.fillStyle = "#13e158";
        } 
    } else {
        if (x <= 0 && y <= 0 && (x * x + y * y) <= (r / 2 * r / 2) ||
            x <= r && x >= 0 && y >= -r / 2 && y <= 0  ||
            x >= 0 && y >= 0 && y <= - x / 2 + r / 2
        ) { 
            ctx.fillStyle = "#13e158";
        } 
    } 
        ctx.closePath();
        ctx.fill();
    }

    drawPointFromEvent(event) {
        let canvas = document.getElementById("canvas");
        let ctx = canvas.getContext("2d");
        let rect = canvas.getBoundingClientRect();
        let offset = (rect.width - canvas.width) / 2 + 1;
        let x = event.clientX - rect.left - offset;
        let y = event.clientY - rect.top - offset;
        ctx.beginPath();
        ctx.rect(Math.round((108 + (x / 5) * 80)), Math.round((108 - (y / 5) * 80)), 4, 4);
        ctx.fillStyle = "#e11751";
        // if (result) { 
        //     ctx.fillStyle = "#13e158";
        // } 
        ctx.closePath();
        ctx.fill();    
    }

    plotW(r) {

        let ctx = this.canvas.getContext("2d");
        // let canvas = document.getElementById("canvas");
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (r != 0) {    
        ctx.beginPath();
        ctx.fillStyle = "#7ca1ff";
        ctx.rect(110, 110, -80, 40);
        ctx.closePath();
        ctx.fill();
    
        ctx.beginPath();
        ctx.moveTo(110, 110);
        ctx.arc(110, 110, 40, 0, Math.PI / 2, false);
        ctx.closePath();
        ctx.fill();
    
        ctx.beginPath();
        ctx.moveTo(110, 100);
        ctx.lineTo(110, 70);
        ctx.lineTo(30, 110);
        ctx.lineTo(110, 110);
        ctx.closePath();
        ctx.fill();
    
    } else {
        let base_image = new Image();
        base_image.src = 'resources/img/base.jpg';
        base_image.onload = function(){
            ctx.drawImage(base_image, 0, 0);
        }
    }
    if (r < 0) {
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.beginPath();
        ctx.fillStyle = "#7ca1ff";
        ctx.rect(190, 110, -80, 40);
        ctx.closePath();
        ctx.fill();
    
        ctx.beginPath();
        ctx.moveTo(110, 110);
        ctx.arc(110, 110, 40, Math.PI, Math.PI / 2, true);
        ctx.closePath();
        ctx.fill();
    
        ctx.beginPath();
        ctx.moveTo(190, 110);
        ctx.lineTo(110, 70);
        ctx.lineTo(110, 110);
        ctx.lineTo(190, 110);
        ctx.closePath();
        ctx.fill();
    }
        // axis
        ctx.beginPath();
        ctx.moveTo(110, 0);
        ctx.lineTo(110, 230);
        ctx.moveTo(0, 110);
        ctx.lineTo(230, 110);
    
        // arrows on axis
        ctx.moveTo(110, 0);
        ctx.lineTo(113, 5);
        ctx.moveTo(110, 0);
        ctx.lineTo(107, 5);
    
        ctx.moveTo(230, 110);
        ctx.lineTo(225, 113);
        ctx.moveTo(230, 110);
        ctx.lineTo(225, 107);
    
        // x lines
        ctx.fillStyle = "#121164";
        ctx.moveTo(30, 115);
        ctx.lineTo(30, 105);
        ctx.fillText(-r, 26, 125);
    
        ctx.moveTo(70, 115);
        ctx.lineTo(70, 105);
        ctx.fillText(-r / 2, 60, 125);
    
        ctx.moveTo(150, 115);
        ctx.lineTo(150, 105);
        ctx.fillText(r / 2, 144, 125);
    
        ctx.moveTo(190, 115);
        ctx.lineTo(190, 105);
        ctx.fillText(r, 186, 125);
    
        // y lines
        ctx.moveTo(115, 150);
        ctx.lineTo(105, 150);
        ctx.fillText(-r / 2, 117, 153);
    
        ctx.moveTo(115, 190);
        ctx.lineTo(105, 190);
        ctx.fillText(-r, 117, 193);
    
        ctx.moveTo(115, 70);
        ctx.lineTo(105, 70);
        ctx.fillText(r / 2, 117, 73);
    
        ctx.moveTo(115, 30);
        ctx.lineTo(105, 30);
        ctx.fillText(r, 117, 33);
    
        ctx.fillText("y", 115, 6);
        ctx.fillText("x", 224, 120);
        ctx.stroke();
}
    addPointFromCanvas(event) {
        let ctx = this.canvas.getContext("2d");
        let rect = this.canvas.getBoundingClientRect();
        let offset = (rect.width - this.canvas.width) / 2 + 1;
        let x = event.clientX - rect.left - offset;
        let y = event.clientY - rect.top - offset;
        let r;
        if (this.props.rc !== undefined) {
            r = this.props.rc
        } else r = 1;

        let xCalculated = (x - 108) / 80 * r;
        let yCalculated = (108 - y) / 80 * r;
        console.log(this.props.points)


        this.props.onCanvasClick(xCalculated.toFixed(3), yCalculated.toFixed(3), this.props.rc || 1);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Plot);