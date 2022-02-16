import { Typography } from '@mui/material';
import classNames from 'classnames'
import { useGlobalStyles } from '../../styles';

const Header = () => {
    const globalStyles = useGlobalStyles();

    return (
        <header className={classNames(globalStyles.px, `py-4`)}>
            <Typography 
                className={classNames('font-bold')}
                component="h1"
                variant="h5"
            >
                Dashboard
            </Typography>
        </header>
    );
};

export default Header;