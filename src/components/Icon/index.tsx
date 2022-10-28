import React, { memo } from 'react';

import { TypeIcons }   from '../../types';

import './Icon.css';


interface IconProps<T> 
{
    iconName: T;
    noPadding?: boolean;
    size?: string;  
    iconFolder?: string; 
}


export default function Icon <T extends string | number> ( props: IconProps<T> ): React.ReactElement< IconProps<T> >
{
    const { iconName, noPadding=false, size='20px', iconFolder='icons' } = props;
    
    return (       
        <img  
            src={ require(`../../assets/${ iconFolder }/${ iconName }.png`) } 
            alt="img" 
            className={ `icon ${ !!noPadding ? 'noPadding' : '' }` }
            //style={{ width: size, height: size }}
        />
    );
}

//memo(Icon); 
