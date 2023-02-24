import React, { useState } from 'react';

import IconBtn           from '../../Buttons/IconBtn';
import BaseInput           from '../../Inputs/BaseInput';

import * as types    from '../../../types';

import './CardUser.css';


interface CardUserProps {
    user: types.ValidUser;
}


export default function CardUser(props: CardUserProps): React.ReactElement<CardUserProps> 
{
    const [ showData, setShowData ] = useState<boolean>(true);
    const { user } = props;
  
    const renderUser = (user: types.ValidUser): React.ReactElement => {
        return <>{ Object.entries( user ).map( ( [ key, value ], id ) => {
            return <div className="" key={ id }>{ `${key}: ${value}` }</div>
        }) }</>
    }

    return (
        <div className='cardUser' onBlur={ () => setShowData(true) }>            
            <div className='btn_cardUser'>
                <IconBtn<types.TypeIcons> 
                    icon={ 'user' } 
                    onClick={ () => setShowData(true) } 
                    noPadding 
                    noBackground 
                />
            </div>
            { showData && <div className='container_cardUser'>
                { user && renderUser( user ) }
            </div> }            
        </div>
    );
}
/*
<IconBtn<types.TypeIcons> 
icon={ 'home' } 
onClick={ () => setShowData(true) } 
noPadding 
//noBackground 
/>*/