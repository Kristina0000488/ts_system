import React, { useState, useEffect } from 'react';

import { FormControl } from '@mui/material';

import BaseInput from '../../Inputs/BaseInput';
import BtnBase   from '../../Buttons/BtnBase';

import * as types from '../../../types';
import { copyObj } from '../../../utils';

import './FormMultipleEnter.css';


interface FormMultipleEnterProps {
    value: types.ElemForm[];
    required: boolean;
    onChange: ( fields: types.ElemForm[] ) => void;
}

export default function FormMultipleEnter(props: FormMultipleEnterProps) 
{        
    //const [ showEditMode, setShowEditMode ] = useState<boolean>( false );
    const [ fields, setFields ] = useState<types.ElemForm[]>( [] );

    const { 
        value=[], 
        onChange, 
        //key='', 
        //type='', 
        required=false
    } = props;

    useEffect( () => {
        //console.log(value);
        if (value.length > 0) setFields( [ ...value ] );
    }, [  ] )

    const onChangeState = async (value: string, key: keyof types.ElemForm, id: number) => {
        const updatedFields = copyObj(fields);

        updatedFields[ id ][ key ] = value;
        
        //console.log(updatedFields)

        await setFields( updatedFields );
        onChange( updatedFields );
    }
    
   // console.log(fields, value)

    return (
        <>
            { fields.length > 0 && fields.map( (val, id) => {
                return <div key={ id } className='FormMultipleEnter'>                    
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
                            placeholder={ 'Value in %' }                            
                        /> 
                    </FormControl>
                    <BtnBase                 
                        title='Remove'
                        onClick={ async () => { 
                            const updatedFields = copyObj(fields).filter( (_, idx) => idx !== id );

                            await setFields( updatedFields ) ; 
                            onChange( updatedFields )
                        } } 
                    />
                </div>
            } ) }
            <div className='btns_FormMultipleEnter'>
                <BtnBase                 
                    title='Add'
                    onClick={ async () => { 
                        const updatedFields = [ ...fields ];

                        await updatedFields.push( { label: '', value: '' } );

                        await setFields( updatedFields );
                        onChange( updatedFields )
                    } } 
                    noSubmit
                />
            </div>
        </>
    );
}
/*
                <BtnBase 
                    title='Done' 
                    onClick={ () => onSubmit() } 
                />
                */