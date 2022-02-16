import { IconButton, Typography } from '@mui/material';
import classNames from 'classnames'
import { useGlobalStyles } from '../../styles';
import MenuIcon from '@mui/icons-material/Menu';
import { useCallback, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';

const Header = () => {
    const globalStyles = useGlobalStyles();

    const [ open, setOpen ] = useState(false);

    const toggleOpen = useCallback(() => setOpen(o => !o), [])

    return (
        <header className={classNames(globalStyles.px, `py-4 flex justify-between items-center`)}>
            <Typography 
                className={classNames('font-bold')}
                component="h1"
                variant="h5"
            >
                Dashboard
            </Typography>
            <div>
                <IconButton onClick={toggleOpen}>
                    { open ? <CloseIcon />  : <MenuIcon /> }
                </IconButton>
            </div>
        </header>
    );
};

export default Header;