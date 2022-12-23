import { takeLatest, call, put } from "redux-saga/effects";

import { PayloadAction }         from '@reduxjs/toolkit';

import * as reducer              from '../slices';
import { client }                from '../../services/api';
import * as types                from '../../types';
import * as mocks                from '../../services/mocks';
import { toNavigate }            from '../../routes/methods';
import { Paths }                 from '../../constants';


export function* handleGetCompaniesList() 
{
    try {
      //const response: types.CompaniesList[] = yield call( mocks.getCompaniesList );
      const response: { result: types.CompaniesList[] } & types.ResponseStatusCode = yield call( 
        client.getCompaniesList.bind( client )
      );

      if ( response.statusCode === 200 ) 
      {     
        yield put( reducer.setCompaniesList( response.result ) );
      }
    } catch (e) {
      console.log(e);
    }
}

export function* handleGetInfoCompany(action: PayloadAction<types.PayloadId<string>>) // for profile company
{
    try {
      //const response: TypeResponseGetInfoCompany = yield call( client.getInfoCompany.bind( client ), 12 );
      //const response: types.TypeResponseGetInfoCompany = yield call( mocks.getCompanyInfo, action.payload.id );
      const response: { result: types.TypeResponseGetInfoCompany } & types.ResponseStatusCode = yield call( 
        client.getInfoCompany.bind( client ),
        +action.payload.id 
      );



      if ( response.statusCode === 200 ) 
      { 
        const responseContacts: { result: types.TypeResponseGetContactsCompany } & types.ResponseStatusCode = yield call( 
          client.getContactsCompany.bind( client ),
          +response.result.contactId
        );
        
        yield put( reducer.setDataCompany( response.result ) );
        yield put( reducer.setContactsCompany( responseContacts.result ) );
      }
    } catch (e) {
      console.log(e);
    }
}

export function* handleUpdateInfoCompany(action: PayloadAction<{ id: string, data: types.TypeResponseGetInfoCompany }>)
{ 
    try {
      //yield call( client.updateInfoCompany.bind( client ), 12, action.payload );
      const response: types.TypeResponseGetInfoCompany = yield call( mocks.updateCompanyInfo, action.payload.data, action.payload.id );
      
      yield put( reducer.setDataCompany( response ) );
    } catch (e) {
      console.log(e);
    }
}

export function* handleGetContactsCompany(action: PayloadAction<types.PayloadId<string>>) 
{
    try {
      // const response: TypeResponseGetContactsCompany = yield call( client.getContactsCompany.bind( client ), 16 );
      //const response: types.TypeResponseGetContactsCompany = yield call( mocks.getCompanyContacts, action.payload.id );
      const response: { result: types.TypeResponseGetContactsCompany } & types.ResponseStatusCode = yield call( 
        client.getInfoCompany.bind( client ),
        +action.payload.id 
      );

      if ( response.statusCode === 200 ) 
      { 
        yield put( reducer.setContactsCompany( response.result ) );
      }
    } catch (e) {
      console.log(e);
    }
}

export function* handleUpdateContactsCompany(action: PayloadAction<{ id: string, data: types.TypeResponseGetContactsCompany }>)
{
    try {
      //yield call( client.updateContactsCompany.bind( client ), 16, action.payload );
      const response: types.TypeResponseGetContactsCompany = yield call( mocks.updateCompanyContacts, action.payload.data, action.payload.id );

      yield put( reducer.setContactsCompany( response ) );

    } catch (e) {
      console.log(e);
    }
}

export function* handleRemoveImgCompany(action: PayloadAction<{ imgId: number, id: string }>) //PayloadId
{
    try {
        const response: types.TypeResponseGetInfoCompany = yield call( mocks.removeCompanyImg, action.payload.imgId, action.payload.id );
     
        yield put( reducer.setDataCompany( response ) );
    } catch (e) {
      console.log(e);
    }
}

export function* handleAddImgCompany(action: PayloadAction<types.PayloadImgFile>) 
{ 
    try {
      //yield call( client.addImageCompany.bind( client ), 12, action.payload.img );      
      const response: types.TypeResponseGetInfoCompany = yield call( mocks.addCompanyImg, action.payload.id );
   
      yield put( reducer.setDataCompany( response ) );
    } catch (e) {
      console.log(e);
    }
}

export function* handleSearchCompany(action: PayloadAction<string>) 
{ 
    try {
      //yield call( client.addImageCompany.bind( client ), 12, action.payload.img );      
      const response: types.CompaniesList[] = yield call( mocks.searchCompany, action.payload );
   
      yield put( reducer.setCompaniesList( response ) );
    } catch (e) {
      console.log(e);
    }
}

export function* handleRemoveCompany(action: PayloadAction<types.PayloadId<string>>) 
{
    try {  
      const response: types.ResponseStatusCode = yield call( mocks.removeCompany, action.payload.id );
      
      if ( response.statusCode === 204 ) {
        yield put( reducer.setIsDone() );
      } else { 
        yield put( reducer.setError(response) );
      }

    } catch (e) {
      //yield put( reducer.setError(e as) );
      
      console.log(e);
    }
}

export function* handleLoginUser(action: PayloadAction<types.LoginUser>) 
{
    try {  
      //const response: types.ValidUser & types.ResponseStatusCode = yield call( mocks.authorizationUser, action.payload.userName, action.payload.password );
      const response: { result: types.ValidUserBack } & types.ResponseStatusCode = yield call( 
        client.login.bind( client ), 
        action.payload.userName, 
        action.payload.password 
      );

      if ( response.statusCode === 200 ) {
        const { id, name, role, createdat, updatedat='' } = response.result;

        yield put( reducer.setUser(
          { 
            id, 
            userName: name, 
            role, 
            createdAt: createdat, 
            updatedAt: updatedat 
          }
        ) );
        yield toNavigate(Paths.index);
      } else { 
        yield put( reducer.setError(response) );
        yield toNavigate(Paths.login);
      }

    } catch (e) {
      //yield put( reducer.setError(e) );
      
      console.log(e);
    }
}

export function* handleCheckUser() 
{
    try {  
      const response: { result: types.ValidUserBack } & types.ResponseStatusCode = yield call( 
        client.checkUser.bind( client )
      );

      if ( response.statusCode === 200 ) {
        const { id, name, role, createdat, updatedat='' } = response.result;
        
        yield put( reducer.setUser(
          { 
            id, 
            userName: name, 
            role, 
            createdAt: createdat, 
            updatedAt: updatedat 
          }
        ) );
        yield toNavigate(Paths.index);
      } else { 
        yield put( reducer.setError(response) );
        yield toNavigate(Paths.login);
      }

    } catch (e) {
      //yield put( reducer.setError(e) );
      
      console.log(e);
    }
}

export function* handleGetAllUsers() 
{
    try {  
      const response: types.Users = yield call( mocks.getAllUsers );
      
      yield put( reducer.setAllUsers( response ) );

    } catch (e) {
      //yield put( reducer.setError(e) );
      
      console.log(e);
    }
}

export function* handleGetUsersForTable(action: PayloadAction<types.PayloadUsersForTable>) 
{
    try {  
      //const response: types.Users      = yield call( mocks.getUsersForTable, action.payload.page, action.payload.rowAmount );
      //const responseUsersCount: number = yield call( mocks.getUsersCount );

      const response: types.ResponseAllUsersTable = yield call( 
        client.getAllUsersForTable.bind( client ), 
        action.payload.page, 
        action.payload.rowAmount 
      );
      
      yield put( reducer.setAllUsers( response.result ) );
      yield put( reducer.setUsersCount( response.amountUsers ) );

    } catch (e) {
      //yield put( reducer.setError(e) );
      
      console.log(e);
    }
}

export function* handleUpdateUser(action: PayloadAction<types.BackendUser>) 
{ console.log(action.payload)
    try {  
      //const response: types.ResponseStatusCode = yield call( mocks.updateAllUsers, action.payload );
      const response: types.ResponseStatusCode = yield call( 
        client.updateUser.bind( client ), 
        action.payload 
      );
      
      if ( response.statusCode === 200 ) {
        yield put( reducer.setIsDone() );

        const response: types.ResponseAllUsersTable = yield call( 
          client.getAllUsersForTable.bind( client ), 
          0, 
          5
        );
        
        yield put( reducer.setAllUsers( response.result ) );
      } else { 
        yield put( reducer.setError(response) );
      }

    } catch (e) {
      //yield put( reducer.setError(e) );
      
      console.log(e);
    }
}

export function* handleRemoveUser(action: PayloadAction<types.PayloadId<number>>) 
{
    try {  
      //const response: types.ResponseStatusCode = yield call( mocks.removeUser, action.payload.id );

      const response: types.ResponseStatusCode = yield call( 
        client.removeUser.bind( client ), 
        action.payload.id, 
      );
      
      if ( response.statusCode === 200 ) {
        const response: types.ResponseAllUsersTable = yield call( 
          client.getAllUsersForTable.bind( client ), 
          0, 
          5
        );
        
        yield put( reducer.setAllUsers( response.result ) );
      } else { 
        yield put( reducer.setError(response) );
      }

    } catch (e) {
      //yield put( reducer.setError(e) );
      
      console.log(e);
    }
}

export function* handleAddUser(action: PayloadAction<types.PayloadAddUser<string>>) 
{
    try {  
      //const response: types.ResponseStatusCode = yield call( mocks.addUser, action.payload );

      const response: types.ResponseStatusCode = yield call( 
        client.addUser.bind( client ), 
        action.payload.userName,
        action.payload.password,
        action.payload.role,
      );

      if ( response.statusCode === 200 ) {
        const response: types.ResponseAllUsersTable = yield call( 
          client.getAllUsersForTable.bind( client ), 
          0, 
          5
        );
        
        yield put( reducer.setAllUsers( response.result ) );
      } else { 
        yield put( reducer.setError(response) );
      }
      
    } catch (e) {            
      //yield put( reducer.setError(e) );

      console.log(e);
    }
}

export default function* watcherSaga() 
{
    yield takeLatest(reducer.getCompaniesList.type,      handleGetCompaniesList     );
    yield takeLatest(reducer.getDataCompany.type,        handleGetInfoCompany       );
    yield takeLatest(reducer.updateDataCompany.type,     handleUpdateInfoCompany    );
    yield takeLatest(reducer.getContactsCompany.type,    handleGetContactsCompany   );
    yield takeLatest(reducer.updateContactsCompany.type, handleUpdateContactsCompany);
    yield takeLatest(reducer.removeImg.type,             handleRemoveImgCompany     );
    yield takeLatest(reducer.addImg.type,                handleAddImgCompany        );
    yield takeLatest(reducer.searchCompany.type,         handleSearchCompany        );
    yield takeLatest(reducer.removeCompany.type,         handleRemoveCompany        );
    yield takeLatest(reducer.loginUser.type,             handleLoginUser            );
    yield takeLatest(reducer.checkUser.type,             handleCheckUser            );
    yield takeLatest(reducer.getAllUsers.type,           handleGetAllUsers          );
    yield takeLatest(reducer.getUsersForTable.type,      handleGetUsersForTable     );
    yield takeLatest(reducer.updateUser.type,            handleUpdateUser           );
    yield takeLatest(reducer.removeUser.type,            handleRemoveUser           );
    yield takeLatest(reducer.addUser.type,               handleAddUser              );
}
