import React, { useState, useEffect }      from 'react';

import TablePagination from '@mui/material/TablePagination';
import * as types from '../../../types';

import './Pagination.css';


interface PaginationProps {
    count: number,
    handleChange: ( page: number, rowAmount: number ) => void,
    step: 5 | 10 | 15 | 20 | 25,
    page: number,
    rowsPerPage: number,
}


export default function Pagination(props: PaginationProps) 
{   
   // const [ page,        setPage        ] = React.useState<number>(0);
    //const [ rowsPerPage, setRowsPerPage ] = React.useState<number>(5);

    const { count=0, handleChange, step=5, page, rowsPerPage } = props;
    /*useEffect(() => {
      console.log(page);
    }, [page]);

    useEffect(() => {
      console.log(rowsPerPage);
    }, [rowsPerPage]);*/
  //console.log(page, rowsPerPage)
   /* const onChangePage = async (
      event: React.MouseEvent<HTMLButtonElement> | null,
      newPage: number,
    ) => { console.log('page', newPage)
        await setPage(newPage);
        console.log(page)
        handleChange( newPage, rowsPerPage );
    };
  
    const handleChangeRowsPerPage = async (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => { console.log(event.target.value, 'row')
        await setRowsPerPage( parseInt(event.target.value, 10) );
        handleChange( page, rowsPerPage );
    };*/

    const setRowsOptions = ( count: number, step: number ) : Array<number | { value: number; label: string }> => {
        let rowsOptions: number[] = [];

        const quotient = Math.floor( count/step );

        for ( let i = 0, x = step; i < quotient; i++, x += step )
        {
            rowsOptions.push( x );
        }

       /*if ( rowsOptions.length === 1 ) 
        { console.log(rowsOptions)
          return [ ...rowsOptions ];
        } */
        
        return [ ...rowsOptions, { value: -1, label: 'Все' } ];
    } 
  
    return (
      <TablePagination
        component="div"
        count={ count }
        page={ page }
        onPageChange={ (
          event: React.MouseEvent<HTMLButtonElement> | null,
          newPage: number
        ) => {
          //setPage(newPage);
          //console.log(newPage, page)
          handleChange( newPage, rowsPerPage );
        } }
        rowsPerPage={ rowsPerPage }
        rowsPerPageOptions={ setRowsOptions( count, step ) }
        onRowsPerPageChange={ (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
          //setRowsPerPage( parseInt(event.target.value, 10) );
         // console.log(parseInt(event.target.value, 10), rowsPerPage)
          handleChange( page, parseInt(event.target.value, 10)  );
        } }
      />
    );
}