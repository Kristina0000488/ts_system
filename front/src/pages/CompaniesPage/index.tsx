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
        <ExtraSideMenu 
            clickedId={ btnId } 
            content={ contentProcessesPage } 
            onClick={ toNavigate } 
        />
        { !isLoading ? <div className="companiesPage">
            <ListCompanies 
                title={ 'СПИСОК ЮРИДИЧЕСКИХ ЛИЦ'.toUpperCase() } 
                values={ companies } 
                onClick={ (param) => toNavigate(param, true) }
            />
            <div className="btnAddingCompany">
                <BtnBase 
                    icon='add' 
                    title='Добавить нового пользователя' 
                    onClick={ () => toNavigate( Paths.addingCompany) } 
                />
            </div>
        </div> : <div className='progress_companiesPage'>
            <Progress 
                size={ 25 }
                thickness={ 4 } 
            /> 
        </div> }       
    </> );
}
