import { Button } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import classNames from 'classnames'
import { useStyles } from './styles'
import { useCallback, useContext, useState } from 'react'
import { HeaderContext } from '../../../context/HeaderContext';

const TabButton = ({ label, tabID }) => {
    const classes = useStyles();
    const { openedTab, tabClickHanlder } = useContext(HeaderContext);
    const [ open, setOpen ] = useState(false);
    const toggle = useCallback(() => setOpen(o => !o), []);

    return (
        <Button
            className={classNames(classes.defaultButton, `border-0 rounded-none py-2.5 sm:shadow-none`)}
            endIcon={<KeyboardArrowDownIcon className={classNames({'rotate-180': openedTab === tabID })} />}
            onClick={tabClickHanlder(tabID)}
            variant="contained">
            { label }
        </Button>
    );
};

export default TabButton;