import React              from "react";
import {
    Routes,
    Route,
    Navigate,
}                         from "react-router-dom";

import * as redux         from '../store/slices';
import { useAppSelector } from '../store/hooks';
import { Paths }          from '../constants';

import Progress           from '../components/Progress';
import { ProtectedRoute } from './ProtectedRoute';


const Index = React.lazy( () =>
  import('../pages').then( module =>  ({
    default: module.IndexPage,
  }) )
);

const Companies = React.lazy( () =>
  import('../pages/CompaniesPage').then( module =>  ({
    default: module.CompaniesPage,
  }) )
);

const AddingCompany = React.lazy( () =>
  import('../pages/CompaniesPage/AddingNewCompany').then( module =>  ({
    default: module.AddingNewCompanyPage,
  }) )
);

const CompanyProfile = React.lazy( () =>
  import('../pages/CompaniesPage/CompanyProfilePage').then( module =>  ({
    default: module.CompanyProfilePage,
  }) )
);

const Search = React.lazy( () =>
  import('../pages/SearchPage').then( module =>  ({
    default: module.SearchPage,
  }) )
);

const FoundCompanies = React.lazy( () =>
  import('../pages/SearchPage/FoundCompanies').then( module =>  ({
    default: module.FoundCompaniesPage,
  }) )
);

const FoundCompanyProfile = React.lazy( () =>
  import('../pages/SearchPage/FoundCompanies/FoundCompanyProfilePage').then( module =>  ({
    default: module.FoundCompanyProfilePage,
  }) )
);

const Login = React.lazy( () =>
  import('../pages/LoginPage').then( module =>  ({
    default: module.LoginPage,
  }) )
);

const Exit = React.lazy( () =>
  import('../pages/ExitPage').then( module =>  ({
    default: module.ExitPage,
  }) )
);

const Settings = React.lazy( () =>
  import('../pages/SettingsPage').then( module =>  ({
    default: module.SettingsPage,
  }) )
);

export const Router: React.FC = () => 
{          
    const user      = useAppSelector(redux.selectUser);
    const role      = user.role;
    const isValided = !user.noValid;
   
    return (
        <React.Suspense fallback={ <Progress /> }>
            <Routes>                
                <Route index element={   
                    <ProtectedRoute validedUser={ isValided } idBtn={ 0 }> 
                        <Index role={ role } />
                    </ProtectedRoute> 
                } />
                <Route path={ Paths.companies } element={   
                    <ProtectedRoute validedUser={ isValided } idBtn={ 1.1 }> 
                        <Companies role={ role } />
                    </ProtectedRoute> 
                } />
                <Route path={ Paths.company } element={   
                    <ProtectedRoute validedUser={ isValided } idBtn={ 1.1 }> 
                        <CompanyProfile role={ role } />
                    </ProtectedRoute> 
                } />
                <Route path={ Paths.addingCompany } element={   
                    <ProtectedRoute validedUser={ isValided } idBtn={ 1.1 }> 
                        <AddingCompany role={ role } />
                    </ProtectedRoute> 
                } />
                <Route path={ Paths.search } element={   
                    <ProtectedRoute validedUser={ isValided } idBtn={ 2 }> 
                        <Search role={ role } />
                    </ProtectedRoute> 
                } />
                <Route path={ Paths.foundCompanies } element={   
                    <ProtectedRoute validedUser={ isValided } idBtn={ 2 }> 
                        <FoundCompanies role={ role } />
                    </ProtectedRoute> 
                } />
                <Route path={ Paths.foundCompany } element={   
                    <ProtectedRoute validedUser={ isValided } idBtn={ 2 }> 
                        <FoundCompanyProfile role={ role } />
                    </ProtectedRoute> 
                } />
                <Route path={ Paths.settings } element={   
                    <ProtectedRoute validedUser={ isValided } idBtn={ 3 }> 
                        <Settings role={ role } />
                    </ProtectedRoute> 
                } />
                <Route path={ Paths.exit } element={   
                    <ProtectedRoute validedUser={ isValided } idBtn={ 5 }> 
                        <Exit role={ role } />
                    </ProtectedRoute> 
                } />
                <Route path={ Paths.login } element={ <Login idBtn={ 0 } /> } />
                <Route path={ Paths.another } element={ <Navigate to="/" replace /> } />
            </Routes>
        </React.Suspense>
    )    
}