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
    const [ newCompamyInfo, setNewCompamy ] = useState<types.TypeAddInfoCompany>({
        businessEntity: "",
        //contactId: "",
        /*contract: {
            no: "", 
            issue_date: getFullDate(""),
        },*/
        //createdAt: "",
        //id: "",
        name: "",
        //photos: [ ] as types.TypeImgs[],
        shortName: "",
        status: "",
        type: [ ],
        //updatedAt: "",
    } as types.TypeAddInfoCompany);
    const [ newContactsCompany, setNewContactsCompany ] = useState<types.TypeAddContactsCompany>({
        //createdAt: "",
        email: "",
        firstname: "",
        lastname: "",
        patronymic: "",
        phone: "",
        //updatedAt: "",
    } as types.TypeAddContactsCompany);
    //const [ newImgs, setNewImgs] = useState<types.TypeImgs[]>([] as types.TypeImgs[]);
    const [ file, setFile ] = useState<File>();

    const dispatch  = useAppDispatch();
    
    const isLoading = useAppSelector(redux.selectIsLoading);
    const { btnId } = useAppSelector(redux.selectClickedBtnId);
    const isAdded   = useAppSelector(redux.selectIsDone);

    useEffect( () => { console.log(isAdded)
        if ( !!isAdded )
        {
            goBack();
            dispatch( redux.setIsDone() );
        }
    }, [ isAdded ] );
    
    const onChangeField = async ( 
        value: string, 
        typeCard: types.TypeCards, 
        path?: string, 
        type?: string 
    ) : Promise<void> => 
    {
        if ( typeCard === 'company' )  {
            const newObject = onChangeFormCompany( value, newCompamyInfo, path, type );

            setNewCompamy( newObject as types.TypeResponseGetInfoCompany );
        } else {
            const newObject = onChangeFormCompany( value, newContactsCompany, path, type );

            setNewContactsCompany( newObject as types.TypeResponseGetContactsCompany );
        }        
    }

    const onSave = ( ) : void => 
    {
        if ( newCompamyInfo.name ) {
            dispatch( redux.addNewCompany({ 
                contacts: newContactsCompany, 
                info: newCompamyInfo 
            }) );
        }
    }

    const onRemoveImg = <T extends number>( imgId: T) : void => 
    { 
        let newPhotos = [] as any[];//[ ...newCompamyInfo.photos ];
        
        newPhotos.splice(imgId, 1);

        setNewCompamy({ 
            ...newCompamyInfo, 
            //photos: newPhotos
        });
    }

    const onAddImg = ( ) : void => 
    { 
        /*setNewCompamy({ 
            ...newCompamyInfo, 
            photos: [ ...newCompamyInfo.photos, {
                filepath: `/images/0/1.jpg`,
                name: "1.jpg",
                thumbpath: `/images/0/1.jpg`,
            } ] 
        });*/
    }

    const cards = getCardsCompanyInfo(newCompamyInfo, newContactsCompany);         

    /*const imgsCard = [{
        title: 'Приложенные фото',
        type: 'photos',
        fields: newCompamyInfo.photos,
    }];*/
   // console.log(isLoading)
    return (
        <div className='addingNewCompanyContainer'>
            <div className="addingNewCompany">
                <header className="block_AddingNewCompany">
                    <TopNav 
                        iconBack 
                        onBack={ goBack } 
                        title={ 'To the companies list'.toUpperCase() } 
                    />
                </header> 
                { !isLoading ? <> 
                    <main className="block_AddingNewCompany">
                        <div className="input_addingNewCompany">
                            <span className="titleRowCardInfo">
                                Short company name
                            </span> 
                            <BaseInput 
                                value={ newCompamyInfo.shortName } 
                                handleChange={ ( value: string ) => onChangeField( value, 'company', 'shortName' ) } 
                            />
                        </div>
                        { cards && cards.map( ({ title, fields, type }, id) => 
                            <CardInfo 
                                key={ id }
                                showEdit
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
                        {/* imgsCard && <div>
                            { imgsCard.map( (imgField, id) => 
                                <CardImg 
                                    key={ id }
                                    remove={ true } 
                                    onRemove={ ( id: number ) => onRemoveImg( id ) }
                                    title={ imgField.title }
                                    fields={ imgField.fields }
                                />
                        ) }
                        </div>*/ }
                        { /*imgsCard && <UploadBtn 
                            handleChange={ (file: File) => onAddImg() }
                            label_1={ 'Добавить изображение'.toUpperCase() } 
                            onlyFirst
                    />*/}
                    </main>
                    <div className='btn_addingNewCompany'>
                        <BtnBase title="Submit" onClick={ () => onSave() }/>    
                    </div> 
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
/*
            <ExtraSideMenu 
                clickedId={ btnId } 
                content={ contentProcessesPage } 
                onClick={ (path) => toNavigate(path) } 
            />
            */