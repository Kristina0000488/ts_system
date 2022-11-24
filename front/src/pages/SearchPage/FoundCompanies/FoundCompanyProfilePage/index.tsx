import React, { useEffect } from 'react';

import { useParams }        from 'react-router-dom';

import * as redux           from '../../../../store/slices';
import { 
   useAppDispatch,
   useAppSelector
}                           from '../../../../store/hooks';
 
import TopNav               from '../../../../components/Navigation/TopNav';
import Progress             from '../../../../components/Progress';
import CardInfo             from '../../../../components/Cards/CardInfo';
import CardImg              from '../../../../components/Cards/CardImg';
import Footer               from '../../../../components/Footer';
import BaseTitle            from '../../../../components/Titles/BaseTitle'

import * as types           from '../../../../types';

import { goBack }           from '../../../../routes/methods';

import './FoundCompanyProfilePage.css';


export const FoundCompanyProfilePage: React.FC<types.CommonPropsPage> = ({ role }) =>
{    
    const dispatch = useAppDispatch();
    let { id='' }  = useParams();  
    
    useEffect( () => {    
        dispatch( redux.clearCompanyAllData() );
        dispatch( redux.getContactsCompany({ id }) );
        dispatch( redux.getDataCompany({ id }) );
    }, [] );

    const companyInfo  = useAppSelector(redux.selectCompany     );
    const cardsCompany = useAppSelector(redux.selectCardsCompany);
    const imgsCompany  = useAppSelector(redux.selectImgsCompany );

    const showProgress: boolean  = companyInfo && cardsCompany && imgsCompany ? false : true;
   
    return (
        <div className='foundCompanyProfileContainer'>
            <div className="foundCompanyProfile">
                <header className="block_foundCompanyProfile">
                    <TopNav 
                        iconBack 
                        onBack={ goBack } 
                        title={ 'К СПИСКУ НАЙДЕННЫХ ЮРИДИЧЕСКИХ ЛИЦ'.toUpperCase() } 
                    />
                </header> 
                { !showProgress ? <> 
                    <main className="block_foundCompanyProfile">
                        { companyInfo.shortName && <BaseTitle value={ companyInfo.shortName } bold /> }
                        { cardsCompany && cardsCompany.map( ({ title, fields, type }, id) => 
                            <CardInfo 
                                key={ id } 
                                title={ title } 
                                fields={ fields as types.TypeElemCard[] } 
                            /> 
                        ) }
                        { imgsCompany && <div>
                            { imgsCompany.map( (imgField, id) => 
                                <CardImg 
                                    key={ id }
                                    title={ imgField.title }
                                    fields={ imgField.fields }
                                />
                            ) }
                        </div> }                        
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