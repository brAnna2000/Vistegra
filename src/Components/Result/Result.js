import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import data from '../../data/data.json';
import config from '../../data/config.json';

function createData(name, unit, amount, sum) {
    return { name, unit, amount, sum };
}

export default function Result(props) {
    const listData = data.filter(el => el.name === props.material)[0];
    const pipeData = data.filter(el => el.type === "pipe" && el.width === (props.strength === "strong" ? 30 : 20))[0];
    const fixData =  data.filter(el => el.type === "fix")[0];

    const square = (props.width * props.length).toFixed(2);
    const fixValue = config.filter(el => el.type === "fix" && el.key === listData.material)[0].value;
    const pipeStep = config.filter(el => el.type === "frame" && el.key === props.strength)[0].step;
    const cellSize = {width:0, height:0};

    const listAmount = countListAmount(listData);
    const pipeAmount = countPipeAmount(pipeStep);
    const fixAmount = countFixAmount(square, fixValue);
    
    function countListAmount(listData){
        const a = Math.ceil(props.width/listData.width) * props.length;
        const b = Math.ceil(props.length/listData.width) * props.width;
        return Math.ceil(Math.min(a, b));
    }

    function countPipeAmount(pipeStep){
        if(listData.width > 1){
            cellSize.width = 1;
            cellSize.height = Math.ceil(props.width/pipeStep);
            return Math.ceil(props.width*(props.length + 1) + props.length*(Math.ceil(props.width/pipeStep) + 1));
        }else{
            cellSize.width = Math.ceil(props.length/pipeStep);
            cellSize.height = 1;
            return Math.ceil(props.length*(props.width + 1) + props.width*(Math.ceil(props.length/pipeStep) + 1));
        }
    }

    function countFixAmount(square, fixValue){
        return Math.ceil(square*fixValue);
    }

    const rows = [
        createData(listData.name, listData.unit, listAmount, listAmount*listData.price),
        createData(pipeData.name, pipeData.unit, pipeAmount, pipeAmount*pipeData.price),
        createData(fixData.name, fixData.unit, fixAmount, Math.ceil(fixAmount*fixData.price))
    ];

    const totalSum = rows.map((el)=> el.sum).reduce((total, value) => total + value);

    const cartData = {
        name: listData.name,
        size: `${cellSize.width}x${cellSize.height}м`,
        totalPrice: totalSum,
        history: [
            {
                itemName: listData.name,
                itemAmount: listAmount,
                itemSum: listAmount*listData.price,
            },
            {
                itemName: pipeData.name,
                itemAmount: pipeAmount,
                itemSum: pipeAmount*pipeData.price,
            },
            {
                itemName: fixData.name,
                itemAmount: fixAmount,
                itemSum: Math.ceil(fixAmount*fixData.price),
            }
        ] 
    }
    return (
        <>
            <p>Площадь: {square}</p>
            <p>Размер ячейки: {cellSize.width}x{cellSize.height}м</p>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Наименование</TableCell>
                        <TableCell align="right">Единица</TableCell>
                        <TableCell align="right">Количество</TableCell>
                        <TableCell align="right">Сумма</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                    <TableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">
                        {row.name}
                        </TableCell>
                        <TableCell align="right">{row.unit}</TableCell>
                        <TableCell align="right">{row.amount}</TableCell>
                        <TableCell align="right">{row.sum}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </TableContainer>
            <p>Итого: {totalSum}</p>
            <Button variant="contained" onClick={()=>{props.addToCart(cartData)}}>Добавить в корзину</Button>
        </>
    );
}