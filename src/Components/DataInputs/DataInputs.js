import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';

export default function DataInputs(props) {
    return (
        <div className='listInputs'>
            <Stack spacing={2} sx={{ width: 300 }}>
                <Autocomplete
                    value={props.value}
                    onChange={props.onChange}
                    inputValue={props.material}
                    onInputChange={props.onInputChange}
                    id="controllable-states-demo"
                    options={props.options}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Материал" />}
                />
            </Stack>
        </div>
    );
}