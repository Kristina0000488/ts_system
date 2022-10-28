import React, 
    { useEffect, useState }  from 'react';

import * as types  from '../../types';

import * as redux  from '../../store/slices';
import { 
   useAppDispatch,
   useAppSelector
}                  from '../../store/hooks';

import { RolesUsers }  from '../../constants';

import Progress    from '../../components/Progress';
import Table       from '../../components/Table';
import Pagination       from '../../components/Table/Pagination';
import FormAddUser from '../../components/Forms/FormEnterNewUser';
import Dialog from '../../components/Dialog';
import CardUser from '../../components/Cards/CardUser';

import './SettingsPage.css';


export const SettingsPage: React.FC<types.CommonPropsPage> = () =>
{
    const [ showFormAdd, setShowFormAdd   ] = useState<boolean>( false );
    const [ showCardUser, setShowCardUser ] = useState<boolean>( false );

    const [ currentUserToCard, setCurrentUserToCard ] = useState<types.BackendUser>( {} as types.BackendUser );

    const [ userName,    setUserName ] = useState<string>( '' );
    const [ password,    setPassword ] = useState<string>( '' );
    const [ role,        setRole     ] = useState<string>( '' );
    const [ iconUser,    setIconUser ] = useState<types.IconsUser>( 'add' as types.IconsUser );

    const [ page,        setPage        ] = React.useState<number>(0);
    const [ rowsPerPage, setRowsPerPage ] = React.useState<number>(5);

    const dispatch = useAppDispatch();

    useEffect( () => {    
        dispatch( redux.getUsersForTable({ page, rowAmount: rowsPerPage }) );
    }, [] );

    const isLoading  = useAppSelector(redux.selectIsLoading);
    const usersData  = useAppSelector(redux.selectAllUsers);

    const allUsers   = usersData ? usersData.users : [];
    const usersCount = usersData ? usersData.count : 0;

    const onSubmitTable = ( values: types.AllUsersForTable ) : void =>
    { 
        let newValues: types.Users = [ ...values ].map( (newValue: types.BackendUser) => {
            return {
                ...newValue,
                role: newValue.role.value as types.RoleUser,
                createdAt: newValue.createdAt.value as string, 
                updatedAt: newValue.updatedAt ? newValue.updatedAt.value : '',
            } as types.CommonValidUser
        } );
        
        dispatch( redux.updateAllUsers(newValues as types.Users) );
    }

    const elemsForm: { 
        state: 'password' | 'userName' | 'role' | 'image', 
        label: string, 
        password?: boolean, 
        type?: types.TypeUIElem, 
        required?: boolean,
    } [] = [
        {
            state: 'userName', label: 'Имя пользователя', required: true
        },
        {
            state: 'password', label: 'Пароль', password: true, required: true
        },
        {
            state: 'role', label: 'Роль пользователя *', type: 'choice', required: true 
        },
    ];

    const onChangePagination = async ( page: number, rowsPerPage: number ) => 
    { 
        await setPage( page );
        await setRowsPerPage( rowsPerPage );

        dispatch( redux.getUsersForTable({ page, rowAmount: rowsPerPage }) );
    }

    const setItemsForUserCard = ( objectUser: types.BackendUser ) : types.ItemsSelectRolesUsers[] => 
    {
        let arr = [] as types.ItemsSelectRolesUsers[];
        
        for ( const [ key, value ] of Object.entries(objectUser) ) 
        {
            if ( key === 'role') {
                arr.push( addingObjUserCard( value, 'Роль пользователя' )  );
            } else if ( key === 'userName' ) {
                arr.push( addingObjUserCard( value, 'Имя пользователя' ) );
            } else if ( key === 'createdAt' ) {
                arr.push( addingObjUserCard( value, 'Дата регистрации' ) );
            }
        }

        return arr;
    }

    const addingObjUserCard = ( value: { value: string, type: string } | string, title: string ) => 
    {
        if ( value instanceof Object )  
        {
            return { value: value.value, title };
        }

        return { value, title };
    } 
    
    return (
        <div className="SettingsPage">
            { 
                isLoading ? <Progress /> : <>
                    <h2>Панель администратора</h2> 
                    { <>
                        <>
                            <div>
                                <button onClick={ () => setShowFormAdd( true ) }>Добавить нового пользователя</button>
                            </div>   
                            <Table 
                                titles={[ 'ID', 'Имя пользователя', 'Роль', 'Дата создания', 'Дата изменения', 'Действия' ]} 
                                items={ allUsers } 
                                edit
                                onSubmit={ ( values: types.AllUsersForTable ) => onSubmitTable( values ) }
                                onClickRemove={ ( idUser: number ) => dispatch( redux.removeUser({ id: idUser }) ) }
                                itemsSelect={ RolesUsers as types.ItemsSelectRolesUsers[] }
                                onClickTr={ ( user: types.BackendUser ) => {
                                    setShowCardUser( true );
                                    setCurrentUserToCard( user );
                                } }
                            />
                            <Pagination 
                                count={ usersCount } 
                                step={ 5 }
                                page={ page }
                                rowsPerPage={ rowsPerPage }
                                handleChange={ (page, rowsPerPage) => onChangePagination( page, rowsPerPage )  } 
                            />
                        </>  
                        <Dialog 
                            open={ showFormAdd } 
                            onClose={ () => setShowFormAdd( !showFormAdd ) }
                        >
                            <FormAddUser 
                                elems={ elemsForm } 
                                titleBtn='Отправить'                                 
                                values={ { password, userName, role } }
                                itemsSelect={ RolesUsers as types.ItemsSelectRolesUsers[] }
                                iconsChoice={ [ '' ] }
                                choicedIcon={ iconUser }
                                onChange={ (value, state) => {
                                    if ( state === 'password') {
                                        setPassword( value );
                                    } else if ( state === 'role') {
                                        setRole( value );
                                    } else if ( state === 'image') {
                                        setIconUser( value as types.IconsUser );
                                    }  else {
                                        setUserName( value );
                                    }
                                } }
                                onSubmit={ () => {
                                    if ( password && userName && role )
                                    {
                                        dispatch( redux.addUser({ password, userName, role, iconUser }));
                                        
                                        setShowFormAdd( false );
                                        setPassword( '' );
                                        setUserName( '' );
                                        setRole( '' );
                                        setIconUser( 'add' as types.IconsUser );
                                    }
                                } }
                            />  
                        </Dialog>
                        <Dialog 
                            open={ showCardUser } 
                            onClose={ () => {
                                setShowCardUser( !showCardUser );
                                setCurrentUserToCard( {} as types.BackendUser );
                            } }
                        >
                            { currentUserToCard && <CardUser 
                                items={ setItemsForUserCard(currentUserToCard) }
                                onChangeAvatar={ () => console.log('avatar') } 
                            /> }
                        </Dialog>
                    </> }
                </> 
            }
        </div>
    );
}