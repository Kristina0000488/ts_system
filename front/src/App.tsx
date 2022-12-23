import React            from 'react';

import * as redux       from './store/slices';
import {
   useAppSelector,
   useAppDispatch
}                       from './store/hooks';
import { Router }       from './routes';
import { toNavigate }   from './routes/methods';

import { SideNavElems } from './constants';

import SideNav          from './components/Navigation/SideNav';
import ErrorsList       from './components/ErrorsList';

import './styles/App.css';


export const App: React.FC = () =>
{
    const { masterBtnId } = useAppSelector(redux.selectClickedBtnId);
    const userRole        = useAppSelector(redux.selectUser).role;
    const errors          = useAppSelector(redux.selectErrors);
    
    const dispatch        = useAppDispatch();

    React.useEffect( () => {
        dispatch( redux.checkUser() );
    }, [] );
    
    return (
        <div className="app">
            <SideNav 
                clickedId={ masterBtnId } 
                elems={ SideNavElems[ userRole ] } 
                onClick={ (path) => toNavigate(path) } 
            />
            <Router />
            <ErrorsList 
                errors={ errors as any } 
                onClose={ ( id: number ) => dispatch( redux.removeError(id) ) }
            />
        </div>
    );
}

export default App;
