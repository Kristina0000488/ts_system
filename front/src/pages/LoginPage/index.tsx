import React, 
    { useEffect, useState }  from 'react';

import * as types            from '../../types';

import * as redux            from '../../store/slices';
import { useAppDispatch }    from '../../store/hooks';

import BaseInput             from '../../components/Inputs/BaseInput';
import BtnBase               from '../../components/Buttons/BtnBase';

import './LoginPage.css';


type State = {
    userName: string;
    password: string;
}

export const LoginPage: React.FC<types.CommonPropsPage> = ({ idBtn=0 }) =>
{
    const [ userName, setUserName ] = useState<string>(''); 
    const [ password, setPassword ] = useState<string>('');

    const dispatch = useAppDispatch();

    useEffect( () => {    
        dispatch( redux.setClickedBtnId(idBtn) );
    }, [] );

    const inputs: { label: string, state: string }[] = [
        { 
            label: 'Имя пользователя', 
            state: 'userName'
        },
        { 
            label: 'Пароль', 
            state: 'password',
        },
    ];

    const onSubmit = () : void => {
        if ( userName.length > 0 && password.length > 0 )
            dispatch( redux.loginUser({ userName, password }) );
    }

    return (
        <div className="LoginPage">
            <h2>Пожалуйста, авторизуйтесь</h2>
            { 
                inputs && inputs.map( ({ label, state }, id) => <div className='input_LoginPage' key={ id } >
                    <BaseInput 
                        key={ id }
                        value= { state === 'userName' ? userName : password } 
                        handleChange={ state === 'userName' ? setUserName : setPassword } 
                        label={ label } 
                        password={ state === 'password' }
                    />  
                </div> )
            }
            <BtnBase onClick={ onSubmit } title='Отправить' />
        </div>
    );
}