import React             from 'react';

import {  ImgFieldCard, TypeIcons } from '../../../types';

import IconBtn           from '../../Buttons/IconBtn'

import './CardImg.css';


interface CardImgProps {
   title: string; 
   fields: ImgFieldCard[];
   onRemove?: ( id: number, imgName: string ) => void;
   remove?: boolean;
   //width?: string;
   //height? : string;
}

function CardImg(props: CardImgProps) 
{    
    const { 
        remove=false, 
        title='', 
        fields, 
        onRemove=( () => null ), 
        //width='160px', 
        //height='160px' 
    } = props;

    const renderImg = (filepath: string) : React.ReactElement =>
    {       
        return <img src={ filepath } alt="img" />
    }
    
    return (
        <div className='CardImg'>
            { title.length && <div className='titleCardImg'>
                { title.toUpperCase() }
            </div> }
            <div className='containerCardImg'>
                { fields && fields.map( ({ filepath, name='' }, idx) =>
                    <div key={ idx } className='blockCardImg'>
                        <div className='imageCardImg'>
                            { renderImg(filepath) }
                            { !!remove && <IconBtn<TypeIcons>
                                icon={ 'remove' as TypeIcons } 
                                onClick={ () => onRemove( idx, name ) } 
                                noBackground 
                                noPadding 
                                styleClass='iconBtnCardImg'
                                size='25px'
                                sizeBtn='25px'
                            /> }
                        </div>
                        <span className='textCardImg'>
                            { name }
                        </span>
                    </div>
                ) } 
            </div>
        </div>
    );
}

export default CardImg;