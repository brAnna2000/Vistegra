import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';

export default function Filter(props) {
    return (
        <Stack spacing={2} sx={{ width: 300 }}>
            <Autocomplete
                value={props.value}
                onChange={props.onChange}
                inputValue={props.value}
                onInputChange={props.onInputChange}
                id="controllable-states-demo"
                options={props.options}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label={props.label} />}
            />
        </Stack>
    );
}