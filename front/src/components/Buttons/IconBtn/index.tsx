import React, { memo } from 'react';

import { TypeIcons }   from '../../../types';

import Icon            from '../../Icon';

import './IconBtn.css';


interface IconBtnProps<T>
{
    icon : T;
    path?: string;
    title?: string;
    clickedBtn?: boolean;
    onClick?: () => void; 
    noPadding?: boolean; 
    styleClass?: string;  
    noBackground?: boolean;
    size?: string;
    sizeBtn?: string;
    iconFolder?: string
}



export default function IconBtn <T extends string | TypeIcons> ( props: IconBtnProps<T> ): React.ReactElement< IconBtnProps<T> >
{
    const { 
        icon, 
        onClick, 
        clickedBtn=false, 
        noPadding=false, 
        styleClass, 
        noBackground=false,
        size='20px',
        sizeBtn='',
        title='',
        iconFolder
    } = props;
    
    return (
        <button 
            className={ 
                `iconBtn ${ clickedBtn && 'clickedIconBtn' } 
                ${ styleClass ? styleClass : '' } 
                ${ noBackground ? 'noBackground' : '' }` 
            } 
            onClick={ onClick && onClick }
            style={{ width: sizeBtn }} 
        >
            { icon && <Icon<T> 
                iconName={ icon } 
                noPadding={ noPadding } 
                size={ size } 
                iconFolder={ iconFolder } 
            /> }
            { title && <span>{ title }</span> }
        </button>
    );
}
//memo(IconBtn);