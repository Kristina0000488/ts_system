import React, { useState, useEffect } from 'react';

import { FormControl } from '@mui/material';

import BaseInput  from '../../Inputs/BaseInput';

import * as types from '../../../types';


interface FormMultipleEnterProps {
    value: types.ElemForm[];
    required: boolean;
    onChange: ( fields: types.ElemForm[] ) => void;
    onSubmit: () => void;
}

export default function FormMultipleEnter(props: FormMultipleEnterProps) 
{        
    //const [ showEditMode, setShowEditMode ] = useState<boolean>( false );
    const [ fields, setFields ] = useState<types.ElemForm[]>( [] );

    const { 
        value=[], 
        onChange, 
        onSubmit, 
        //key='', 
        //type='', 
        required=false
    } = props;

    useEffect( () => {
       // if (value.length > 0) setFields( value );
    }, [  ] )

    const onChangeState = async (value: string, key: string, id: number) => {
        const updatedFields = [ ...fields ];

        updatedFields[ id ][ key as keyof types.ElemForm ] = value;
        
        console.log(key, value, id, updatedFields)

        await setFields( updatedFields );
        //onChange( updatedFields );
    }
    
    console.log(fields, value)

    return (
        <>
            { fields.length > 0 && fields.map( (val, id) => {
                return <div key={ id }>                    
                    <FormControl variant="standard">
                        <BaseInput 
                            handleChange={ (val) => onChangeState(val, 'label', id) } 
                            value={ val.label }
                            required={ required }
                            placeholder={ 'Label of share' }
                        /> 
                    </FormControl>
                    <FormControl variant="standard">
                        <BaseInput 
                            handleChange={ (val) => onChangeState(val, 'value', id) } 
                            value={ val.value }
                            required={ required }
                            numbers
                            placeholder={ 'Value' }
                        /> 
                    </FormControl>
                </div>
            } ) }
            <button onClick={ async () => { 
                const updatedFields = [ ...fields ];

                await updatedFields.push( { label: '', value: '' } );

                await setFields( updatedFields );
                onChange( fields )
            } }>
                Add
            </button>
            { <button onClick={ () => onSubmit() }>Done</button> }
        </>
    );
}