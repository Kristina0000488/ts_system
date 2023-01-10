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
            <h2>Are you sure you want to exit?</h2>
            <div>
                <BtnBase key="1" onClick={ () => dispatch( redux.logoutUser() ) } title='Yes' />
                <BtnBase key="2" onClick={ () => goBack() } title='No' />
            </div>
        </div>
    );
}