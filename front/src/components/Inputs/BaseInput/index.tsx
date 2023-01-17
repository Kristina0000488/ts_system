import React      from 'react';

import InputLabel from '@mui/material/InputLabel';

import TextField  from '@mui/material/TextField';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';



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
    placeholder?: string;
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
        placeholder=''
    } = props;
    //console.log(placeholder)
    return (<>

        <OutlinedInput 
            //id="outlined-basic fullWidth" 
            placeholder={ placeholder } 
           // variant="outlined" 
            value={ value }
            onChange={ (e: React.ChangeEvent<HTMLInputElement>) => handleChange(e.target.value) }
            type={ date ? 'date' : password ? 'password' : 'text' }
            required={ required }
            color='primary'
            size="small"
            //aria-describedby="my-helper-text" 
        /> 
</> 
    );
}
