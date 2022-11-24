import React, { memo }      from 'react';

import IconBtn              from '../../Buttons/IconBtn';

import { TypeSideNavElems, TypeIcons } from '../../../types';

import './SideNav.css';


interface SideNavProps 
{
    elems: TypeSideNavElems;
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
                    { arr.map( ({ icon, id, path='' }, idx) => 
                        <IconBtn<TypeIcons> 
                            key={ id }
                            icon={ icon } 
                            path={ path }
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