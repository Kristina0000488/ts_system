import React      from 'react';

import * as types from '../../types';

import './ListCompanies.css';


interface ListCompaniesProps {
    title?: string;
    values: Array<types.CompaniesList>;
    onClick?: (id: string) => void;
}


export default function ListCompanies(props: ListCompaniesProps) 
{   
    const { title, values=[], onClick=(() => null) } = props;
    
    return (
        <div className="listValues">
            { title && <span className='title_ListValues'>
                { title.toUpperCase() }
            </span> }
            { values.length > 0 ? <ul className="list_ListValues">
                { values.map( ({ name, id }, idx) => <li 
                    key={ idx } 
                    onClick={ _ => onClick(id.toString()) }
                >
                    { name }
                </li> ) }
            </ul> : <div className="text_listValues">No founded companies</div> }
        </div>
    );
}