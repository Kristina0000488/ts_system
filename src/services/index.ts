import * as types       from '../types';
import { getRandomInt, copyObj } from '../utils';


export let companyInfo: { [ index : string ] : types.TypeResponseGetInfoCompany } = {
    '12': {
        businessEntity: "ООО",
        contactId: "16",
        contract: {
            no: "12345", 
            issue_date: "2015-03-12T00:00:00Z"
        },
        createdAt: "2020-11-21T08:03:00Z",
        id: "12",
        name: "ООО Фирма «Перспективные захоронения»",
        photos: [
            {
                filepath: "/images/12/1.png",
                name: "1.png",
                thumbpath: "/images/12/1.png",
            },
            {
                filepath: "/images/12/2.png",
                name: "2.png",
                thumbpath: "/images/12/2.png",
            },
            {
                filepath: "/images/12/3.png",
                name: "3.png",
                thumbpath: "/images/12/3.png",
            },
        ],
        shortName: "Перспективные захоронения",
        status: "active",
        type: [
            "agent", 
            "contractor"
        ],
        updatedAt: "2020-11-23T09:30:00Z",
    },
    '11': {
        businessEntity: "ООО",
        contactId: "15",
        contract: {
            no: "1234566", 
            issue_date: "2012-05-17T00:00:00Z"
        },
        createdAt: "2021-10-15T08:03:00Z",
        id: "11",
        name: "ООО «Gym power»",
        photos: [
            {
                filepath: "/images/11/1.jpg",
                name: "1.jpg",
                thumbpath: "/images/11/1.jpg",
            },
            {
                filepath: "/images/11/2.jpg",
                name: "2.jpg",
                thumbpath: "/images/11/2.jpg",
            },
            {
                filepath: "/images/11/3.jpg",
                name: "3.jpg",
                thumbpath: "/images/11/3.jpg",
            },
        ],
        shortName: "GP",
        status: "active",
        type: [
            "agent", 
        ],
        updatedAt: "2021-11-23T09:30:00Z",
    },
};

export let companiesList: types.CompaniesList[] =  [
    { 
        name: "Перспективные захоронения", 
        id: '12' 
    },
    { 
        name: "GP", 
        id: '11' 
    } 
];

export let companyContacts: { [ index : string ] : types.TypeResponseGetContactsCompany } =  {
    '16': {
        createdAt: "2020-11-21T08:03:26.589Z",
        email: "grigoriev@funeral.com",
        firstname: "Сергей",
        id: "16",
        lastname: "Григорьев",
        patronymic: "Петрович",
        phone: "79162165588",
        updatedAt: "2020-11-23T09:30:00Z",
    },
    '15': {
        createdAt: "2021-11-21T08:03:26.589Z",
        email: "grigoriev@gp.com",
        firstname: "Анна",
        id: "15",
        lastname: "Несмешко",
        patronymic: "Федоровна",
        phone: "79162165510",
        updatedAt: "2021-11-23T09:30:00Z",
    },
};

export let validUsers: types.CommonValidUser[] =  [
    {
        userName: 'user',
        password: 'user',
        id: 1, 
        role: 'user' as types.RoleUser,
        createdAt: "2020-11-27T08:03:00Z",
    },
    {
        userName: 'admin',
        password: 'admin',
        id: 2, 
        role: 'admin' as types.RoleUser,
        createdAt: "2020-11-21T08:03:00Z",
    },
    {
        userName: 'user2',
        password: '1234',
        id: 3, 
        role: 'user' as types.RoleUser,
        createdAt: "2020-11-25T08:03:00Z",
    },
    {
        userName: 'usertest',
        password: '1234',
        id: 4, 
        role: 'user' as types.RoleUser,
        createdAt: "2018-11-25T08:03:00Z",
    },
    {
        userName: 'usertest2',
        password: '1234',
        id: 5, 
        role: 'user' as types.RoleUser,
        createdAt: "2019-11-25T08:03:00Z",
    },
    {
        userName: 'usertest3',
        password: '1234',
        id: 6, 
        role: 'user' as types.RoleUser,
        createdAt: "2018-08-25T08:03:00Z",
    },
];

export function getCompanyInfo( id: string = '12' ) : Promise<types.TypeResponseGetInfoCompany>
{ 
    return getPromise(companyInfo[id]); 
}

export async function updateCompanyInfo <T extends types.TypeResponseGetInfoCompany>( data: T, id: string = '12' ) : Promise<types.TypeResponseGetInfoCompany>
{
    companyInfo[id] = data;
    
    return getPromise(companyInfo[id]); 
}

export function getCompaniesList( ) : Promise<Array<types.CompaniesList>>
{
    return getPromise(companiesList);
}

export function getCompanyContacts(id: string = '16') : Promise<types.TypeResponseGetContactsCompany>
{ 
    return getPromise( companyContacts[ companyInfo[id].contactId ] );
}

export function updateCompanyContacts <T extends types.TypeResponseGetContactsCompany>( data: T, id: string = '16' ) : Promise<types.TypeResponseGetContactsCompany>
{
    companyContacts[ companyInfo[id].contactId ] = data;

    return getPromise(companyContacts[ companyInfo[id].contactId ]); 
}

export function removeCompanyImg( idImg: number, id: string = '12' ) : Promise<types.TypeResponseGetInfoCompany>
{ 
    const newObject: types.TypeResponseGetInfoCompany = { ...companyInfo[id] };

    newObject.photos = [ ...newObject.photos ].filter( (_, idx) => idx !== idImg );
    
    companyInfo[id] = newObject;

    return getPromise(companyInfo[id]); 
}

export function addCompanyImg(id: string = '12', img?: string ) : Promise<types.TypeResponseGetInfoCompany>
{
    let newObject: types.TypeResponseGetInfoCompany = { ...companyInfo[id] };

    let newPhotos = [ ...newObject.photos ];

    if ( newPhotos.length === 0 ) {
        newPhotos.push(
            {
                filepath: `/images/${ id }/1.png`,
                name: "1.png",
                thumbpath: `/images/${ id }/1.png`,
            },
        );
    } else {
        newPhotos.push(
            newPhotos[ getRandomInt(newPhotos.length) ]
        );
    }

    newObject.photos = newPhotos;
    companyInfo[id]  = newObject;
    
    return getPromise(companyInfo[id], 3000); 
}

export function searchCompany( name: string ) : Promise<types.CompaniesList[]>
{
    const companies = companiesList.filter( company => {
        if ( company.name.toLowerCase().includes( name.toLowerCase() ) )
        {
            return company;
        } 
    });
   
    return getPromise(companies, 3000);    
}

export function removeCompany( idCompany: string ) : Promise<types.ResponseStatusCode>
{ 
    let isRemoved = false;

    companiesList = companiesList.filter( company => {
        if ( !company.id.includes( idCompany ) ) {
            return company;
        } else {
            isRemoved = true;
        }
    });

    if ( isRemoved ) {
        return getPromise({ statusCode: 204, message: 'Компания успешно удалена' } as types.ResponseStatusCode);  
    }
   
    return getPromise( { statusCode: 400, message: 'A company isn\'t found' } as types.ResponseStatusCode, 1000, true );    
}

export function authorizationUser( name: string, password: string ) : Promise<types.ResponseStatusCode & types.CommonValidUser | types.ResponseStatusCode>
{ 
    const user = validUsers.find( user => user.userName.toLowerCase() === name.toLowerCase() );

    if ( user && user.userName === name && user.password === password )
    {
        return getPromise( { 
            statusCode: 204, 
            message: 'User is valid', 
            ...user,
        } as types.ResponseStatusCode & types.CommonValidUser );  
    }
   
    return getPromise( { 
        statusCode: 400, 
        message: 'User isn\'t valid' 
    } as types.ResponseStatusCode, 1000, true );    
}

export function getAllUsers() : Promise<types.Users>
{ 
    const values = Object.values(validUsers);

    return getPromise( [ ...values ] as types.Users );  
}

export function updateAllUsers( users: types.Users ) : Promise<types.ResponseStatusCode>
{ 
    if ( users )
    {     
        validUsers = users;

        return getPromise({ statusCode: 204, message: 'Пользователи успешно обновлены' } as types.ResponseStatusCode);
    }

    return getPromise( { 
        statusCode: 400, 
        message: 'User isn\'t valid' 
    } as types.ResponseStatusCode, 1000, true ); 
}

export function removeUser( idUser: number ) : Promise<types.ResponseStatusCode>
{ 
    let isRemoved = false;

    validUsers = validUsers.filter( user => {
        if ( user.id !== idUser )  {
            return user;
        } else {
            isRemoved = true;
        }
    });
    
    if ( isRemoved ) {
        return getPromise({ statusCode: 204, message: 'Пользователь успешно удален' } as types.ResponseStatusCode);  
    }
   
    return getPromise( { statusCode: 400, message: 'An user isn\'t found' } as types.ResponseStatusCode, 1000, true );    
}

export function addUser( newUser: types.PayloadAddUser<string> ) : Promise<types.ResponseStatusCode>
{ 
    const updatedNewUser = { 
        ...newUser,
        createdAt: new Date().toDateString(),
        updatedAt: '',
        id: validUsers.length + 1,
        role: 'user' as types.RoleUser,
    };
    
    validUsers.push( updatedNewUser as types.CommonValidUser );
    
    return getPromise({ statusCode: 204, message: 'Пользователь успешно добавлен' } as types.ResponseStatusCode);   
}


function getPromise <T extends Object>( object: T, time: number = 1000, isError: boolean = false ) : Promise<T>
{
    return new Promise( (resolve, reject) => {
        setTimeout( () => {
            if ( isError )
                reject( object );

            resolve( object );            
        }, time );
    } );
}