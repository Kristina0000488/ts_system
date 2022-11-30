import history from './history';


export function toNavigate( param: number | string, modeProps: boolean = false ) : void 
{  
    let location: string = getLocation();

    let pathname: string = `${ param }`;

    if ( modeProps )
    {
        pathname = `${ location }/${ param }`;
    }
    
    history.push( {   
        pathname
    } );
}

export function goBack() : void 
{
    history.back();
}

export function getLocation() : string 
{    
    return history.location.pathname;
}
