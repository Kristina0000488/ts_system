import React, { memo }      from 'react';

import IconBtn              from '../../Buttons/IconBtn';

import { TypesideNavElems, TypeIcons } from '../../../types';

import './SideNav.css';


interface SideNavProps 
{
    elems: TypesideNavElems;
    onClick: (path: string) => void;    
    clickedId: number;
}


function SideNav(props: SideNavProps) 
{
    const { elems, onClick, clickedId } = props;
    
    return (
        <div className='sideNavContainer'>
            { elems && elems.map( (arr, id) => 
                <div key={ id }>
                    { arr.map( ({ icon, id, path='', title='' }, idx) => 
                        <IconBtn<TypeIcons> 
                            key={ id }
                            icon={ icon } 
                            path={ path }
                            title={ title }
                            clickedBtn={ clickedId === id }
                            onClick={ () => {
                                if (path) 
                                    onClick(path);
                            } } 
                        /> 
                    ) }
                </div> 
            ) }   
        </div>
    );
}

export default memo(SideNav);