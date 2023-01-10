import React, { memo } from 'react';

import * as types from '../../types';
import './ErrorsList.css';


interface ErrorsListProps 
{
    errors: types.TypeErrorState[];
    onClose: (id: number) => void;  
}


function ErrorsList(props: ErrorsListProps) 
{
    const { errors, onClose } = props;
    console.log(errors);
    return (
        <div className="errorsList">
            { errors && errors.map( error => <div key={ error.id } className="errorContainer">
                { error.message } 
                { error.statusCode && <span>
                    Статус код: { error.statusCode }
                </span> }
                <button onClick={ () => onClose( error.id ) }>
                    Close
                </button>
            </div> ) }
        </div>
    );
}

export default memo(ErrorsList);