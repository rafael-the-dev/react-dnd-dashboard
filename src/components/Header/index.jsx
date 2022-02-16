import { Button, Collapse, IconButton, Typography } from '@mui/material';
import classNames from 'classnames'
import { useGlobalStyles } from '../../styles';
import MenuIcon from '@mui/icons-material/Menu';
import { useCallback, useMemo, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import TabButton from './TabButton'

const Header = () => {
    const globalStyles = useGlobalStyles();

    const [ open, setOpen ] = useState(false);

    const toggleOpen = useCallback(() => setOpen(o => !o), []);
    const buttons = useMemo(() => (
        <div className={classNames(`flex items-stretch mt-2`)}>
            <TabButton label="Columns" />
            <TabButton label="Tables" />
            <TabButton label="Graphs" />
        </div>
    ), []);

    return (
        <header className={classNames(globalStyles.px, `py-4`)}>
            <div className={classNames(`flex justify-between items-center`)}>
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
            </div>
            <Collapse in={open} timeout="auto" unmountOnExit>
                { buttons }
            </Collapse>
        </header>
    );
};

export default Header;