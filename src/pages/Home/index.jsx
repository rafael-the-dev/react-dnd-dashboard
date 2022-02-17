import classNames from 'classnames'
import { useStyles } from './styles'
import Table from '../../components/Table'
import HorizontalTable from '../../components/HorizontalTable'
import { useGlobalStyles } from '../../styles';
import { useDrop } from 'react-dnd'
import { ItemTypes } from '../../config'
import { useMemo, useRef, useState } from 'react'
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const Home = () => {
    const classes = useStyles();
    const globalStyles = useGlobalStyles();
    const [ components, setComponents ] = useState([]);

    const [, deleteDropRef ] = useDrop(
        () => ({
            accept: [ ItemTypes.HORIZONTAL_TABLE, ItemTypes.VERTICAL_TABLE ],
            drop: (item) => {
                console.log(item)
                setComponents(list => list.filter(element => parseInt(element.key) !== item.componentID))
            },
            collect: (monitor) => ({
                isOver: !!monitor.isOver()
            })
        }),
        []
    );

    const [, drop] = useDrop(
        () => ({
            accept: [ ItemTypes.TABLE ],
            drop: (item) => {
                setComponents(list => {
                    const id = list.length + 1;
                    if(item.type === 'vertical-table') {
                        return [ ...list, <Table componentID={id} key={id} />]
                    } else if(item.type === 'horizontal-table'){
                        return [ ...list, <HorizontalTable componentID={id} key={id} />]
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
            className={classNames(globalStyles.px, ` pt-4 pb-12 flex flex-col items-stretch`)}
            >
            <div className={classNames('flex justify-end')}>
                { components.length > 0 && <Button 
                        className={classNames('bg-red-700 hover:bg-red-600 text-slate-50 px-4 py-2')}
                        endIcon={<DeleteIcon />}
                        ref={deleteDropRef}>
                        Delete
                    </Button>
                }
            </div>
            <div
                className={classNames(classes.droppableContainer, `mt-6 flex flex-wrap items-start`)}
                ref={drop}>
                {
                    components
                }
            </div>
        </main>
    );
};

export default Home;