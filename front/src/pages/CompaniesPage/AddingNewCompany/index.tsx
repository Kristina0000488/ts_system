import React, 
    { useEffect, useState }   from 'react';

import { useParams }          from 'react-router-dom';
import { FormControl } from '@mui/material';
import Box from '@mui/material/Box';


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
    contentProcessesPage,
    FormCompany     
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
        shortName: "",
        status: "",
        type: [ ],
        capital: [
           /* {
                label: '',
                value: 0
            }*/
        ]
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

    const dispatch  = useAppDispatch();
    
    const isLoading = useAppSelector(redux.selectIsLoading);
    //const { btnId } = useAppSelector(redux.selectClickedBtnId);
    const isAdded   = useAppSelector(redux.selectIsDone);

    useEffect( () => { //console.log(isAdded)
        if ( !!isAdded )
        {
            goBack();
            dispatch( redux.setIsDone() );
        }
    }, [ isAdded ] );
    
    const onChangeField = async ( 
        value: string | types.TypeElemCard[] | types.ElemForm[], 
        typeCard: types.TypeCards, 
        path?: string, 
        type?: types.TypeUIElem 
    ) : Promise<void> => 
    { console.log( value );
        if ( typeCard === 'company' )  {
            const newObject = onChangeFormCompany( value as string, newCompamyInfo, path, type );

            setNewCompamy( newObject as types.TypeResponseGetInfoCompany );
            
            if (  type === 'multiple_input' ) {
                const newObject = onChangeFormCompany( value as types.ElemForm[], newCompamyInfo, path, type );
               
                setNewCompamy( newObject as types.TypeResponseGetInfoCompany );
            }
        } else {
            const newObject = onChangeFormCompany( value as types.TypeElemCard[], newContactsCompany, path, type );

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

    const cards = getCardsCompanyInfo(newCompamyInfo, newContactsCompany);         

  //  console.log('  ----create')

   // console.log(cards, newCompamyInfo, '  ----see')
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
                { !isLoading ? <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1 },
                    }}
                    autoComplete="off"
                >
                    <main className="block_AddingNewCompany">
                        <div className="input_addingNewCompany">
                            <span className="titleRowCardInfo">
                                Short company name
                            </span> 
                            <BaseInput 
                                value={ newCompamyInfo.shortName } 
                                required
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
                                onChange={ (value: string | types.TypeElemCard[] | types.ElemForm[], key, typeField: types.TypeUIElem = '' ) => onChangeField(
                                    value, 
                                    type as types.TypeCards, 
                                    key, 
                                    typeField as types.TypeUIElem 
                                ) }
                               // itemsSelect={ RolesUsers as types.ItemsSelectCommon[] }
                            /> 
                        ) }
                    </main>
                    <div className='btn_addingNewCompany'>
                        <BtnBase title="Submit" onClick={ () => onSave() }/>    
                    </div> 
                </Box> : <div className='progress_AddingNewCompany'>
                    <Progress 
                        size={ 25 }
                        thickness={ 4 } 
                    /> 
                </div> }
            </div>
        </div>
    );
} 