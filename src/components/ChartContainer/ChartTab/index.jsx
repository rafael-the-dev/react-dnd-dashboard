import { Button } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import classNames from 'classnames'
import { useStyles } from './styles'
//import { useCallback, useContext, useState } from 'react'

const ChartTab = ({ label, tabID, openedTab, tabClickHanlder }) => {
    const classes = useStyles();

    return (
        <Button
            className={classNames(classes.defaultButton, `mb-2.5 border-0 rounded-none py-2.5 sm:shadow-none sm:w-auto`)}
            endIcon={<KeyboardArrowDownIcon className={classNames({'rotate-180': openedTab === tabID })} />}
            onClick={tabClickHanlder(tabID)}
            variant="contained">
            { label }
        </Button>
    );
};

export default ChartTab;