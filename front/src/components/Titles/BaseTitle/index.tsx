import React from 'react';

import './BaseTitle.css';


interface BaseTitleProps { 
    value: string;
    bold?: boolean;
}


function BaseTitle(props: BaseTitleProps) 
{        
    const { 
        value='',
        bold=false,
    } = props;
    
    return (
        <div className='BaseTitle'>
            { value && <span className={ bold ? 'boldFont' : 'mediumFont' }>
                { value }
            </span> }
        </div>
    );
}

export default BaseTitle;