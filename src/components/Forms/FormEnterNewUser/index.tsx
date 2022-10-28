import React, { useState } from 'react';

import Select     from '../../Inputs/Select';
import BaseInput  from '../../Inputs/BaseInput';
import BtnBase    from '../../Buttons/BtnBase';
import IconBtn    from '../../Buttons/IconBtn';
import Dialog     from '../../Dialog';

import * as types from '../../../types';


interface FormEnterNewUserProps {
    elems: { 
        state: string; 
        label: string, 
        password?: boolean, 
        type?: types.TypeUIElem, 
        required?: boolean 
    }[];
    onChange: (value: string, state: string) => void;
    onSubmit: () => void;
    titleBtn?: string;
    values:  {[ index: string ] : string };
    itemsSelect?: types.ItemsSelectRolesUsers[];
    iconsChoice?: types.IconsUser[];
    choicedIcon?: types.IconsUser;
}

export default function FormEnterNewUser(props: FormEnterNewUserProps) 
{        
    const [ showImagesChoice, setShowImagesChoice ] = useState<boolean>( false );

    const { 
        elems=[], 
        onChange, 
        onSubmit, 
        titleBtn='', 
        values={}, 
        itemsSelect=[], 
        iconsChoice=[],
        choicedIcon=''
    } = props;

    return (
        <>
            <IconBtn<types.IconsUser>
                icon={ choicedIcon } 
                onClick={ () => setShowImagesChoice( true ) } 
                noPadding 
                noBackground 
            />
            <Dialog 
                open={ showImagesChoice } 
                onClose={ () => setShowImagesChoice( !showImagesChoice ) }
            >    
                <div className='input_container'>
                    { iconsChoice && iconsChoice.map( ( icon, id ) => {
                        return <IconBtn<types.IconsUser>
                            key={ id } 
                            icon={ icon } 
                            onClick={ () => {
                                onChange( icon, 'image' );
                                setShowImagesChoice( !showImagesChoice );
                            } } 
                            noPadding 
                            noBackground 
                        />
                    }) }
                </div>
            </Dialog>                 
            { elems && elems.map( ({ label, state, password, type='', required=false }, id) => {
                if ( type === 'choice' ) 
                {
                    return <div className='input_container' key={ id } >
                        <Select 
                            key={ id }
                            items={ itemsSelect }
                            value= { values[state] } 
                            onChange={ (value: string) => onChange( value, state) } 
                            label={ label } 
                            required={ required }
                        />  
                    </div> 
                }

                return <div className='input_container' key={ id } >
                    <BaseInput 
                        key={ id }
                        value= { values[state] } 
                        handleChange={ (value: string) => onChange( value, state) } 
                        label={ label } 
                        password={ password }
                        required={ required }
                    />  
                </div> 
            } ) }
            <BtnBase onClick={ onSubmit } title={ titleBtn } />
        </>
    );
}
