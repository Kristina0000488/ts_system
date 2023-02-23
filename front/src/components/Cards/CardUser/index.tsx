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
    const [ showData, setShowData ] = useState<boolean>(false);

    const { user } = props;
  
    const renderUser = (user: types.ValidUser): React.ReactElement => {
        console.log(user)
        return <>{ Object.entries( user ).forEach( ( [ key, value ], id ) => {
            <div key={ id }>{ `${key} ${value}` }</div>
        }) }</>  
    }

    return (
        <div className='cardUser'>
            <IconBtn<types.TypeIcons> 
                icon={ 'home' } 
                onClick={ () => setShowData(true) } 
                noPadding 
                //noBackground 
            />
            { showData && <div className='container_cardUser'>
                { user ? renderUser( user ) : <></> }
            </div> }            
        </div>
    );
}
