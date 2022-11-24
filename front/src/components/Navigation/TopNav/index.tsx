import React, { memo }          from 'react';

import IconBtn                  from '../../Buttons/IconBtn';

import { 
    TypeIconsTopNavRightSide, 
    CollectionOnClickIconsRight,
    TypeIcons
}                               from '../../../types';

import './TopNav.css';


interface topNavProps {
    iconBack?: boolean; 
    onBack: () => void; 
    title?: string; 
    iconsRightSide?: TypeIconsTopNavRightSide[];
    collectionOnClickIconsRight?: CollectionOnClickIconsRight;
}


function TopNav(props: topNavProps) 
{
    const { iconBack=false, onBack, title, iconsRightSide=[], collectionOnClickIconsRight } = props;

    return (
        <div className='topNav'>
            <div className='blockTopNav'>
                { iconBack && <div className='iConBtnContainer'>
                    <IconBtn icon='arrow' onClick={ onBack } noPadding noBackground />
                </div> }
                { title }
            </div>
            <div className='blockTopNav'>
                { iconsRightSide && iconsRightSide.map( ({ id, icon }) => 
                    <IconBtn<TypeIcons> 
                        key={ id }
                        icon={ icon } 
                        onClick={ collectionOnClickIconsRight ? collectionOnClickIconsRight[ id ] : ( () => null ) } 
                        noPadding 
                        noBackground 
                    /> 
                ) }
            </div>
        </div>
    );
}

export default memo(TopNav);