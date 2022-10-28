import React, { useEffect }  from 'react';

import { contentIndexTitle } from '../constants';
import * as types            from '../types';

import * as redux            from '../store/slices';
import { useAppDispatch }    from '../store/hooks';

import { Navigate }          from "react-router-dom";


interface ProtectedRouteProps {
    children: React.ReactElement,
    validedUser: boolean, 
    role?: string
    redirectPath?: string,
    idBtn: number,
}


export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ validedUser, children, idBtn, redirectPath='login' }) => 
{
    const dispatch = useAppDispatch();

    useEffect( () => {    
        dispatch( redux.setClickedBtnId(idBtn) );
    }, [ idBtn ] );

    if ( !validedUser ) 
    {
      return <Navigate to={ redirectPath } replace />;
    }    

    return children;
};
