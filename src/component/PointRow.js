import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const PointRow = props => {
    const point = props.point;

    return (
        <TableBody>
          <TableRow>
            <TableCell>{point.id}</TableCell>
            <TableCell align="right">{point.x}</TableCell>
            <TableCell align="right">{point.y}</TableCell>
            <TableCell align="right">{point.r}</TableCell>
            <TableCell align="right">{point.result ? 'true' : 'false'}</TableCell>
          </TableRow>
        </TableBody>
    
    );
};

export default PointRow;
