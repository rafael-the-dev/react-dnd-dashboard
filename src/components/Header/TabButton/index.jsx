import { Button } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import classNames from 'classnames'
import { useStyles } from './styles'
import { useCallback, useState } from 'react'

const TabButton = ({ label }) => {
    const classes = useStyles();

    const [ open, setOpen ] = useState(false);
    const toggle = useCallback(() => setOpen(o => !o), []);

    return (
        <Button
            className={classNames(classes.defaultButton, `border-0 rounded-none py-2.5`)}
            endIcon={<KeyboardArrowDownIcon className={classNames({'rotate-180': open})} />}
            onClick={toggle}
            variant="contained">
            { label }
        </Button>
    );
};

export default TabButton;