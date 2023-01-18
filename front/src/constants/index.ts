import { 
    TypeAllRolesSideNavElems, 
    TypeFooterContent, 
    TypeExtraSideNavPage, 
    TypeIconsTopNavRightSide, 
    ItemsSelectCommon,
    TypeComonElementSideNav
} from '../types';


export const Paths = {
    index: '/',
    companies: '/processes/companies',
    company: '/processes/companies/:id',
    addingCompany: '/processes/addingCompany',
    search: '/search',
    foundCompanies: '/search/companies',
    foundCompany: '/search/companies/:id',
    settings: '/settings',
    chat: '/chat',
    exit: '/exit',
    login: '/login',
    another: '*'
} 

const home: TypeComonElementSideNav = {
    path: Paths.index,
    icon: 'home',    
    title: 'main'
}

const companies: TypeComonElementSideNav = {
    path: Paths.companies,                
    icon: 'market',
    title: 'Compamies'
}

const search: TypeComonElementSideNav = {
    path: Paths.search,                
    icon: 'search', 
    title: 'Search'
}

const signOut: TypeComonElementSideNav = {
    path: Paths.exit,                
    icon: 'exit',       
    title: 'Sign out'
}

const adminDashboard: TypeComonElementSideNav = {
    path: Paths.settings,
    icon: 'settings', 
    title: 'Admin dashboard'
}

export const sideNavElems: TypeAllRolesSideNavElems = {
    user: [
        [
            {
                id: 0, 
                ...home
            },
            {        
                id: 1,
                ...companies
            },
            { 
                id: 2,
                ...search
            }
        ],
        [
         /*   {        
                id: 4,
                path: Paths.chat,                
                icon: 'chat',
            },*/
            { 
                id: 3,
                ...signOut
            }
        ]
    ],
    admin: [
        [
            {
                id: 0, 
                ...home 
            },
            {        
                id: 1,
                ...companies
            },
            { 
                id: 2,
                ...search
            }
        ],
        [
            {
                id: 3, 
                ...adminDashboard
            },
            /*{        
                id: 4,
                path: Paths.chat,                
                icon: 'chat',
            },*/
            { 
                id: 4,
                ...signOut  
            }
        ]
    ],
    guest: [
        [
            {
                id: 0, 
                ...home
            },
        ]
    ]  
};

export const roles = {
    Admin: 'admin',
    User: 'user'    
} as { [ index : string ]: string }

export const contentFooter: TypeFooterContent = [
    { text: '2023 Company System' },
    //{ text: '8 (495) 995-00-00'      },
]

export const contentProcessesPage = {
    title: 'Company System'.toUpperCase(),
    //subtitle: 'МЕНЕДЖЕР ПРОЦЕССА'.toUpperCase(),
    menu: [
        {
            id: 1.1,           
            icon: 'building',
            title: 'Companies'
        },
    ]
} as TypeExtraSideNavPage;

export const iconsRightSide: TypeIconsTopNavRightSide[] = [ 
    {
        id: 0, 
        icon: 'rotation',
    },
    {
        id: 1, 
        icon: 'delete',
    }
];

export const contentIndexTitle: string = 'Welcome';

export const RolesUsers = [ 
    { 
        value: 'admin', 
        title: 'Admin' 
    }, 
    { 
        value: 'user',
        title: 'User'
    } 
] as ItemsSelectCommon[];

export const FormCompany = [ 
    { 
        value: 'private', 
        title: 'Private' 
    }, 
    { 
        value: 'public',
        title: 'Public'
    } 
] as ItemsSelectCommon[];

export const TypeCompany = [ 
    { 
        value: 'agent', 
        title: 'Agent' 
    }, 
    { 
        value: 'contractor',
        title: 'Contractor'
    } 
] as ItemsSelectCommon[];