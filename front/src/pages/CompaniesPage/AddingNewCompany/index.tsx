import React, 
    { useEffect, useState }   from 'react';

import { useParams }          from 'react-router-dom';

import * as redux             from '../../../store/slices';
import { 
   useAppDispatch,
   useAppSelector
}                             from '../../../store/hooks';
 
import TopNav                 from '../../../components/Navigation/TopNav';
import BaseInput              from '../../../components/Inputs/BaseInput';
import ExtraSideMenu          from '../../../components/Navigation/ExtraSideNav';
import Progress               from '../../../components/Progress';
import CardInfo               from '../../../components/Cards/CardInfo'
import CardImg                from '../../../components/Cards/CardImg';
import UploadBtn              from '../../../components/Buttons/UploadBtn';
import BtnBase                from '../../../components/Buttons/BtnBase';
import Footer                 from '../../../components/Footer';

import * as types             from '../../../types';
import { toNavigate, goBack } from '../../../routes/methods';
import { 
    iconsRightSide, 
    contentProcessesPage 
}                             from '../../../constants';

import { 
    copyObj, 
    checkEditingRole,
    prepareValue,
    onChangeFormCompany,
    getFullDate,
    getCardsCompanyInfo
}                             from '../../../utils';

import './AddingNewCompanyPage.css';


export const AddingNewCompanyPage: React.FC<types.CommonPropsPage> = ({ role }) =>
{
    const [ newCompamyInfo,     setNewCompamy         ] = useState<types.TypeResponseGetInfoCompany>({
        businessEntity: "",
        contactId: "",
        contract: {
            no: "", 
            issue_date: getFullDate(""),
        },
        createdAt: "",
        id: "",
        name: "",
        photos: [ ] as types.TypeImgs[],
        shortName: "",
        status: "",
        type: [ ],
        updatedAt: "",
    } as types.TypeResponseGetInfoCompany);
    const [ newContactsCompany, setNewContactsCompany ] = useState<types.TypeResponseGetContactsCompany>({
        createdAt: "",
        email: "",
        firstname: "",
        id: "",
        lastname: "",
        patronymic: "",
        phone: "",
        updatedAt: "",
    } as types.TypeResponseGetContactsCompany);
    //const [ newImgs, setNewImgs] = useState<types.TypeImgs[]>([] as types.TypeImgs[]);
    const [ file, setFile ] = useState<File>();

    const dispatch  = useAppDispatch();
    
    const isLoading        = useAppSelector(redux.selectIsLoading);
    const { btnId }        = useAppSelector(redux.selectClickedBtnId);
    
    const onChangeField = async ( 
        value: string, 
        typeCard: types.TypeCards, 
        path?: string, 
        type?: string 
    ) : Promise<void> => 
    {
        if ( typeCard === 'company' )  {
            const newObject = onChangeFormCompany( value, newCompamyInfo, path, type );
            console.log( newObject, 1 );
            setNewCompamy( newObject as types.TypeResponseGetInfoCompany );
        } else {
            const newObject = onChangeFormCompany( value, newContactsCompany, path, type );
            console.log( newObject, 2 );
            setNewContactsCompany( newObject as types.TypeResponseGetContactsCompany );
        }        
    }

    const onSave = ( ) : void => 
    {
        console.log( "onSave")
    }

    const onRemoveImg = <T extends number>( imgId: T) : void => 
    { 
        let newPhotos = [ ...newCompamyInfo.photos ];
        
        newPhotos.splice(imgId, 1);

        setNewCompamy({ 
            ...newCompamyInfo, 
            photos: newPhotos
        });
    }

    const onAddImg = ( ) : void => 
    { 
        setNewCompamy({ 
            ...newCompamyInfo, 
            photos: [ ...newCompamyInfo.photos, {
                filepath: `/images/0/1.jpg`,
                name: "1.jpg",
                thumbpath: `/images/0/1.jpg`,
            } ] 
        });
    }

    const cards = getCardsCompanyInfo(newCompamyInfo, newContactsCompany);
    /* [
        {
            title: 'Общая информация',
            type: 'company',
            edit: true,
            fields: [
                { label: 'Полное название', items: [ { value: newCompamyInfo.name, key: 'name' } ] },
                { label: 'Договор', items: [ 
                    { value: newCompamyInfo['contract']['no'], key: 'contract.no' },
                    { value: ' от ', extraTxt: true }, 
                    { value: newCompamyInfo['contract']['issue_date'], key: 'contract.issue_date', type: 'date' } 
                ] },
                { label: 'Форма', items: [ { value: newCompamyInfo.businessEntity, key: 'businessEntity'} ] },
                { label: 'Тип', items: [ { value: newCompamyInfo.type, key: 'type', type: 'array' } ] },
            ]
          },
          {
            title: 'Контактные данные',
            type: 'contacts',
            edit: true,
            fields: [
                { label: 'ФИО', items: [ 
                  { value: newContactsCompany.lastname, key: 'lastname'     }, 
                  { value: newContactsCompany.firstname, key: 'firstname'   },
                  { value: newContactsCompany.patronymic, key: 'patronymic' }], 
                },
                { label: 'Телефон', items: [ { value: newContactsCompany.phone, key: 'phone' } ] },
                { label: 'Эл. почта', items: [ { value: newContactsCompany.email, key: 'email' } ] },
            ]
          }, 
    ];  */

    const imgsCard = [{
        title: 'Приложенные фото',
        type: 'photos',
        fields: newCompamyInfo.photos,
    }];

    return (
        <div className='addingNewCompanyContainer'>
            <ExtraSideMenu 
                clickedId={ btnId } 
                content={ contentProcessesPage } 
                onClick={ (path) => toNavigate(path) } 
            />
            <div className="addingNewCompany">
                <header className="block_AddingNewCompany">
                    <TopNav 
                        iconBack 
                        onBack={ goBack } 
                        title={ 'К СПИСКУ ЮРИДИЧЕСКИХ ЛИЦ'.toUpperCase() } 
                    />
                </header> 
                { !isLoading ? <> 
                    <main className="block_AddingNewCompany">
                        Название компании: <BaseInput 
                            value={ newCompamyInfo.shortName } 
                            handleChange={ ( value: string ) => onChangeField( value, 'company', 'shortName' ) } 
                        />
                        { cards && cards.map( ({ title, fields, type }, id) => 
                            <CardInfo 
                                key={ id }
                                showEdit={ true }
                                iconName='edit' 
                                title={ title } 
                                fields={ fields as types.TypeElemCard[] } 
                                onChange={ (value: string, key, typeField) => onChangeField(
                                    value, 
                                    type as types.TypeCards, 
                                    key, 
                                    typeField
                                ) }
                            /> 
                        ) }
                        { imgsCard && <div>
                            { imgsCard.map( (imgField, id) => 
                                <CardImg 
                                    key={ id }
                                    remove={ true } 
                                    onRemove={ ( id: number ) => onRemoveImg( id ) }
                                    title={ imgField.title }
                                    fields={ imgField.fields }
                                />
                            ) }
                        </div> }
                        { imgsCard && <UploadBtn 
                            handleChange={ (file: File) => onAddImg() }
                            label_1={ 'Добавить изображение'.toUpperCase() } 
                            onlyFirst
                        /> }
                    </main>
                    <BtnBase title="Сохранить" onClick={ () => onSave() }/>
                    <Footer /> 
                </> : <div className='progress_AddingNewCompany'>
                    <Progress 
                        size={ 25 }
                        thickness={ 4 } 
                    /> 
                </div> }
            </div>
        </div>
    );
} 
