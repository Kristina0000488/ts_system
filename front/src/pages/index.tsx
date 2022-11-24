import React, { useEffect }  from 'react';

import { contentIndexTitle } from '../constants';
import * as types            from '../types';

import * as redux            from '../store/slices';
import { useAppDispatch }    from '../store/hooks';

import Footer                from '../components/Footer';

import './IndexPage.css';


export const IndexPage: React.FC<types.CommonPropsPage> = ({ role }) =>
{
    return (
        <div className="indexPage">
            <div className="container_indexPage">
                <h2>{ contentIndexTitle }</h2>
            </div>  
            <Footer />
        </div>
    );
}