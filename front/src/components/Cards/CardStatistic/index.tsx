import React             from 'react';

import { ColorsCardStatistics } from '../../../types';

import IconBtn           from '../../Buttons/IconBtn'

import './CardStatistic.css';


interface CardStatisticProps {
   title: string; 
   text: string | number;
   color?: ColorsCardStatistics
}

function CardStatistic(props: CardStatisticProps) 
{    
    const { 
        title='', 
        text='',
        color='yellow'
    } = props;

    return (
        <div className={ `CardStatistic ${ color }_CardStatistic` }>
            <div className='text_CardStatistic'>
                { text }
            </div>
            { title.length && <div className='title_CardStatistic'>
                { title }
            </div> }
        </div>
    );
}

export default CardStatistic;