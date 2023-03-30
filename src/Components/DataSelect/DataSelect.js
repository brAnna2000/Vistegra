import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function DataSelect(props) {
    const configStrength = props.configStrength;
    const menuItems = configStrength.map(el => {return (<MenuItem key={el.key} value={el.key}>{el.name}</MenuItem>)});

    return (
    <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Прочность</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={props.strength}
                label="Прочность"
                onChange={(event)=>props.setStrength(event.target.value)}
            >
                {menuItems}
            </Select>
        </FormControl>
    </Box>
    );
}