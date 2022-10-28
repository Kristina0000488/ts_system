import * as  React from 'react';

import Paper       from '@mui/material/Paper';
import InputBase   from '@mui/material/InputBase';
import Divider     from '@mui/material/Divider';
import IconButton  from '@mui/material/IconButton';
import SearchIcon  from '@mui/icons-material/Search';


interface SearchInputProps {
  handleChange: (value: string) => void;  
  handleClick: () => void;
  value: string;
  placeholder?: string;
  width?: number;
}


export default function SearchInput(props: SearchInputProps) 
{
    const { placeholder='', width=400, value, handleChange, handleClick } = props;

    return (
        <Paper
            sx={{ 
                p: '2px 4px', 
                display: 'flex', 
                alignItems: 'center', 
                width 
            }}
        > 
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder={ placeholder }
                inputProps={{ 'aria-label': 'search google maps' }}
                onChange={ (e: React.ChangeEvent<HTMLInputElement>) => handleChange(e.target.value) }
                value={ value }
            /> 
            <Divider 
                sx={{ height: 28, m: 0.5 }}
                orientation="vertical" 
            />
            <IconButton 
                style={{ color: '#82B284' }} 
                sx={{ p: '10px' }} 
                aria-label="search" 
                onClick={ handleClick }
            >
                <SearchIcon  />
            </IconButton>
        </Paper>
    );
}