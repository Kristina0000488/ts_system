import React, { 
    useState, 
    useEffect 
}                 from 'react'; 

import TrBody     from './TrBody';
import Progress   from '../Progress';

import * as types from '../../types';

import { getFullDate } from '../../utils';

import './Table.css';


interface TableProps {
    items: types.AllUsersForTable | null,
    edit?: boolean,
    titles?: Array<string>,
    onSubmit?: ( values: types.AllUsersForTable ) => void,
    onClickRemove?: ( id: number ) => void,
    itemsSelect?: types.ItemsSelectRolesUsers[],
    onClickTr?: ( user: types.BackendUser ) => void,
}


export default function Table(props: TableProps) 
{       
    const [ editMode, setEditMode ] = useState<boolean>(false);
    const [ values, setValues     ] = useState<types.AllUsersForTable>([ ]); 

    const { 
        items, 
        titles=[], 
        onSubmit=(() => null), 
        edit=false, 
        onClickRemove=(() => null), 
        itemsSelect=[], 
        onClickTr 
    } = props;

    useEffect( () => { 
        if ( items )
            setValues( items );
    }, [ items ] );


    const onChange = ( value: types.BackendUser, idx: number ): void => 
    {
        const newDate: Date = new Date();

        let newValues = [ ...values ];

        value.updatedAt = { type: 'date', value: getFullDate( newDate.toDateString() ) }; //! to set to array with idx of updated values

        newValues[ idx ] = value;
        
        setValues( newValues );
    }
    
    return (
        <>
            <table className="">
                { titles && <thead>
                    <tr >
                        { titles && titles.map( (title, id) => <th key={ id }>{ title }</th> ) }
                    </tr>
                </thead>}
                <tbody>
                    { !values ? <Progress /> : values.length ? values.map( (user, idx) => { 
                        return <TrBody 
                            onClickTr={ ( ) => onClickTr && user && onClickTr( user ) }
                            key={ idx } 
                            editMode={ editMode } 
                            setEditMode={ () => setEditMode( !editMode ) } 
                            item={ user } 
                            onClickRemove={ () => onClickRemove( user.id ) } 
                            onChange={ (value: types.BackendUser) => onChange( value, idx ) }
                            itemsSelect={ itemsSelect }
                        />
                    }) : <td>Нет данных</td> }
                </tbody>
            </table>
            { editMode && <button onClick={ () => { 
                setEditMode(false); 
                onSubmit( values ) 
            } }>
                Save
            </button> }
        </>
    );
}