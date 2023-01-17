import React, { useState, useEffect } from 'react';

import { FormControl } from '@mui/material';

import DoubleBtn           from '../../Buttons/DoubleBtn'
import BaseInput           from '../../Inputs/BaseInput';
import Select           from '../../Inputs/Select';


import { TypeElemCard, TypeIcons, ItemsSelectCommon }    from '../../../types';

import './CardInfo.css';


interface CardInfoProps {
   iconName?: TypeIcons; 
   onChange?: (value: string, key?: string, type?: string) => void; 
   title: string; 
   fields: TypeElemCard[];
   onSave?: ( ) => void;
   edit?: boolean;
   showEdit?: boolean;
  // itemsSelect?: types.ItemsSelectCommon[];
}

function CardInfo(props: CardInfoProps) 
{    
    const [ showEditMode, setShowEditMode ] = useState<boolean>(false);

    const { 
        iconName='edit', 
        onChange=(() => null), 
        title='', 
        fields, 
        onSave=(() => null), 
        edit=false,
       // itemsSelect=[],
        showEdit
    } = props;

    useEffect( () => {
        if ( showEdit )
            setShowEditMode( true );        
    }, [ ] )

    const renderString = (value: string | number, color?: string) : React.ReactElement =>
    {
        return <span className={`itemRowCardInfo ${ color }`}>
            &nbsp;{ value }&nbsp;
        </span>  
    }

    const renderElem = ( value: string='', color: string, extraTxt: boolean, key: string, type: string, required: boolean=false, placeholder: string='', itemsSelect: ItemsSelectCommon[]=[] ) => {
        if ( type === 'choice' ) 
        {
            return <Select 
                //key={ id }
                items={ itemsSelect }
                value= { value } 
                onChange={ (val: string) => onChange(val, key, type) } 
                //label={ label } 
                required={ required }
            />  
        }

        return  <BaseInput 
            handleChange={ (val) => onChange(val, key, type) } 
            value={ value }
            date={ type === 'date' }
            required={ required }
            //key={ id }
            placeholder={ placeholder }
        /> 
    }
    
    return (
        <div className='CardInfo'>
            <> { title.length && <div className='titleCardInfo'>
                { title.toUpperCase() }
                { !!edit && <div className='marginBtn'>
                    <DoubleBtn 
                        noBackground 
                        noPadding 
                        iconName={ iconName } 
                        onClick={ () => setShowEditMode( !showEditMode ) } 
                        onSave={ () => onSave() }
                        size='16px'
                        textSecondBtn='Submit'
                    />
                </div> }
            </div> }
            { fields &&  fields.map( ({ label, items }, id) =>
                { return label && items && <div key={ id } className='rowCardInfo'>
                    <span className='titleRowCardInfo'>
                        { label }
                    </span>                   
                    <div className={ showEditMode ? 'showEdit_rowCardInfo' : 'rowCardInfo' }>
                        { items.map( ({ value='', color='', extraTxt=false, key='', type='', required=false, placeholder='', itemsSelect=[] }, id) => <div key={ id } >
                            { 
                                !extraTxt ? !showEditMode ?                                
                                    renderString(value, color) :
                                <FormControl variant="standard">
                                    { renderElem( value, color, extraTxt, key, type, required, placeholder, itemsSelect ) }
                                </FormControl> : 
                                extraTxt && renderString(value, color) 
                            }
                        </div> ) }
                    </div>                   
                </div> }
            ) } </>
        </div>
    );
}

export default CardInfo;