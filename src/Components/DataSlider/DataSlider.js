import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import MuiInput from '@mui/material/Input';

const Input = styled(MuiInput)`
  width: 42px;
`;

export default function DataSlider(props) {
    const handleBlur = () => {
        if (props.value < props.min) {
            props.setState(props.min);
        } else if (props.value > props.max) {
            props.setState(props.max);
        }
    };

    return (
        <Box sx={{ width: 250 }}>
            <Typography id="input-slider" gutterBottom>
                {props.name}
            </Typography>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs>
                <Slider
                    value={typeof props.value === 'number' ? props.value : props.min}
                    onChange={(e, newValue) => props.setState(newValue)}
                    aria-labelledby="input-slider"
                    defaultValue={props.min}
                    step={props.step}
                    min={props.min}
                    max={props.max}
                />
                </Grid>
                <Grid item>
                    <Input
                        value={props.value}
                        size="small"
                        onChange={(event) => props.setState(event.target.value === '' ? '' : Number(event.target.value))}
                        onBlur={handleBlur}
                        inputProps={{
                        step: props.step,
                        min: props.min,
                        max: props.max,
                        type: 'number',
                        'aria-labelledby': 'input-slider',
                        }}
                    />
                </Grid>
            </Grid>
        </Box>     
    );
}