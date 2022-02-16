import { Chip, Collapse, Hidden, IconButton, Typography } from '@mui/material';
import classNames from 'classnames'
import { useGlobalStyles } from '../../styles';
import MenuIcon from '@mui/icons-material/Menu';
import { useCallback, useContext, useMemo, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import TabButton from './TabButton'
import { HeaderContext } from '../../context/HeaderContext';
import { useStyles } from './styles'

const Header = () => {
    const classes = useStyles();
    const globalStyles = useGlobalStyles();

    const { tabClickHanlder, openedTab, tabsID } = useContext(HeaderContext);
    const [ open, setOpen ] = useState(false);

    const toggleOpen = useCallback(() => {
            setOpen(o => !o);
            tabClickHanlder('')();
    }, [ tabClickHanlder ]);
    
    const buttons = useMemo(() => (
        <div className={classNames(`flex items-stretch mt-2`)}>
            <TabButton label="Columns" tabID={tabsID.columns} />
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
                    <Hidden smUp>
                        <IconButton onClick={toggleOpen}>
                            { open ? <CloseIcon />  : <MenuIcon /> }
                        </IconButton>
                    </Hidden>
                    <Hidden smDown>
                        { buttons }
                    </Hidden>
                </div>
            </div>
            <Hidden smUp>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    { buttons }
                </Collapse>
            </Hidden>
            
                <>
                     <Collapse in={ tabsID.columns === openedTab }>
                        <div className={classNames(classes.chipsContainer, `flex flex-wrap items-center py-4 px-2.5
                            sm:justify-end`)}>
                            <Chip   
                                className={classNames('mr-2.5 text-base border-blue-700 text-blue-700 mb-3.5')}
                                label="Vertical table" 
                                variant="outlined"
                            />
                            <Chip 
                                className={classNames('text-base mr-2.5 border-blue-700 text-blue-700 mb-3.5')}
                                label="horizontal table" 
                                variant="outlined"
                            />
                            <Chip   
                                className={classNames('mr-2.5 text-base border-blue-700 text-blue-700 mb-3.5')}
                                label="Vertical table" 
                                variant="outlined"
                            />
                            <Chip 
                                className={classNames('text-base mr-2.5 border-blue-700 text-blue-700 mb-3.5')}
                                label="horizontal table" 
                                variant="outlined"
                            />
                        </div>
                    </Collapse>
                    <Collapse in={ tabsID.tables === openedTab }>
                        <div className={classNames(classes.chipsContainer, `flex items-center py-4 px-2.5
                            sm:justify-end`)}>
                            <Chip   
                                className={classNames('mr-2.5 text-base border-blue-700 text-blue-700')}
                                label="Vertical table" 
                                variant="outlined"
                            />
                            <Chip 
                                className={classNames('text-base border-blue-700 text-blue-700')}
                                label="horizontal table" 
                                variant="outlined"
                            />
                        </div>
                    </Collapse>
                    <Collapse in={ tabsID.graphs === openedTab }>
                        <div className={classNames(classes.chipsContainer, `flex items-center py-4 px-2.5
                            sm:justify-end`)}>
                            <Chip   
                                className={classNames('mr-2.5 text-base border-blue-700 text-blue-700')}
                                label="Vertical table" 
                                variant="outlined"
                            />
                        </div>
                    </Collapse>
                </>
            
        </header>
    );
};

export default Header;