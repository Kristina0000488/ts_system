import React, { 
    useState, 
    useEffect 
}                        from 'react';

import { FormControl }   from '@mui/material';

import DoubleBtn         from '../../Buttons/DoubleBtn'
import BaseInput         from '../../Inputs/BaseInput';
import Select            from '../../Inputs/Select';
import FormMultipleEnter from '../../Forms/FormMultipleEnter';

import * as types        from '../../../types';

import './CardInfo.css';


interface CardInfoProps {
   iconName?: types.TypeIcons; 
   onChange?: (value: string | types.ElemForm[] | types.TypeElemCard[], key?: string, type?: types.TypeUIElem ) => void; 
   title: string; 
   fields: types.TypeElemCard[];
   onSave?: ( ) => void;
   edit?: boolean;
   showEdit?: boolean;
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
        showEdit
    } = props;

    useEffect( () => {
        if ( showEdit )
           setShowEditMode( true );        
    }, [ ] )

    const renderString = (value: string | number | types.ElemForm[], color?: string) : React.ReactElement =>
    { //console.log(fields, '02225')
        if ( Array.isArray(value) ) {
            return <>
                { value && value.map( (val, id) => <div key={ id } className='itemRowCardInfo'>
                    <span>
                        { val.label }
                    </span>
                    <span>
                        { val.value }
                        { val.value && '%' }
                    </span> 
                </div> ) }
            </> 
        } else {                    
            return <div className={`itemRowCardInfo ${ color }`}>
                &nbsp;{ value }&nbsp;
            </div>
        }
    }

    const renderElem = ( 
        value: string | types.ElemForm [], 
        key: string, 
        type: types.TypeUIElem = '', 
        required: boolean=false, 
        placeholder: string='', 
        itemsSelect: types.ItemsSelectCommon[]=[] 
    ) => {
        let elem = null;  

        if ( type === 'choice' ) 
        {
            elem = <Select 
                items={ itemsSelect }
                value= { value as string } 
                onChange={ (val: string) => { onChange(val, key, type); console.log( val, '   ----valllll') } } 
                required={ required }
                width={ 230 }
            />  
        } else if ( type === 'multiple_input' ) 
        {
            elem = <FormMultipleEnter 
                value={ value as types.ElemForm [] } 
                required={ required } 
                onChange={ (val) => onChange(val, key, type) }  
                //onSubmit={ () => setShowEditMode(false) }
            />
        } else {
            elem = <BaseInput 
                handleChange={ (val) => { onChange(val, key, type as types.TypeUIElem ); console.log( val, '   ----valllll') }} 
                value={ value as string }
                date={ type === 'date' }
                required={ required }
                placeholder={ placeholder }
            /> 
        }

        return <FormControl variant="standard">
            { elem }
        </FormControl>
    }
    //console.log(fields);
    return (
        <div className='CardInfo'>
            { title.length && <div className='titleCardInfo'>
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
            { fields && fields.map( ({ label, items }, id) =>
                { return label && items && <div key={ id } className='rowCardInfo'>
                    <span className='titleRowCardInfo'>
                        { label }
                    </span>                   
                    <div className={ showEditMode ? 'showEdit_rowCardInfo' : 'rowCardInfo' }>
                        { items.map( ({ 
                            value, 
                            color='', 
                            extraTxt=false, 
                            key='', 
                            type, 
                            required=false, 
                            placeholder='', 
                            itemsSelect=[] 
                        }, id: number) => <span key={ id } >
                            { !extraTxt ? !showEditMode ?                                
                            renderString(value, color) :
                            renderElem( value, key, type, required, placeholder, itemsSelect ) :                                
                            extraTxt && renderString(value, color) }
                        </span> ) }
                    </div>                   
                </div> }
            ) }
        </div>
    );
}

export default CardInfo;