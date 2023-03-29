import React, { useEffect }     from 'react';

import { 
    useAppDispatch,
    useAppSelector
 }                              from '../../store/hooks';
import * as redux               from '../../store/slices';

import { contentProcessesPage, Paths } from '../../constants';
import { toNavigate }           from '../../routes/methods';
import * as types               from '../../types';

import ExtraSideMenu            from '../../components/Navigation/ExtraSideNav';
import ListCompanies            from '../../components/ListCompanies';
import Progress                 from '../../components/Progress';
import BtnBase                  from '../../components/Buttons/BtnBase';

import './CompaniesPage.css';


export const CompaniesPage: React.FC<types.CommonPropsPage> = () =>
{    
    const dispatch = useAppDispatch();

    useEffect( () => {        
        dispatch( redux.getCompaniesList() );
        //dispatch( redux.setClickedBtnId(idBtn) );
    }, [] );

    const companies = useAppSelector(redux.selectCompaniesList);  
    const isLoading = useAppSelector(redux.selectIsLoading);
    const { btnId } = useAppSelector(redux.selectClickedBtnId);
    
    return ( <>
        { !isLoading ? <div className="companiesPage">
            <ListCompanies 
                title={ 'List of companies'.toUpperCase() } 
                values={ companies } 
                onClick={ (param) => toNavigate(param, true) }
            />
            <div className="floatBtn">
                <BtnBase 
                    //icon='add' 
                    title='Add new company' 
                    onClick={ () => toNavigate( Paths.addingCompany) } 
                />
            </div>
        </div> : <Progress 
            size={ 25 }
            thickness={ 4 } 
        /> }       
    </> );
}
/*
        <ExtraSideMenu 
            clickedId={ btnId } 
            content={ contentProcessesPage } 
            onClick={ toNavigate } 
        />
        */