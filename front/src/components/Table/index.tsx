import React, { 
    useState, 
    useEffect 
}                 from 'react'; 

import TrBody     from './TrBody';
import Progress   from '../Progress';

import * as types from '../../types';

import { getFullDate } from '../../utils';

import './Table.css';
import { idText } from 'typescript';


interface TableProps {
    items: types.AllUsersForTable | null,
    edit?: boolean,
    titles?: Array<string>,
    onSubmit?: ( value: types.BackendUser ) => void, //( values: types.AllUsersForTable ) => void,
    onClickRemove?: ( id: number ) => void,
    itemsSelect?: types.ItemsSelectRolesUsers[],
    onClickTr?: ( user: types.BackendUser ) => void,
}


export default function Table(props: TableProps) 
{       
    const [ editMode, setEditMode ] = useState<boolean>(false);
    const [ values, setValues     ] = useState<types.AllUsersForTable>([ ]); 
    const [ value, setValue     ] = useState<types.BackendUser>({ } as types.BackendUser); 

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


    const onChange = ( value: types.BackendUser, id: number, idx: number ) : void => 
    {
        const newDate: Date = new Date();

        let newValues = [ ...values ];
        let newValue = { ...value };

        value.updatedAt = { type: 'date', value: getFullDate( newDate.toDateString() ) }; //! to set to array with idx of updated values

        newValues[ idx ] = value;
        console.log( newValue );
        setValue( newValue ); //value
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
                            onChange={ (value: types.BackendUser) => onChange( value, user.id, idx ) }
                            itemsSelect={ itemsSelect }
                        />
                    }) : <td>Нет данных</td> }
                </tbody>
            </table>
            { editMode && <button onClick={ () => { 
                setEditMode(false); 
                onSubmit( value ) 
            } }>
                Save
            </button> }
        </>
    );
}