import React, { useState, useEffect } from 'react';


import DoubleBtn           from '../../Buttons/DoubleBtn'
import BaseInput           from '../../Inputs/BaseInput';

import { TypeElemCard, TypeIcons }    from '../../../types';

import './CardInfo.css';


interface CardInfoProps {
   iconName?: TypeIcons; 
   onChange?: (value: string, key?: string, type?: string) => void; 
   title: string; 
   fields: TypeElemCard[];
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
        {
            setShowEditMode( true );
        }
    }, [ ] )

    const renderString = (value: string | number, color?: string) : React.ReactElement =>
    {
        return <span className={`itemRowCardInfo ${ color }`}>
            &nbsp;{ value }&nbsp;
        </span>  
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
                        textSecondBtn='Сохранить'
                    />
                </div> }
            </div> }
            { fields && fields.map( ({ label, items }, id) =>
                { return label && items && <div key={ id } className='rowCardInfo'>
                    <span className='titleRowCardInfo'>
                        { label }
                    </span>                   
                    <div className={ showEditMode ? 'showEdit_rowCardInfo' : 'rowCardInfo' }>
                        { items.map( ({ value='', color, extraTxt, key, type }, id) => <div key={ id } >
                            { 
                                !extraTxt ? !showEditMode ?                                
                                    renderString(value, color) :
                                <BaseInput 
                                    handleChange={ (val) => onChange(val, key, type) } 
                                    value={ value }
                                    date={ type === 'date' }
                                /> : 
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