import React              from 'react';

import * as types         from '../../types';

import * as redux         from '../../store/slices';
import { useAppDispatch } from '../../store/hooks';

import BtnBase            from '../../components/Buttons/BtnBase';

import { goBack }         from '../../routes/methods';

import './ExitPage.css';


export const ExitPage: React.FC<types.CommonPropsPage> = () =>
{
    const dispatch = useAppDispatch();

    return (
        <div className="ExitPage">
            <h2>Вы уверены, что хотите выйти из системы?</h2>
            <div>
                <BtnBase key="1" onClick={ () => dispatch( redux.exit() ) } title='Да' />
                <BtnBase key="2" onClick={ () => goBack() } title='Нет' />
            </div>
        </div>
    );
}