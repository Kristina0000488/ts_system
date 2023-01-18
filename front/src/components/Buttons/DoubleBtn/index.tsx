import React, { memo, useState } from 'react';

import { TypeIcons }             from '../../../types';

import IconBtn                   from '../IconBtn';

import './DoubleBtn.css';


interface DoubleBtnProps 
{
    iconName: TypeIcons;
    noPadding?: boolean;
    noBackground?: boolean;
    textSecondBtn?: string;
    size?: string;
    onClick: () => void; 
    onSave: () => void; 
}


function DoubleBtn(props: DoubleBtnProps) 
{
    const [ show, setShow ] = useState<boolean>(true);

    const { 
        iconName, 
        noPadding=false, 
        noBackground=false, 
        size='20px', 
        onClick, 
        textSecondBtn, 
        onSave 
    } = props;
    
    return ( <>
        { show ? <IconBtn<TypeIcons> 
            noBackground 
            noPadding 
            icon={ iconName } 
            onClick={ () => {
                setShow( !show );
                onClick();
            } } 
        /> : <IconBtn<TypeIcons> 
            noPadding 
            noBackground 
            icon='doubletick' 
            onClick={ () => {
                onClick();
                setShow( !show );
                onSave()
            } }    
        /> }
    </> );
}

export default memo(DoubleBtn);