import classNames from 'classnames'
import { useStyles } from './styles'
import Table from '../../components/Table'
import { useGlobalStyles } from '../../styles';
import { useDrop } from 'react-dnd'
import { ItemTypes } from '../../config'
import { useState } from 'react'
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AreaChart from '../../components/AreaChart'
import BarChart from '../../components/BarChart'
import LineChart from '../../components/LineChart'
import PieChart from '../../components/PieChart'
import ChartContainer from '../../components/ChartContainer'
import nextId from "react-id-generator";

const Home = () => {
    const classes = useStyles();
    const globalStyles = useGlobalStyles();
    const [ components, setComponents ] = useState([]);

    const [, deleteDropRef ] = useDrop(
        () => ({
            accept: [ ItemTypes.AREA_CHART, ItemTypes.BAR_CHART, ItemTypes.HORIZONTAL_TABLE, 
                ItemTypes.LINE_CHART, ItemTypes.PIE_CHART, ItemTypes.VERTICAL_TABLE ],
            drop: (item) => {
                console.log(item)
                setComponents(list => list.filter(element => element.key !== item.componentID))
            },
            collect: (monitor) => ({
                isOver: !!monitor.isOver()
            })
        }),
        []
    );

    const [, drop] = useDrop(
        () => ({
            accept: [ ItemTypes.CHART, ItemTypes.TABLE ],
            drop: (item) => {
                setComponents(list => {
                    const id = nextId();
                    if(item.type === 'vertical-table') {
                        return [ ...list, <Table componentID={id} isHorizontalTable={false} key={id} />]
                    } else if(item.type === 'horizontal-table'){
                        return [ ...list, <Table componentID={id} isHorizontalTable={true} key={id} />]
                    } else if(item.type === ItemTypes.AREA_CHART) {
                        return [ ...list, <ChartContainer chartType="area" componentID={id} key={id} /> ]
                    } else if(item.type === ItemTypes.LINE_CHART) {
                        return [ ...list, <ChartContainer chartType="line" componentID={id} key={id} /> ]
                    } else if(item.type === ItemTypes.BAR_CHART) {
                        return [ ...list, <ChartContainer chartType="bar" componentID={id} key={id} /> ]
                    } else if(item.type === ItemTypes.PIE_CHART) {
                        return [ ...list, <ChartContainer chartType="pie" componentID={id} key={id} /> ]
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