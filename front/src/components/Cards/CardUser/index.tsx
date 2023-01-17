import React, { useState } from 'react';

import IconBtn           from '../../Buttons/IconBtn';
import BaseInput           from '../../Inputs/BaseInput';

import * as types    from '../../../types';

import './CardUser.css';


interface CardUserProps {
    items: types.ItemsSelectCommon[],
    avatarName?: types.IconsUser; 
    onChangeAvatar?: () => void;
}


export default function CardUser(props: CardUserProps): React.ReactElement<CardUserProps> 
{    
    const { items, avatarName='', onChangeAvatar } = props;
   // console.log(items)
    return (
        <div className='cardUser'>
            <IconBtn<types.IconsUser> 
                icon={ avatarName } 
                onClick={ onChangeAvatar && onChangeAvatar } 
                noPadding 
                noBackground 
            />
            <>
                { items && items.map( ({ value, title }, id) => {
                    return <div key={ id }> 
                        <label>{ title }</label> 
                        <p>{ value }</p>
                    </div>
                }) }
            </>
        </div>
    );
}
