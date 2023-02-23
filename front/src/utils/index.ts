import { roles, FormCompany, TypeCompany } from '../constants';
import * as types             from '../types';

export function setStyleForMenu(widthMain: string, widthFooter: string = '0') : void 
{
    const extraMenu   = document.getElementById("mySidenav");
    const mainContent = document.getElementById("main");         
    const footer      = document.getElementById("extraBlockFooter");

    if (extraMenu && mainContent && footer) 
    {
        extraMenu.style.width         = widthMain;  
        mainContent.style.marginRight = widthMain;
        footer.style.width            = widthFooter;
    }
}

export function getFullDate(date: string) : string 
{
    const currentDate = new Date( date );

    if ( !isNaN( currentDate.getTime() ) )
    {
        const day   = getCorrectDate(currentDate.getDate());
        const month = getCorrectDate(currentDate.getMonth()+1);

        return `${ currentDate.getFullYear() }-${ month }-${ day }`;
    }

    return '';
}

export function getCorrectDate(date: number) : string | number
{
    if ( date < 10 ) {
        return `0${ date }`;
    }

    return date;
}

export function getRandomInt(max: number, min: number = 0) : number
{
    return Math.floor( Math.random() * max ) + min;
}

export function copyObj <T extends Object>( obj: T ) : T 
{
    return JSON.parse( JSON.stringify(obj) );
}

export function checkEditingRole( role: string ) : boolean 
{
    if ( role.toLocaleLowerCase() === roles.Admin ) {
        return true;
    };

    return false;
}

export function prepareValue( type: types.TypeUIElem, value: string | types.ElemForm[] | types.TypeElemCard[] ) : string | Date | string[] | types.ElemForm[] | types.TypeElemCard[]/*| undefined | types.TypeElemCard[]*/
{
    if ( typeof value === 'string') {
        if ( type === 'array' ) {
            return value.split(' ');
        } else if ( type === 'date' ) { 
            return new Date(value).toString();
        }
    } else if ( type === 'multiple_input' ) {
        const newValue = [ ...value ].filter( (val: any ) => val.label.length > 0 && val.value.length > 0  );

        return newValue as types.ElemForm[];
    } 
    
    return value;
}

export function onChangeFormCompany( 
    value: string | types.ElemForm [] | types.TypeElemCard[], 
    updated: object,
    path?: string, 
    type?: types.TypeUIElem
) : object | void
{ 
    let item = prepareValue( type || '', value );

    if ( path )
    {
        const [ master, child ] = path.split( "." );
                
        if ( master )
        {
            if ( child ) {
                const subObject: object = updated[ master as keyof typeof updated ];

                if ( subObject instanceof Object )
                {
                    updated = { ...updated, [ master ]: { ...(subObject as Object), [ child ]: item } as typeof subObject };
                } else {
                    console.warn( `object not support property ${master} with field ${child}` );
                }
            } else {
                updated = { ...updated, [ path ]: item };
            }

            return updated;
        } else {
            console.warn( `object not support property ${master}` );
        }   
    } 
}

export function getCardsCompanyInfo( companyData: types.TypeResponseGetInfoCompany | types.TypeAddInfoCompany, contacts: types.TypeResponseGetContactsCompany | types.TypeAddContactsCompany) 
{ //console.log( companyData , ' ----companyData');
    //if ( companyData && contacts )
    return [
        {
            title: 'General information',
            type: 'company',
            edit: true,
            fields: [
                { label: 'Full name company:', items: [ { value: companyData.name, key: 'name', required: true } ] },
                companyData['contract'] && { label: 'Contract:', items: [ 
                    { value: companyData['contract']['no'], key: 'contract.no' },
                    { value: ' from ', extraTxt: true }, 
                    { value: companyData['contract']['issue_date'], key: 'contract.issue_date', type: 'date' } 
                ] } || { },
                { label: 'Form:', items: [ { value: companyData.businessEntity, key: 'businessEntity', type: 'choice', itemsSelect: FormCompany } ] },
                { label: 'Type:', items: [ { value: companyData.type, key: 'type', type: 'choice', itemsSelect: TypeCompany } ] },
                { label: 'Capital:', items: [ { value: companyData.capital || [], key: 'capital', type: 'multiple_input', required: true } ] },
            ]
        },
        {
            title: 'Contacts',
            type: 'contacts',
            edit: true,
            fields: [
                { label: 'Full name of the founder:', items: [ 
                  { value: contacts.lastname, key: 'lastname', placeholder: 'Last name' }, 
                  { value: contacts.firstname, key: 'firstname', placeholder: 'First name' },
                  { value: contacts.patronymic, key: 'patronymic', placeholder: 'Patronymic' } ], 
                },
                { label: 'Phone number:', items: [ { value: contacts.phone, key: 'phone' } ] },
                { label: 'Email:', items: [ { value: contacts.email, key: 'email' } ] },
            ]
        }
    ]
}

export function getChartDataCompany( values: types.ElemForm[] ) : types.ChartData
{
    if ( values ) {
        let labels: string[] = [];
        let data: number[]   = [];

        values.map( ( value: types.ElemForm ) => {
            labels.push(value.label);
            data.push(+value.value);
        });
        
        return {
            labels,
            datasets: [
                {
                    label: '',
                    data,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)', //! add colors
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                    ],
                    borderWidth: 1,
                },
            ],
        };
    }

    return { } as types.ChartData;
}
