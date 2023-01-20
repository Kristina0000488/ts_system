import React, { useState, useEffect } from 'react';

import { FormControl } from '@mui/material';

import DoubleBtn           from '../../Buttons/DoubleBtn'
import BaseInput           from '../../Inputs/BaseInput';
import Select           from '../../Inputs/Select';


import { TypeElemCard, TypeIcons, ItemsSelectCommon }    from '../../../types';

import './CardInfo.css';


interface CardInfoProps {
   iconName?: TypeIcons; 
   onChange?: (value: string /*| any[]*/, key?: string, type?: string) => void; 
   title: string; 
   fields: TypeElemCard[];
   onSave?: ( ) => void;
   edit?: boolean;
   showEdit?: boolean;
   //extraFieldMultipleInput: []
  // itemsSelect?: types.ItemsSelectCommon[];
}

function CardInfo(props: CardInfoProps) 
{    
    const [ showEditMode, setShowEditMode ] = useState<boolean>(false);
    //const [ showDoneCapitalBtn, setShowDoneCapitalBtn ] = useState<boolean>(true);
   // const [ capital, setShowDoneCapitalBtn ] = useState<boolean>(false);

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

   /* const renderMultipleInput = ( value: { label: string, value: string}[], key: string, type: string, required: boolean=false ) => {
        let fields = [ ...value ];

        let inputs = null;
        console.log(value, key)
        const renderInitialElems = (firstVal: string, secondVal: string) => <div>
            <FormControl variant="standard">
                <BaseInput 
                    key={ key + '100'}
                    handleChange={ (val) => onChange(val, key, type) } 
                    value={ firstVal }
                    //date={ type === 'date' }
                    required={ required }
                    //key={ id }
                    placeholder={ 'Label of share' }
                /> 
            </FormControl>
            <FormControl variant="standard">
                <BaseInput 
                    key={ key + '200'}
                    handleChange={ (val) => onChange(val, key, type) } 
                    value={ secondVal }
                    //date={ type === 'date' }
                    required={ required }
                    //key={ id }
                    placeholder={ 'Value' }
                /> 
            </FormControl>
        </div>

        if ( value.length ) {
            inputs = value.map( (val, id) => {
                return <div key={ id }>{ renderInitialElems(val.label, val.value) }</div>
            } )
        }

        const elems = <div>
            { inputs && inputs }
            <button onClick={ async (e) => { 
                await fields.push({ label: '', value: '' });

                onChange( fields, key, type)
            } }>add</button>
            { showEditMode && <button>Done</button> }
        </div>
        return elems;
    }*/

    const renderElem = ( 
        value: string | { label: string, value: string } []='', 
        key: string, 
        type: string, 
        required: boolean=false, 
        placeholder: string='', 
        itemsSelect: ItemsSelectCommon[]=[] 
    ) => {
        let elem = null;

        if ( type === 'choice' ) 
        {
            elem = <Select 
                //key={ id }
                items={ itemsSelect }
                value= { value as string } 
                onChange={ (val: string) => onChange(val, key, type) } 
                //label={ label } 
                required={ required }
                width={ 230 }
            />  
        }

        if ( type === 'multiple_input' ) 
        {
            //return renderMultipleInput( value as { label: string, value: string } [], key, type, required );
        }

        elem = <BaseInput 
            handleChange={ (val) => onChange(val, key, type) } 
            value={ value as string }
            date={ type === 'date' }
            required={ required }
            //key={ id }
            placeholder={ placeholder }
        /> 

        return <FormControl variant="standard">
            { elem }
        </FormControl>
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
                        { items.map( ({ 
                            value='', 
                            color='', 
                            extraTxt=false, 
                            key='', 
                            type='', 
                            required=false, 
                            placeholder='', 
                            itemsSelect=[] 
                        }, id) => <div key={ id } >
                            { 
                                !extraTxt ? !showEditMode ?                                
                                renderString(value, color) :
                                renderElem( value, key, type, required, placeholder, itemsSelect ) :                                
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