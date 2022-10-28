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
}


function BtnBase(props: BtnBtnBaseProps) 
{
    const { icon, onClick, title='', clickedBtn } = props;
    
    return (
        <button 
            className={`btnBtnBase ${ clickedBtn && 'clickedBtnBtnBase' } `} 
            onClick={ onClick } 
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