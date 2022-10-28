import React, 
    { useState, useEffect } from 'react';

import DoubleBtn            from '../../Buttons/DoubleBtn';
import BaseInput            from '../../Inputs/BaseInput';
import BaseTitle            from '../BaseTitle';

import './EditTitle.css';


interface editTitleProps {
    onSave: (value: string) => Promise<any>;     
    bold?: boolean;
    icon?: 'edit';
    item: string;
    labelField?: string;
}

function EditTitle(props: editTitleProps) 
{
    const [ showEditField, setShowEditField ] = useState<boolean>(false);
    const [ value, setValue                 ] = useState<string>('');
        
    const { 
        onSave, 
        bold=false, 
        item='', 
        icon='edit',  
        labelField='' 
    } = props;

    useEffect( () => {        
        if (item)
            setValue(item);
    }, [] );
    
    return (
        <div className='editTitle'>
            { value && <>
                { 
                    !showEditField ? 
                    <BaseTitle value={ value } bold={ bold } /> : 
                    <BaseInput 
                        label={ labelField } 
                        handleChange={ setValue } 
                        value={ value } 
                    />
                }
                <div className='marginBtn'>
                    <DoubleBtn 
                        noBackground 
                        noPadding 
                        iconName={ icon } 
                        onClick={ () => setShowEditField( !showEditField ) } 
                        onSave={ () => onSave(value) }
                        textSecondBtn='Сохранить'
                    />
                </div>
            </> }
        </div>
    );
}

export default EditTitle;