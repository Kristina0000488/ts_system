import React, 
    { useEffect, useState }   from 'react';

import { useParams }          from 'react-router-dom';

import * as redux             from '../../../store/slices';
import { 
   useAppDispatch,
   useAppSelector
}                             from '../../../store/hooks';
 
import TopNav                 from '../../../components/Navigation/TopNav';
import EditTitle              from '../../../components/Titles/EditTitle';
import BaseTitle              from '../../../components/Titles/BaseTitle';
import ExtraSideMenu          from '../../../components/Navigation/ExtraSideNav';
import Progress               from '../../../components/Progress';
import CardInfo               from '../../../components/Cards/CardInfo'
import CardImg                from '../../../components/Cards/CardImg';
import UploadBtn              from '../../../components/Buttons/UploadBtn';
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
    prepareValue
}                             from '../../../utils';

import './CompanyProfilePage.css';


export const CompanyProfilePage: React.FC<types.CommonPropsPage> = ({ role }) =>
{
    const [ file, setFile ] = useState<File>();
    
    const dispatch  = useAppDispatch();
    const { id='' } = useParams();  

    useEffect( () => {   
        dispatch( redux.clearCompanyAllData() );
        dispatch( redux.getDataCompany({ id }) );        
        //dispatch( redux.getContactsCompany({ id }) );
    }, [] );

    const companyInfo      = useAppSelector(redux.selectCompany);
    const contactsCompany  = useAppSelector(redux.selectContactsCompany);
    const cardsCompany     = useAppSelector(redux.selectCardsCompany);
    const imgsCompany      = useAppSelector(redux.selectImgsCompany);
    const isLoading        = useAppSelector(redux.selectIsLoading);
    const { btnId }        = useAppSelector(redux.selectClickedBtnId);
    const isRemovedCompany = useAppSelector(redux.selectIsDone);

    let showProgress: boolean    = companyInfo && cardsCompany /*&& imgsCompany*/ ? false : true;

    const isEditingRole: boolean = role ? checkEditingRole(role) : false;
    
    useEffect( () => { 
        if ( !!isRemovedCompany )
        {
            goBack();
            dispatch( redux.setIsDone() );
        }
    }, [ isRemovedCompany ] );
    
    const onChangeField = async ( 
        value: string, 
        typeCard: types.TypeCards, 
        path?: string, 
        type?: string 
    ) : Promise<void> => 
    {  
        let contacts = copyObj( contactsCompany as types.TypeResponseGetContactsCompany );
        let info     = copyObj( companyInfo     as types.TypeResponseGetInfoCompany     );
        
        let item = prepareValue( type || '', value );

        if ( path )
        {
            const [ master, child ] = path.split( "." );
            
            let updated = typeCard === 'company' ? info : contacts;
            
            if ( master in updated )
            {
                if ( child )
                {
                    const subObject = updated[ master as keyof typeof updated ];

                    if ( subObject instanceof Object )
                    {
                        updated = { ...updated, [ master ]: { ...(subObject as Object), [child]: item } as typeof subObject };
                    } else {
                        console.warn( `object not support property ${master} with field ${child}` );
                    }
                } else {
                    updated = { ...updated, [ path ]: item };
                }

                if ( typeCard === 'company' ) {
                    await dispatch( redux.setDataCompany( updated as types.TypeResponseGetInfoCompany ) );        
                } else {
                    await dispatch( redux.setContactsCompany( updated as types.TypeResponseGetContactsCompany ) );    
                }
            } else {
                console.warn( `object not support property ${master}` );
            }   
        } 
    }

    const onSave = async (typeCard: types.TypeCards) : Promise<void> => 
    {
        if ( typeCard === 'company' && companyInfo ) {            
            await dispatch( redux.updateDataCompany({ id, data: companyInfo }) );  
        } else if ( typeCard === 'contacts' && contactsCompany) {
            await dispatch( redux.updateContactsCompany({ id, data: contactsCompany }) );  
        }
    }

    const onChangeTitle = async <K extends keyof types.TypeResponseGetInfoCompany>( value: types.TypeResponseGetInfoCompany[K], key: K ) : Promise<void> => 
    {
        let info = copyObj(companyInfo as types.TypeResponseGetInfoCompany );

        if (info) 
            info[key] = value;
            
        dispatch( redux.updateDataCompany({ id, data: info }) );
    }

    const onRemoveImg = async <T extends number>( imgId: T) : Promise<void> => 
    { 
        dispatch( redux.removeImg( { imgId, id } ) );
    }

    const onAddImg = async ( ) : Promise<void> => 
    { 
        if (file)
            dispatch( redux.addImg( { img: JSON.stringify(file), id } ) );
    }

    const collectionOnClickIconsRight: types.CollectionOnClickIconsRight = {
        0: () => console.log('linked'), 
        1: () => {
            dispatch( redux.clearCompanyAllData()        );
            dispatch( redux.getContactsCompany( { id } ) );
            dispatch( redux.getDataCompany( { id } )     );
        },
        2: () => dispatch( redux.removeCompany( { id } ) ),
    };
    console.log(showProgress, cardsCompany)
    return (
        <div className='companyProfileContainer'>
            <ExtraSideMenu 
                clickedId={ btnId } 
                content={ contentProcessesPage } 
                onClick={ (path) => toNavigate(path) } 
            />
            <div className="companyProfile">
                <header className="block_companyProfile">
                    <TopNav 
                        iconBack 
                        onBack={ goBack } 
                        title={ 'К СПИСКУ ЮРИДИЧЕСКИХ ЛИЦ'.toUpperCase() } 
                        iconsRightSide={ isEditingRole ? iconsRightSide : undefined } 
                        collectionOnClickIconsRight={ isEditingRole ? collectionOnClickIconsRight : undefined }
                    />
                </header> 
                { !showProgress ? <> 
                    <main className="block_companyProfile">
                        { companyInfo.shortName && (isEditingRole ? <EditTitle 
                            bold 
                            item={ companyInfo.shortName } 
                            onSave={ (value) => onChangeTitle(value, 'shortName') }
                            labelField='Название компании'
                        /> : <BaseTitle value={ companyInfo.shortName } />) }
                        { cardsCompany && cardsCompany.map( ({ title, fields, type }, id) => 
                            <CardInfo 
                                key={ id }
                                edit={ isEditingRole } 
                                iconName='edit' 
                                title={ title } 
                                fields={ fields as types.TypeElemCard[] } 
                                onChange={ (value: string, key, typeField) => onChangeField(
                                    value, 
                                    type as types.TypeCards, 
                                    key, 
                                    typeField
                                ) }
                                onSave={ () => onSave(type as types.TypeCards) }
                            /> 
                        ) }
                        { imgsCompany && <div>
                            { imgsCompany.map( (imgField, id) => 
                                <CardImg 
                                    key={ id }
                                    remove={ isEditingRole } 
                                    onRemove={ ( id: number ) => onRemoveImg( id ) }
                                    title={ imgField.title }
                                    fields={ imgField.fields }
                                />
                            ) }
                        </div> }
                        { imgsCompany && isEditingRole && <UploadBtn 
                            handleChange={ (file: File) => setFile(file) }
                            handleUpload={ () => onAddImg() }
                            label_1={ 'Добавить изображение'.toUpperCase() } 
                            label_2={ 'отправить'.toUpperCase() } 
                            loading={ isLoading }
                        /> }
                    </main>
                    <Footer /> 
                </> : <div className='progress_companyProfile'>
                    <Progress 
                        size={ 25 }
                        thickness={ 4 } 
                    /> 
                </div> }
            </div>
        </div>
    );
} 