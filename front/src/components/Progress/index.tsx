import React            from 'react';

import CircularProgress from '@mui/material/CircularProgress';


interface ProgressProps {
    size?: number;
    thickness?: number;
    animationDuration?: string;
}

export default function Progress(props: ProgressProps) 
{    
    const { 
        size=25,
        thickness=4,
        animationDuration='550ms'
    } = props;

    return (
        <CircularProgress 
            sx={{
                color: (theme) => (theme.palette.mode === 'light' ? '#002FD2' : '#002ed290'),
                animationDuration,
            }}
            size={ size }
            thickness={ thickness } 
        />
    );
}
