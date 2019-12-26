import React from 'react';
import PointRow from "./PointRow";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const PointsList = props => {
    if (props.currentUser) {
        if (!props.points) {
            return (
                <div className="points">Loading...</div>
            );
        }

        if (props.points.length === 0) {
            return (
                <div className="points">
                    No points are here... yet.
                </div>
            );
        }

        return (
            <div>
            <Table aria-label="simple table" className='pl-20'>
        <TableHead>
          <TableRow>
            <TableCell><b>ID</b></TableCell>
            <TableCell align="right"><b>X</b></TableCell>
            <TableCell align="right"><b>Y</b></TableCell>
            <TableCell align="right"><b>R</b></TableCell>
            <TableCell align="right"><b>RESULT</b></TableCell>
          </TableRow>
        </TableHead>
        {
            props.points.map(point => {
                return (
                    <PointRow point={point} key={point.id}/>
                );
            })
        }
        </Table>
            </div>
        );
    } else
        return null;
};

export default PointsList;
