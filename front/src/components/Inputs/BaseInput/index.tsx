import React      from 'react';

import TextField  from '@mui/material/TextField';
import { styled } from '@mui/material/styles';


const CssTextField = styled( TextField ) (
    {
        '& label.Mui-focused': {
            color: '#808080',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#CDCDCD',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#CDCDCD',
            },
            '&:hover fieldset': {
                borderColor: '#808080',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#3B3B3B',
            },
        },
    }
);


interface BaseInputProps {
    handleChange: (value: string) => void;   
    value: string;
    label?: string;
    date?: boolean,
    password?: boolean,    
    required?: boolean;
}

export default function BaseInput(props: BaseInputProps) 
{        
    const { 
        handleChange, 
        value='', 
        label='', 
        date=false,
        password=false,
        required=false,
    } = props;
    
    return (
        <CssTextField 
            id="outlined-basic fullWidth" 
            label={ label } 
            variant="outlined" 
            value={ value }
            onChange={ (e: React.ChangeEvent<HTMLInputElement>) => handleChange(e.target.value) }
            type={ date ? 'date' : password ? 'password' : 'text' }
            required={ required }
        /> 
    );
}
