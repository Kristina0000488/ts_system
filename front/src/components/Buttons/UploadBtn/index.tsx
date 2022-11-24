import React, { useState }    from 'react';

import { styled }             from '@mui/system';
import ButtonUnstyled, 
    { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';

import Progress               from '../../Progress';
import Icon                   from '../../Icon';

import './UploadBtn.css';


const colors = {
    background: '#FFFFFF ',
    basicText: '#82B284',
    hoverText: '#98C88C',
    clickedText: '#58A742', 
    border: '#E5E5E5'
};

const Input = styled('input')({
    display: 'none',
});

const CustomButton = styled(ButtonUnstyled)`
  font-family: Proxima Nova, sans-serif;
  font-weight: 600;
  font-size: 14px;
  background-color: ${ colors['background'] }; 
  border-radius: 2px;
  color: ${ colors['basicText'] };
  transition: all 150ms ease;
  cursor: pointer;
  width: 400px;
  border: 1px solid ${ colors['border'] };
  padding: 12px 0;
  display: flex;
  flex-direction: row;
  justify-content: center;

  &:hover {
    color: ${ colors['hoverText'] };
  }

  &.${buttonUnstyledClasses.active} {
    color: ${ colors['clickedText'] };
  }

  &.${buttonUnstyledClasses.focusVisible} {
    box-shadow: 0 4px 20px 0 rgba(61, 71, 82, 0.1), 0 0 0 5px rgba(0, 127, 255, 0.5);
    outline: none;
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`; 

interface UploadBtnProps {
    handleChange: (files: File) => void;   
    handleUpload?: () => void;   
    label_1: string;
    label_2?: string;
    loading?: boolean;
    onlyFirst?: boolean;
}


export default function UploadBtn(props: UploadBtnProps) 
{
    const [ isLoaded, setisLoaded ] = useState<Boolean>(false);

    const hiddenFileInput = React.useRef(null);

    const { 
        handleChange, 
        handleUpload, 
        label_1='', 
        label_2='', 
        loading=false,
        onlyFirst=false
    } = props;

    const onChange = (event: React.ChangeEvent<HTMLInputElement> ): void => {
        if (event.target.files)
        {
            const fileUploaded = event.target.files[0];
            handleChange(fileUploaded);
        }
    };

    const renderBtn = () : React.ReactElement =>
    {
        if ( ( !isLoaded && !loading ) || onlyFirst ) {
            return ( <>
                <Input 
                    accept="image/*" 
                    id="contained-button-file"
                    type="file" 
                    ref={ hiddenFileInput }
                    onChange={ (e: React.ChangeEvent<HTMLInputElement>) => {
                        onChange( e );
                        setisLoaded(true);
                    } } 
                />
                <CustomButton component="span" >
                    <Icon 
                        iconName='add' 
                        noPadding 
                        size={ '16px' } 
                    />
                    { label_1 }
                </CustomButton> 
            </> )
        } else if ( !isLoaded && loading ) {
            return ( 
                <CustomButton component="span" >
                    <Progress 
                        size={ 25 }
                        thickness={ 4 } 
                    />
                </CustomButton> 
            )
        } else {
            return ( 
                <CustomButton 
                    component="span" 
                    onClick={ () => {
                        handleUpload && handleUpload();
                        setisLoaded(false);
                    } } 
                >                    
                    { label_2 }
                </CustomButton>
            )
        }
    }

    return (
        <div className="uploadBtn">
            <label htmlFor="contained-button-file">
                { renderBtn() }
            </label>
        </div>
    );
}
