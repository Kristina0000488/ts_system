import { 
  createSlice, 
  PayloadAction 
}                      from '@reduxjs/toolkit';

import * as types      from '../../types';
import { getFullDate, getCardsCompanyInfo } from '../../utils';

import { RootState }   from '..';


interface SliceState 
{ 
  isLoading    : boolean,
  isDone       : boolean,
  company      : types.TypeResponseGetInfoCompany,
  contacts     : types.TypeResponseGetContactsCompany,
  companiesList: types.CompaniesList[],
  clickedBtnId : number,
  error        : types.TypeErrorState[],
  user         : types.ValidUser,
  allUsers     : types.ValidUser[],
  usersCount   : number,
};


const initialState: SliceState = 
{
  isLoading: false,
  company: { } as types.TypeResponseGetInfoCompany,
  contacts: { } as types.TypeResponseGetContactsCompany,
  companiesList: [] as types.CompaniesList[],
  clickedBtnId: -1,
  error: [] as types.TypeErrorState[],
  isDone: false,
  user: { } as types.CommonValidUser,
  allUsers: [ ] as types.ValidUser[],
  usersCount: 0 as number,
}


export const indexSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    getCompaniesList(state: SliceState) 
    {  
     state.isLoading = !state.isLoading;       
    },
    setCompaniesList(state: SliceState, action: PayloadAction<types.CompaniesList[]>) 
    {  
      state.companiesList = action.payload;
      state.isLoading     = false;
    },
    updateDataCompany(state: SliceState, action: PayloadAction<{ id: string, data: types.TypeResponseGetInfoCompany }>) 
    {  
      state.isLoading = false;
    },
    getContactsCompany(state: SliceState, action: PayloadAction<types.PayloadId<string>>) 
    {  
      state.isLoading = !state.isLoading;  
    },
    setContactsCompany(state: SliceState, action: PayloadAction<types.TypeResponseGetContactsCompany>) 
    {  
      state.contacts  = action.payload;
      state.isLoading = false;
    },
    updateContactsCompany(state: SliceState, action: PayloadAction<{ id: string, data: types.TypeResponseGetContactsCompany }>) 
    {  
      state.isLoading = !state.isLoading;
    },
    getDataCompany(state: SliceState, action: PayloadAction<types.PayloadId<string>>) 
    {       
      state.isLoading = !state.isLoading;
    },
    setDataCompany(state: SliceState, action: PayloadAction<types.TypeResponseGetInfoCompany>) 
    {
      state.company   = action.payload;
      state.isLoading = false;
    },
    removeImg(state: SliceState, action: PayloadAction<types.PayloadRemoveImg>) 
    {     
      state.isLoading = false;
    },
    addImg(state: SliceState, action: PayloadAction<types.PayloadImgFile>) 
    {
      state.isLoading = !state.isLoading;
    },
    setClickedBtnId(state: SliceState, action: PayloadAction<number>) 
    {
      state.clickedBtnId = action.payload;
    },
    searchCompany(state: SliceState, action: PayloadAction<string>) 
    {  
      state.isLoading = !state.isLoading;
    },
    clearCompaniesList(state: SliceState) 
    {  
      state.companiesList = [];
    },
    clearCompanyAllData(state: SliceState) 
    {  
      state.company  = { } as types.TypeResponseGetInfoCompany;
      state.contacts = { } as types.TypeResponseGetContactsCompany;
    },
    removeCompany(state: SliceState, action: PayloadAction<types.PayloadId<string>>) 
    {  
      state.isLoading = !state.isLoading;
      state.isDone    = false;
    },
    setError(state: SliceState, action: PayloadAction<types.ResponseStatusCode>) 
    {  
      state.isLoading = false;

      const arr = [ ...state.error ] as types.TypeErrorState[];

      arr.push( { ...action.payload, id: state.error.length } as types.TypeErrorState );

      state.error = arr;
    },
    removeError(state: SliceState, action: PayloadAction<number>) 
    {  
      state.isLoading = false;

      const arr = [ ...state.error ] as types.TypeErrorState[];

      arr.filter( item => item.id !== action.payload );

      state.error = arr;
    },
    setIsDone(state: SliceState) 
    {  
      state.isDone = !state.isDone;
    },
    loginUser(state: SliceState, action: PayloadAction<types.LoginUser>) 
    {  
      state.isLoading = !state.isLoading;
    },
    setUser(state: SliceState, action: PayloadAction<types.ValidUser>) 
    {  
      state.isLoading = false;
      state.user      = action.payload;
    },
    exit(state: SliceState) 
    {  
      state.isLoading = false;
      state.user      = { } as types.CommonValidUser;
    },
    getAllUsers(state: SliceState) 
    {  
     state.isLoading = !state.isLoading;       
    },
    getUsersForTable(state: SliceState, action: PayloadAction<types.PayloadUsersForTable>) 
    {  
     state.isLoading = !state.isLoading;       
    },
    setAllUsers(state: SliceState, action: PayloadAction<types.ValidUser[]>) 
    {  
      state.isLoading = false;
      state.allUsers  = action.payload;      
    },
    setUsersCount(state: SliceState, action: PayloadAction<number>) 
    {  
      state.isLoading  = false;
      state.usersCount = action.payload;      
    },
    updateAllUsers(state: SliceState, action: PayloadAction<types.Users>) 
    {  
      state.isLoading = !state.isLoading;
    },
    removeUser(state: SliceState, action: PayloadAction<types.PayloadId<number>>) 
    {  
      state.isLoading = !state.isLoading;
    },
    addUser(state: SliceState, action: PayloadAction<types.PayloadAddUser<string>>) 
    {  
      state.isLoading = !state.isLoading;
    },
  },
})

export const { 
  getCompaniesList,
  setCompaniesList,
  getDataCompany, 
  setDataCompany, 
  updateDataCompany, 
  getContactsCompany, 
  setContactsCompany, 
  updateContactsCompany,
  removeImg,
  addImg,
  setClickedBtnId,
  searchCompany,
  clearCompaniesList,
  clearCompanyAllData,
  removeCompany,
  setError,
  removeError,
  setIsDone,
  loginUser,
  setUser, 
  exit,
  getAllUsers,
  getUsersForTable,
  setAllUsers,
  setUsersCount,
  updateAllUsers,
  removeUser,
  addUser,
} = indexSlice.actions;


export const selectErrors = (state: RootState) : types.TypeErrorState[] => {
  return state.index.error;
};
export const selectUser = (state: RootState) : { role: types.RoleUser, user: string, noValid: boolean, id: number} | { role: types.RoleUser, noValid: boolean } => {
  if ( state.index.user && state.index.user.userName )
  { 
    return {
      ...state.index.user,
      noValid: false
    }
  }
  
  return {
    role: 'guest',
    noValid: true,
  };
};
export const selectClickedBtnId = (state: RootState) : { masterBtnId: number, childBtnId: number, btnId: number } => 
{
  const strBtnId = state.index.clickedBtnId.toString();
    
  const [ masterBtnId, childBtnId ] = strBtnId.split('.');
  
  return { 
    masterBtnId: +masterBtnId, 
    childBtnId : +childBtnId,
    btnId      : state.index.clickedBtnId,
  };
};
export const selectAllUsers = (state: RootState) => {
  if ( state.index.allUsers.length > 0 )
  { 
    const newValues: types.AllUsersForTable = [ ...state.index.allUsers ].map( ( user: types.ValidUser ) => {
      const { role, createdAt, updatedAt='', ...simple } = user;

      return { 
        ...simple, 
        role: {
          value: role,
          type: 'choice'
        },
        createdAt: {
          value: getFullDate( createdAt ),
          type: 'date'
        }, 
        updatedAt: {
          value: getFullDate( updatedAt || '' ), 
          type: 'date'
        },
      } as types.BackendUser;
    } );

    return { users: newValues, count: state.index.usersCount };
  }

  return null;
}
export const selectIsDone          = (state: RootState) => state.index.isDone;
export const selectCompaniesList   = (state: RootState) => state.index.companiesList;
export const selectIsLoading       = (state: RootState) => state.index.isLoading;
export const selectCompany         = (state: RootState) => state.index.company;
export const selectContactsCompany = (state: RootState) => state.index.contacts;
export const selectCardsCompany    = (state: RootState) => state.index.contacts && 
  state.index.company && state.index.company.id ? 
  getCardsCompanyInfo({ ...state.index.company }, { ...state.index.contacts }) : null;
/* [
  {
    title: 'Общая информация',
    type: 'company',
    edit: true,
    fields: [
        { label: 'Полное название', items: [ { value: state.index.company['name'], key: 'name' } ] },
        { label: 'Договор', items: [ 
            { value: state.index.company['contract']['no'], key: 'contract.no' },
            { value: ' от ', extraTxt: true }, 
            { value: getFullDate(state.index.company['contract']['issue_date']), key: 'contract.issue_date', type: 'date' } 
        ] },
        { label: 'Форма', items: [ { value: state.index.company['businessEntity'], key: 'businessEntity'} ] },
        { label: 'Тип', items: [ { value: state.index.company['type'].join( ' ' ), key: 'type', type: 'array' } ] },
    ]
  },
  {
    title: 'Контактные данные',
    type: 'contacts',
    edit: true,
    fields: [
        { label: 'ФИО', items: [ 
          { value: state.index.contacts['lastname'], key: 'lastname'     }, 
          { value: state.index.contacts['firstname'], key: 'firstname'   },
          { value: state.index.contacts['patronymic'], key: 'patronymic' }], 
        },
        { label: 'Телефон', items: [ { value: state.index.contacts['phone'], key: 'phone' } ] },
        { label: 'Эл. почта', items: [ { value: state.index.contacts['email'], key: 'email', color: 'green' } ] },
    ]
  }, 
]*/

export const selectImgsCompany = (state: RootState) => state.index.company && state.index.company.photos ? [{  
  title: 'Приложенные фото',
  type: 'photos',
  fields: [ ...state.index.company.photos ], 
}] : null;

export default indexSlice.reducer;
