import axios, { AxiosInstance, AxiosRequestHeaders } from "axios";
import * as types from "../types";

import { useAppDispatch } from '../store/hooks';
 import * as redux        from '../store/slices';


let api = axios.create( { } );

api.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
api.defaults.headers.common['Accept']     = 'application/json';
api.defaults.baseURL                      = '/';


class WrapedApi
{
    constructor( 
        public readonly api: AxiosInstance, 
        private token?: string 
    ) { }

    private async request<T, D extends Object>(
        method: string, 
        postfix: string, 
        data?: D, 
        //secured?: boolean, 
        allowStatuses: number[ ] = [ 200 ], 
        postfile?: boolean
    ) : Promise<T>
    {         
       // const dispatch = useAppDispatch();

        try {
            let headers = {
                "Content-type": "application/json",
                "Access-Control-Allow-Origin": "*",
            } as AxiosRequestHeaders;

            let options = { 
                method,
                url: `/${ postfix }`,
                body: data,
                headers,
                data,
            };

            if (postfile)
            {
                headers = {
                    "Content-type": "multipart/form-data",
                    "Access-Control-Allow-Origin": "*",
                } as AxiosRequestHeaders; 
            }            

            /*if ( secured )
            {
                headers['Authorization'] = await this.getAuth( );
            }*/
                
            let response = await this.api(options);

            if ( !(response.status in allowStatuses) ) {
                return response.data;
            } else {
               // dispatch( redux.setError( { message: 'Error response', statusCode: response.status } as ResponseStatusCode ));

                throw new Error( `Bad response ${response.status}`);
            }
        } catch ( error: unknown ) {
            console.error( error );
           // dispatch( redux.setError( { message: 'Error' } as ResponseStatusCode ));

            throw error;
        }
    }

    private async get<T>(url: string, secured: boolean = false, allowStatuses: number[ ] = [ 200 ]): Promise<T> 
    {
        return await this.request( 'get', url, undefined, allowStatuses );
    }

    private async put<T, D extends Object>( url: string, data: D, secured: boolean = false ) : Promise<T> 
    { 
        return await this.request( 'put', url, data )  
    }
    
    private async post<T, D extends Object>( url: string, data: D, secured: boolean = false, postfile: boolean = false) : Promise<T> 
    {
        return await this.request( 'post', url, data, undefined, postfile )  
    }

    private async delete<T, D extends Object>( url: string,  /*secured: boolean = false*/ ) : Promise<T> 
    {
        return await this.request( 'delete', url, undefined )  
    }
   
    /*async getAuth( update: boolean = true ) : Promise<string>  
    {
        try {
            if ( update || !this.token ) 
            {
                let response = await this.api.get( 'auth?user=USERNAME' );

                if ( response.status === 200 ) {
                    this.token = response.headers['authorization'];
                } else {
                    throw new Error( `Bad response ${response.status}`)
                }
            }
                
            return this.token;
        } catch ( error: unknown ) {
            console.error( error );

            throw error;
        } 
    }*/

    async login(name: string, password: string) : Promise<any>//!
    {
        const data = { name, password };

        return await this.post( `login`, data, false, true );    
    }

    async checkUser() : Promise<any>//!
    {
        return await this.get( `verifycookie`, true, [ 200, 304 ] );    
    }

    async addUser(name: string, password: string, role: types.RoleUser) : Promise<any>//!
    {
        const data = { name, password, role };

        return await this.post( `admin-panel/users/new`, data, false, true );    
    }

    async updateUser(user: types.BackendUser ) : Promise<any>//!
    {
        const data = { ...user };

        return await this.put( `admin-panel/users/edit/${ data.id }`, data );    
    }

    async removeUser(id: number) : Promise<any>//!
    {
        return await this.delete( `admin-panel/users/delete/${ id }` );    
    }

    async getAllUsersForTable(page: number, rowAmount: number) : Promise<any> ///!
    {
        const data = { page, rowAmount };

        return await this.post( `admin-panel/allUsersTable`, data, false, true );    
    }

    async getCompaniesList() : Promise<any>
    {
        return await this.get( `companiesList`, true, [ 200, 304 ] );    
    }
        
    async getInfoCompany(id: number) : Promise<types.TypeResponseGetInfoCompany>
    {
        return await this.get( `companies/${ id }`, true, [ 200, 304 ] );    
    }

    async updateInfoCompany(id: number, data: object) : Promise<object>
    {
        return await this.put( `companies/${ id }`, data, true );    
    }

    async getContactsCompany(id: number) : Promise<types.TypeResponseGetContactsCompany>
    {
        return await this.get( `contacts/${ id }`, true, [ 200, 304 ] );    
    }

    async updateContactsCompany(id: number, data: object) : Promise<object>
    {
        return await this.put( `contacts/${ id }`, data, true );    
    }

    async deleteImageCompany(id: number, imageName: string) : Promise<object>
    {
        return await this.delete( `companies/${ id }/image/${ imageName }` );    
    }

    async addImageCompany(id: number, img: File) : Promise<object>
    { //console.log(img)
        const formData = new FormData();
        await formData.append(
            "image",
            img
        );

        return await this.post( `companies/${ id }/image`, formData, true, true );    
    } //`file=@${image}`
}


const client = new WrapedApi( api );

export { client };