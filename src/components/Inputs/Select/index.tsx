import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';


interface SelectProps {
    items: { value: number | string, title: string }[ ];
    label?: string;
    value: string;
    onChange: (value: string) => void;
    required?: boolean;
}

export default function BasicSelect(props: SelectProps) {
  //const [age, setAge] = React.useState('');

  const { items=[], label='', value='', onChange, required=false } = props;

  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 90 }}>
      <FormControl fullWidth>
        { label && <InputLabel id="demo-simple-select-label">{ label }</InputLabel>}
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={ value }
          label={ label }
          onChange={ handleChange }
          required={ required }
        >
            { items && items.map( (item, id) => {
              return <MenuItem 
                key={ id } 
                value={ item.value }
              >
                { item.title }
              </MenuItem> 
          })}
        </Select>
      </FormControl>
    </Box>
  );
}
