import classNames from 'classnames'
import { useStyles } from './styles'
import Table from '../../components/Table'
import { useGlobalStyles } from '../../styles';
import { useDrop } from 'react-dnd'
import { ItemTypes } from '../../config'
import { useMemo, useRef, useState } from 'react'

const Home = () => {
    const classes = useStyles();
    const globalStyles = useGlobalStyles();
    const [ components, setComponents ] = useState([]);

    const [, drop] = useDrop(
        () => ({
            accept: ItemTypes.TABLE,
            drop: (item) => {
            },
            collect: (monitor) => ({
                isOver: !!monitor.isOver()
            })
        }),
        []
    );

    return (
        <main 
            className={classNames(globalStyles.px, `py-12`)}
            ref={drop}>
            {
                components
            }
        </main>
    );
};

export default Home;