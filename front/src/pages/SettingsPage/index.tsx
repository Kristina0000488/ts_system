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
import FormAddUser from '../../components/Forms/FormEnterNewUser';
import Dialog from '../../components/Dialog';
import CardUser from '../../components/Cards/CardUser';
import CardStatistic from '../../components/Cards/CardStatistic';

import './SettingsPage.css';


export const SettingsPage: React.FC<types.CommonPropsPage> = () =>
{
    const [ showFormAdd, setShowFormAdd   ] = useState<boolean>( false );
    const [ showCardUser, setShowCardUser ] = useState<boolean>( false );

    const [ currentUserToCard, setCurrentUserToCard ] = useState<types.BackendUser>( {} as types.BackendUser );

    const [ userName,    setUserName ] = useState<string>( '' );
    const [ password,    setPassword ] = useState<string>( '' );
    const [ role,        setRole     ] = useState<types.RoleUser>( '' as types.RoleUser );
    const [ iconUser,    setIconUser ] = useState<types.IconsUser>( 'add' as types.IconsUser );

    const [ page,        setPage        ] = React.useState<number>(0);
    const [ rowsPerPage, setRowsPerPage ] = React.useState<number>(5);

    const dispatch = useAppDispatch();

    useEffect( () => {    
        dispatch( redux.getUsersForTable({ page, rowAmount: rowsPerPage }) );
        dispatch( redux.getAdminStatistics( ) );
    }, [] );

    const isLoading       = useAppSelector(redux.selectIsLoading);
    const usersData       = useAppSelector(redux.selectAllUsers);
    const adminStatistics = useAppSelector(redux.selectAdminStatistics);

    const allUsers   = usersData ? usersData.users : [];
    const usersCount = usersData ? usersData.count : 0;

    const onSubmitUser = ( value: types.BackendUser ) : void =>
    { 
        let newValue: types.CommonValidUser = {
            ...value,
            role: value.role.value as types.RoleUser,
            createdAt: value.createdAt.value as string, 
            updatedAt: value.updatedAt ? value.updatedAt.value : '',
        } as types.CommonValidUser;
        
        dispatch( redux.updateUser(newValue as types.CommonValidUser) );
    }

    const elemsForm: { 
        state: 'password' | 'userName' | 'role' | 'image', 
        label: string, 
        password?: boolean, 
        type?: types.TypeUIElem, 
        required?: boolean,
    } [] = [
        {
            state: 'userName', label: 'User name', required: true
        },
        {
            state: 'password', label: 'Password', password: true, required: true
        },
        {
            state: 'role', label: 'User role', type: 'choice', required: true 
        },
    ];

    const onChangePagination = async ( page: number, rowsPerPage: number ) => 
    { 
        await setPage( page );
        await setRowsPerPage( rowsPerPage );

        dispatch( redux.getUsersForTable({ page, rowAmount: rowsPerPage }) );
    }

    const setItemsForUserCard = ( objectUser: types.BackendUser ) : types.ItemsSelectCommon[] => 
    {
        let arr = [] as types.ItemsSelectCommon[];
        
        for ( const [ key, value ] of Object.entries(objectUser) ) 
        {
            if ( key === 'role') {
                arr.push( addingObjUserCard( value, 'User role' )  );
            } else if ( key === 'userName' ) {
                arr.push( addingObjUserCard( value, 'User name' ) );
            } else if ( key === 'createdAt' ) {
                arr.push( addingObjUserCard( value, 'Date of the registration' ) );
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
                    <h2>Admin dashboard</h2> 
                    { <>
                        <div className="floatBtn">
                            <button className='btnBtnBase' onClick={ () => setShowFormAdd( true ) }>Add a new user</button>
                        </div>   
                        <div className='statistics_SettingsPage'>
                            { adminStatistics && adminStatistics.map( ( { color='', title, text }, id ) => {
                                return <CardStatistic 
                                    key={ id } 
                                    title={ title } 
                                    text={ text } 
                                    color={ color as types.ColorsCardStatistics }
                                />
                            } ) }
                        </div>
                        <div className="table_SettingsPage">
                            <Table 
                                titles={[ 'ID', 'User name', 'Role', 'Date of the creating', 'Date of the updating', 'Actions' ]} 
                                items={ allUsers } 
                                edit
                                onSubmit={ ( value: types.BackendUser ) => onSubmitUser( value ) }
                                onClickRemove={ ( idUser: number ) => dispatch( redux.removeUser({ id: idUser }) ) }
                                itemsSelect={ RolesUsers as types.ItemsSelectCommon[] }
                                onClickTr={ ( user: types.BackendUser ) => {
                                    //setShowCardUser( true );
                                    //setCurrentUserToCard( user );
                                } }
                                pagination
                                page={ page }
                                rowsPerPage={ rowsPerPage }
                                usersCount={ usersCount }
                                onChangePagination={ onChangePagination }
                            />
                        </div>  
                        <Dialog 
                            open={ showFormAdd } 
                            onClose={ () => setShowFormAdd( !showFormAdd ) }
                        >
                            <FormAddUser 
                                elems={ elemsForm } 
                                titleBtn='Submit'                                 
                                values={ { password, userName, role } }
                                itemsSelect={ RolesUsers as types.ItemsSelectCommon[] }
                                //iconsChoice={ [ '' ] }
                                //choicedIcon={ iconUser }
                                onChange={ (value, state) => {
                                    if ( state === 'password') {
                                        setPassword( value );
                                    } else if ( state === 'role') {
                                        setRole( value as types.RoleUser );
                                    } else if ( state === 'image') {
                                        //setIconUser( value as types.IconsUser );
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
                                        setRole( '' as types.RoleUser);
                                        //setIconUser( 'add' as types.IconsUser );
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