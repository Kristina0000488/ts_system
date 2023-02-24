import React, { useEffect }  from 'react';

import { contentIndexTitle } from '../constants';
import * as types            from '../types';

import * as redux            from '../store/slices';
import { useAppSelector }    from '../store/hooks';

import Footer                from '../components/Footer';
import CardUser              from '../components/Cards/CardUser';


import './IndexPage.css';


export const IndexPage: React.FC<types.CommonPropsPage> = ({ role }) =>
{
    const username = useAppSelector(redux.selectUserAllData).userName;
    const user     = useAppSelector(redux.selectUserAllData);

    const prepareUser = (user: types.ValidUser) => {
        if ( user ) {
            const copyUser: any = { ...user };

            copyUser.name = copyUser.userName;

            delete copyUser.id;     
            delete copyUser.createdAt; 
            delete copyUser.updatedAt; 
            delete copyUser.userName;

            return copyUser;
        }
    }

    return (
        <div className="indexPage">
            <div className="container_indexPage" >
                <h2>{ contentIndexTitle }, { username }</h2>
            </div>  
            <div className="user_indexPage">
                <CardUser user={ prepareUser( user ) } />
            </div>            
            <Footer />
        </div>
    );
}