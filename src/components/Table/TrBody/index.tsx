import React, { useState, useEffect }      from 'react';


import IconBtn       from '../../Buttons/IconBtn';
import BaseInput       from '../../Inputs/BaseInput';
import Select       from '../../Inputs/Select';
import { getFullDate } from '../../../utils';

import * as types from '../../../types';

import './TrBody.css';


interface TrBodyProps {
    item: types.BackendUser,
    setEditMode: ( mode: boolean ) => void,
    onClickRemove: ( ) => void,
    editMode: boolean,
    onChange: ( updated: types.BackendUser ) => void,
    itemsSelect?: types.ItemsSelectRolesUsers[]
    onClickTr?: ( ) => void,
}


export default function TrBody(props: TrBodyProps) 
{   
    const { 
        setEditMode=(() => null), 
        item, 
        editMode=false, 
        onClickRemove=(() => null), 
        onChange, 
        itemsSelect=[], 
        onClickTr,
    } = props;

    const renderTdTr = ( value: string | number, key: string, editShow: boolean = false, type?: types.TypeUIElem ) : React.ReactElement => 
    {
        let htmlElem: React.ReactElement = <></>;
        
        if ( editShow ) 
        { 
            if ( type === 'date' ) {       
                htmlElem = <BaseInput 
                    date 
                    value={ value as string } 
                    handleChange={ (e) => onChangeValue( e, key as keyof types.BackendUser ) }
                />;            
            } else if ( type === 'choice' ) {
                htmlElem = <Select 
                    key={ item.id } 
                    value={ item.role.value.toLocaleLowerCase() } 
                    onChange={ (value) => onChangeValue( value.toLowerCase(), key as keyof types.BackendUser ) }
                    items={ itemsSelect } 
                />
            } else { 
                htmlElem = <input 
                    value={ value } 
                    onChange={ (e) => onChangeValue( e.target.value, key as keyof types.BackendUser ) }
                />                
            }

            return <td>{ htmlElem }</td>;
        }

        return <td>
            { value }
        </td>
    }

    const onChangeValue = <K extends keyof types.BackendUser>( value: types.BackendUser[ K ], key: K ) : void => 
    { 
        let updated   = { ...item as types.BackendUser };
        let subObject = updated[ key as keyof typeof updated ];
     
        if ( subObject instanceof Object ) {
            subObject = { ...subObject, value: value as string  };            
            updated   = { ...updated, [ key ]: { ...(subObject as Object) } as typeof subObject };
        } else {
            subObject = value;
            updated   = { ...updated, [ key ]: subObject as typeof subObject };
        }

        onChange( updated );
    }

    const renderActions = ( ) : React.ReactElement => 
    {
        return <div> 
            <IconBtn<types.TypeIcons> 
                key='1' 
                noPadding 
                noBackground 
                sizeBtn='20px' 
                icon='editColor' 
                onClick={ () => setEditMode( true ) }
            />
            { !editMode && <IconBtn<types.TypeIcons> 
                key='2' 
                noPadding 
                noBackground 
                sizeBtn='20px' 
                icon='delete' 
                onClick={ () => onClickRemove( ) }
            />}
        </div>
    }
    
    return ( <>
        { item && <tr key={ item.id } onClick={ onClickTr } >
            { renderTdTr( item.id, 'id', editMode ) }
            { renderTdTr( item.userName, 'userName', editMode ) }
            { renderTdTr( item.role.value, 'role', editMode, item.role.type ) }
            { renderTdTr( item.createdAt.value, 'createdAt', false ) }
            { renderTdTr( item.updatedAt ? item.updatedAt.value : '', 'updatedAt', false ) }
            <td>
                { renderActions() }
            </td>
        </tr> }
    </> );
}