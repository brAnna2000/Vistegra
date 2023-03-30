import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export default function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
            <TableCell>
            <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
            >
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
            </TableCell>
            <TableCell component="th" scope="row">
            {row.name}
            </TableCell>
            <TableCell align="right">{row.size}</TableCell>
            <TableCell align="right">{row.totalPrice}</TableCell>
        </TableRow>
        <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                    Детали
                </Typography>
                <Table size="small" aria-label="purchases">
                    <TableHead>
                    <TableRow>
                        <TableCell>Наименование</TableCell>
                        <TableCell>Количество</TableCell>
                        <TableCell align="right">Сумма</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {row.history.map((historyRow) => (
                        <TableRow key={historyRow.itemName}>
                        <TableCell component="th" scope="row">
                            {historyRow.itemName}
                        </TableCell>
                        <TableCell>{historyRow.itemAmount}</TableCell>
                        <TableCell align="right">{historyRow.itemSum}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </Box>
            </Collapse>
            </TableCell>
        </TableRow>
        </React.Fragment>
    );
}
  
Row.propTypes = {
    row: PropTypes.shape({
        size: PropTypes.string.isRequired,
        totalPrice: PropTypes.number.isRequired,
        history: PropTypes.arrayOf(
        PropTypes.shape({
            itemSum: PropTypes.number.isRequired,
            itemAmount: PropTypes.number.isRequired,
            itemName: PropTypes.string.isRequired,
        }),
        ).isRequired,
        name: PropTypes.string.isRequired,
    }).isRequired,
};