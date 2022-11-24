import { 
    TypeAllRolesSideNavElems, 
    TypeFooterContent, 
    TypeExtraSideNavPage, 
    TypeIconsTopNavRightSide, 
    ItemsSelectRolesUsers,
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

export const SideNavElems = {
    user: [
        [
            {
                id: 0, 
                path: Paths.index,
                icon: 'home',    
            },
            {        
                id: 1,
                path: Paths.companies,                
                icon: 'market',
            },
            { 
                id: 2,
                path: Paths.search,                
                icon: 'search', 
            }
        ],
        [
            {        
                id: 4,
                path: Paths.chat,                
                icon: 'chat',
            },
            { 
                id: 5,
                path: Paths.exit,                
                icon: 'exit',       
            }
        ]
    ],
    admin: [
        [
            {
                id: 0, 
                path: Paths.index,
                icon: 'home',    
            },
            {        
                id: 1,
                path: Paths.companies,                
                icon: 'market',
            },
            { 
                id: 2,
                path: Paths.search,                
                icon: 'search', 
            }
        ],
        [
            {
                id: 3, 
                path: Paths.settings,
                icon: 'settings', 
            },
            {        
                id: 4,
                path: Paths.chat,                
                icon: 'chat',
            },
            { 
                id: 5,
                path: Paths.exit,                
                icon: 'exit',       
            }
        ]
    ],
    guest: [
        [
            {
                id: 0, 
                path: Paths.index,
                icon: 'home',    
            },
        ]
    ]  
} as TypeAllRolesSideNavElems;

export const Roles = {
    Admin: 'admin',
    User: 'user'    
} as { [ index : string ]: string }

export const contentFooter: TypeFooterContent = [
    { text: '© 1992 - 2020 Честный Агент © Все права защищены.' },
    { text: '8 (495) 995-00-00'                                 },
]

export const contentProcessesPage = {
    title: 'ЧЕСТНЫЙ АГЕНТ'.toUpperCase(),
    subtitle: 'МЕНЕДЖЕР ПРОЦЕССА'.toUpperCase(),
    menu: [
        {
            id: 1.1,           
            icon: 'building',
            title: 'Организации'
        },
    ]
} as TypeExtraSideNavPage;

export const iconsRightSide: TypeIconsTopNavRightSide[] = [ 
    {
        id: 0, 
        icon: 'linked',
    },
    {
        id: 1, 
        icon: 'rotation',
    },
    {
        id: 2, 
        icon: 'delete',
    }
];

export const contentIndexTitle: string = 'Добро пожаловать в систему "ЧЕСТНЫЙ АГЕНТ"';

export const RolesUsers = [ 
    { 
        value: 'admin', 
        title: 'Admin' 
    }, 
    { 
        value: 'user',
        title: 'User'
    } 
] as ItemsSelectRolesUsers[];