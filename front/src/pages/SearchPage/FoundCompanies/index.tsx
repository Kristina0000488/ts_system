import React, { useEffect } from 'react';

import * as redux           from '../../../store/slices';
import { 
   useAppDispatch,
   useAppSelector
}                           from '../../../store/hooks';

import { toNavigate }       from '../../../routes/methods';

 
import Progress             from '../../../components/Progress';
import ListCompanies        from '../../../components/ListCompanies';

import * as types           from '../../../types';

import './FoundCompaniesPage.css';


export const FoundCompaniesPage: React.FC<types.CommonPropsPage> = () =>
{    
    const companies = useAppSelector(redux.selectCompaniesList);
    const isLoading = useAppSelector(redux.selectIsLoading    );
   
    return ( <> { 
        !isLoading ? <div className='listCompanies_FoundCompaniesPage'>
            <ListCompanies 
                title={ 'List of founded companies'.toUpperCase() }
                values={ companies } 
                onClick={ (id: string) => toNavigate(`${ id }`, true) } 
            /> 
        </div> : <div className='FoundCompaniesPage'>
            <Progress />
        </div>
    } </> );
} 