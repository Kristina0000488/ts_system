import { PayloadAction, Action } from '@reduxjs/toolkit';


export type TypeIcons = 
    'home'     | 
    'market'   | 
    'search'   | 
    'settings' | 
    'chat'     | 
    'exit'     | 
    'building' | 
    'edit'     | 
    'arrow'    | 
    'delete'   | 
    'add'      |
    'remove'   | 
    'linked'   | 
    'addUser'  | 
    'editColor' |
    'rotation';

export type TypeExtraSideNavPage = {
    title   : string,
    subtitle: string,
    menu    : TypeElemSideNav[]
};

export type TypeElemSideNav = {
    id    : number, 
    path  : string,
    icon  : TypeIcons,   
    title?: string,
};

export interface TypeIconsTopNavRightSide extends Object
{
    id: number, 
    onClick?: () => void, 
    icon: TypeIcons,
};

export type TypeSideNavElems = TypeElemSideNav[] [ ];

export type TypeAllRolesSideNavElems = { [ index: string ]: TypeSideNavElems };

export interface TypeResponseGetInfoCompany extends Object
{
    id : string,
    contactId: string,
    name: string,
    shortName: string,
    businessEntity: string,
    contract: {
        no: string,
        issue_date: string,
    },    
    photos: TypeImgs[],
    type: string[],
    status: string,
    createdAt: string,
    updatedAt: string
};

export interface TypeResponseGetContactsCompany extends Object 
{
    id: string,
    lastname: string,
    firstname: string,
    patronymic: string,
    phone: string,
    email: string,
    createdAt: string,
    updatedAt: string,
};

export interface TypeImgs extends Object
{    
    name: string,
    filepath: string,
    thumbpath: string     
};

export type TypeFooterContent = { text: string } [];

export interface PayloadId<T> {
    id: T,
}

export interface PayloadRemoveImg extends PayloadId<string> {
    imgId: number,
}

export interface PayloadImgFile extends PayloadId<string> {
    img: string,
}

export interface PayloadAddUser <T> {
    password: T;
    userName: T;
    role: T;
    iconUser?: IconsUser;
}

export interface PayloadUsersForTable {
    page: number,
    rowAmount: number
}

export interface TypeElemCard {
    label: string, 
    items: { 
        value: string, 
        key?: string, 
        extraTxt?: boolean, 
        color?: string, 
        type?: string,
    } [],
};

export interface TypeCard {
    title: string, 
    type: TypeCards, 
    edit?: boolean,
    fields: TypeElemCard[]
} [];

type CommonTypeCard = Pick<TypeCard, "title" | "type">;

export type TypeCards = 'company' | 'contacts' | 'photos';

export interface ImgFieldCard { 
    filepath: string, 
    name: string, 
    thumbpath: string
}

export interface ImgsCard extends CommonTypeCard {
    fields: ImgFieldCard[],
};

export interface CompaniesList extends PayloadId<string> { 
    name: string, 
};

export interface CommonPropsPage {
    idBtn?: number,
    role?: RoleUser
}

export interface CollectionOnClickIconsRight { 
    [ index: number ]: () => void 
};

export interface ResponseStatusCode {
    statusCode: 204 | 400,
    message: string,
}

export interface TypeErrorState extends ResponseStatusCode {
    id: number;
}

export interface CheckUser {
    userName: string,
    password: string,
}

export interface ResponseCheckUser extends CheckUser, ResponseStatusCode { };

export type RoleUser   = 'user' | 'admin' | 'guest' | 'moderator';
export type TypeUIElem = 'choice' | 'date' | 'choiceImages';

export interface ExtendedUser<Role, TimeStamp, Icon> extends CheckUser
{
    id: number,
    role: Role, 
    createdAt: TimeStamp, 
    updatedAt?: TimeStamp,
    iconUser?: Icon,
}

export type CommonValidUser = ExtendedUser<RoleUser, string, TypeIcons>;

export type Users = CommonValidUser[];

export interface UsersTable { 
    users: CommonValidUser[];
    count?: number;
};

export type IconsUser = 'womenUser' | ' menUser' | '';

export type BackendUser = ExtendedUser<{ type: TypeUIElem, value: RoleUser }, { type: TypeUIElem, value: string }, IconsUser>;
export type AllUsersForTable = BackendUser[];

export interface ItemsSelectRolesUsers {
    value: string;
    title: string;
};