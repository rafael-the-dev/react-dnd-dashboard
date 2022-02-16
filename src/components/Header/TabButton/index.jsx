import { Button } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import classNames from 'classnames'
import { useStyles } from './styles'

const TabButton = ({ label }) => {
    const classes = useStyles();

    return (
        <Button 
            className={classNames(classes.defaultButton, `border-0 rounded-none py-2.5`)}
            endIcon={<KeyboardArrowDownIcon />}
            variant="contained">
            { label }
        </Button>
    );
};

export default TabButton;