import classNames from 'classnames'
import { useStyles } from './styles'
import Table from '../../components/Table'
import { useGlobalStyles } from '../../styles';

const Home = () => {
    const classes = useStyles();
    const globalStyles = useGlobalStyles();

    return (
        <main className={classNames(globalStyles.px, `py-12`)}>
            <Table />
        </main>
    );
};

export default Home;