import React, { memo } from 'react';

import { TypeIcons }   from '../../../types';

import Icon            from '../../Icon';

import './BtnBase.css';


interface BtnBtnBaseProps 
{
    icon?: TypeIcons;
    title?: string;
    onClick: () => void; 
    clickedBtn?: boolean;  
    noSubmit?: boolean;  
}


function BtnBase(props: BtnBtnBaseProps) 
{
    const { icon, onClick, title='', clickedBtn, noSubmit=false } = props;
    
    return (
        <button 
            className={`btnBtnBase ${ clickedBtn && 'clickedBtnBtnBase' } `} 
            onClick={ onClick } 
            type={`${ noSubmit ? 'button' : 'submit' }`}
        >
            { icon && <div className='iconContainer'>
                <Icon<TypeIcons> 
                    iconName={ icon } 
                    noPadding 
                />
            </div> }
           { title }
        </button>
    );
}

export default memo(BtnBase);