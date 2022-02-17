import classNames from 'classnames'
import { useStyles } from './styles'
import Table from '../../components/Table'
import HorizontalTable from '../../components/HorizontalTable'
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
            accept: [ ItemTypes.TABLE ],
            drop: (item) => {
                setComponents(list => {
                    if(item.type === 'vertical-table') {
                        return [ ...list, <Table key={list.length + 1} />]
                    } else if(item.type === 'horizontal-table'){
                        return [ ...list, <HorizontalTable key={list.length + 1} />]
                    }

                    return list;
                })
            },
            collect: (monitor) => ({
                isOver: !!monitor.isOver()
            })
        }),
        []
    );

    return (
        <main 
            className={classNames(globalStyles.px, `py-12 flex flex-wrap items-start`)}
            ref={drop}>
            {
                components
            }
        </main>
    );
};

export default Home;