import React, { memo }       from 'react';

import { TypeFooterContent } from '../../types';
import {  contentFooter }    from '../../constants';

import './Footer.css';


interface footerProps {
    content?: TypeFooterContent;   
}

function Footer(props: footerProps) 
{
    const { content=contentFooter } = props;

    return (
        <div className='footer'>
            { content && content.map( ({ text }, id) => 
                <div 
                    key={ id } 
                    className='textFooter'
                >
                    { text }
                </div>
            ) }
        </div>
    );
}

export default memo(Footer);