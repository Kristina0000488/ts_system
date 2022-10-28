import React, { memo } from 'react';

import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

import './Dialog.css';


interface DialogProps 
{
    open: boolean;
    title?: string;
    onClose: () => void;  
    children: React.ReactNode;
}


function dialog(props: DialogProps) 
{
    const { open, title='', onClose, children } = props;
    
    return (
        <Dialog onClose={ onClose } open={open}>
            { title && <DialogTitle>{ title }</DialogTitle>}
            <DialogContent>{ children }</DialogContent>
        </Dialog>
    );
}

export default memo(dialog);