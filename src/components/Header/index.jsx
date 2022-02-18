import { Chip, Collapse, Hidden, IconButton, Typography } from '@mui/material';
import classNames from 'classnames'
import { useGlobalStyles } from '../../styles';
import MenuIcon from '@mui/icons-material/Menu';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import TabButton from './TabButton'
import { HeaderContext } from '../../context/HeaderContext';
import { useStyles } from './styles'
import data from '../../sales.json'
import ColumnChip from './ColumnChip';
import TableChip from './TableChip';
import ChartChip from './ChartChip';

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

    const createColumns = useMemo(() => {
        let columnsNames = [];
        data.forEach(item => {
            Object.keys(item).forEach(key => {
                if(!columnsNames.includes(key)) {
                    columnsNames.push(key)
                }
            })
        })
        return columnsNames
            .filter(column => Boolean(column))
            .map((column, index) => (
            <ColumnChip
                column={column}
                key={index}
             />
        ))
    }, []);

    //useEffect(() => console.log(createColumns), [ createColumns ])


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
                        <div className={classNames(classes.chipsContainer, `flex flex-wrap items-center pt-4 pb-2 px-2.5
                            sm:justify-end`)}>
                            { createColumns }
                        </div>
                    </Collapse>
                    <Collapse in={ tabsID.tables === openedTab }>
                        <div className={classNames(classes.chipsContainer, `flex items-center pt-4 pb-2 px-2.5
                            sm:justify-end`)}>
                                <TableChip label="vertical-table" />
                                <TableChip label="horizontal-table" />
                        </div>
                    </Collapse>
                    <Collapse in={ tabsID.graphs === openedTab }>
                        <div className={classNames(classes.chipsContainer, `flex items-center pt-4 pb-2 px-2.5
                            sm:justify-end`)}>
                            <ChartChip label="area-chart" />
                            <ChartChip label="bar-chart" />
                            <ChartChip label="line-chart" />
                            <ChartChip label="pie-chart" />
                        </div>
                    </Collapse>
                </>
            
        </header>
    );
};

export default Header;