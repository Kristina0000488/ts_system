import React, { memo}           from 'react';

import BtnRect                  from '../../Buttons/BtnBase';

import { TypeExtraSideNavPage } from '../../../types';

import './ExtraSideNav.css';


interface ExtraSideNavProps 
{
    content: TypeExtraSideNavPage;   
    onClick: (path: string) => void; 
    clickedId: number;
}


function ExtraSideMenu(props: ExtraSideNavProps) 
{
    const { content, onClick, clickedId } = props;
    
    return ( <> 
        { content && <div className="extraSideNav">
           <div className="header_extraSideNav">        
                <p className="title_header_extraSideNav">
                    { content.title.toUpperCase() }
                </p>
                <p className="subtitle_header_extraSideNav">
                    { content.subtitle.toUpperCase() }
                </p>
           </div>
            { content.menu && content.menu.map( ( { icon, path, title, id } ) => 
                <BtnRect 
                    icon={ icon } 
                    key={ id } 
                    title={ title } 
                    clickedBtn={ clickedId === id }
                    onClick={ () => {                        
                        if (path) 
                            onClick(path);
                    } }
                />                    
            ) }
        </div> } 
    </> );
}

export default memo(ExtraSideMenu);
