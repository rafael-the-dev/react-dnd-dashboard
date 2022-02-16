import { Collapse, IconButton, Typography } from '@mui/material';
import classNames from 'classnames'
import { useGlobalStyles } from '../../styles';
import MenuIcon from '@mui/icons-material/Menu';
import { useCallback, useContext, useMemo, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import TabButton from './TabButton'
import { HeaderContext } from '../../context/HeaderContext';

const Header = () => {
    const globalStyles = useGlobalStyles();
    const { tabsID } = useContext(HeaderContext);
    const [ open, setOpen ] = useState(false);

    const toggleOpen = useCallback(() => setOpen(o => !o), []);
    const buttons = useMemo(() => (
        <div className={classNames(`flex items-stretch mt-2`)}>
            <TabButton label="Columns" tabID={tabsID.colums} />
            <TabButton label="Tables" tabID={tabsID.tables} />
            <TabButton label="Graphs" tabID={tabsID.graphs} />
        </div>
    ), [ tabsID ]);

    return (
        <header className={classNames(globalStyles.px, `py-4`)}>
            <div className={classNames(`flex justify-between items-center`)}>
                <Typography 
                    className={classNames('font-bold')}
                    component="h1"
                    variant="h5"
                >
                    DnD Dashboard
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