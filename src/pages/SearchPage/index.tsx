import React, { 
    useEffect, 
    useState 
}                     from 'react';

import * as redux     from '../../store/slices';
import { 
   useAppDispatch,
   useAppSelector
}                     from '../../store/hooks';

import { toNavigate } from '../../routes/methods';

import { Paths }      from '../../constants';
 
import SearchInput    from '../../components/Inputs/SearchInput';
import Progress       from '../../components/Progress';

import * as types     from '../../types';

import './SearchPage.css';


export const SearchPage: React.FC<types.CommonPropsPage> = () =>
{    
    const [ value, setValue ] = useState<string>('');

    const dispatch  = useAppDispatch();

    useEffect( () => {   
        dispatch( redux.clearCompaniesList() );
    }, [] );

    const isLoading = useAppSelector(redux.selectIsLoading);
  
    return ( 
        <div className='SearchPage'>
            { 
                isLoading ? <Progress /> : 
                <SearchInput 
                    value={ value } 
                    handleChange={ (value: string) => setValue(value) } 
                    placeholder='Поиск организации' 
                    handleClick={ () => {
                        if ( value.length > 0 )
                        {
                            dispatch( redux.searchCompany( value.trim() ) );
                            toNavigate( Paths.foundCompanies );
                        }
                    } } 
                />
            }
        </div>
    );
} 