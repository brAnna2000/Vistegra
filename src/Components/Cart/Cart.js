import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CartRow from './CartRow/CartRow';

function createData(name, size, totalPrice, history) {
    return {
      name,
      size,
      totalPrice,
      history
    };
}
  
export default function CollapsibleTable(props) {
    const rows = [];
    const cartData = props.cartData;
    const historyData = [];

    for(let i=0; i < cartData.length+1; i++){
        
        if(cartData[i]){
            let container = [];
            cartData[i].history.forEach(el => container.push({
                itemName: el.itemName,
                itemAmount: el.itemAmount,
                itemSum: el.itemSum
            }));
            historyData.push(container)
        }
    }
    cartData.forEach(el => rows.push(createData(el.name, el.size, el.totalPrice, historyData[cartData.indexOf(el)])));

    return (
        <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
            <TableHead>
            <TableRow>
                <TableCell />
                <TableCell>Название</TableCell>
                <TableCell align="right">Размер</TableCell>
                <TableCell align="right">Сумма</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {rows.map((row) => (
                <CartRow key={rows.indexOf(row)} row={row} />
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    );
}