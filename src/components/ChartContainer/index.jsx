import { useCallback, useMemo, useState } from 'react';
import AreaChartContainer from '../AreaChart';
import BarChartContainer from '../BarChart';
import Container from '../Container';
import LineChartContainer from '../LineChart';
import { ResponsiveContainer } from 'recharts';
import { useDrag } from 'react-dnd'
import { ItemTypes } from '../../config'
import classNames from 'classnames'
import ChartTab from './ChartTab'
import { useGlobalStyles } from '../../styles';
import { Collapse } from '@mui/material';
import ColumnsCollapse from './Collapse'

const ChartContainer = ({ chartType, componentID }) => {
    const globalStyles = useGlobalStyles();

    const [ open, setOpen ] = useState('');
    const [ xAxeList, setXAxeList ] = useState([])
    const [ yAxeList, setYAxeList ] = useState([])

    const tabClickHanlder = useCallback(prop => () => setOpen(oldState => oldState === prop ? '' : prop), []);
    const axeItemDeleteHandler = useCallback((id, func) => () => {
        func(list => list.filter(item => item !== id));
    }, []);
    
    const chartTypes = useMemo(() => ({
        area: {
            component: <AreaChartContainer />,
            type: ItemTypes.AREA_CHART
        },
        bar: {
            component: <BarChartContainer />,
            type: ItemTypes.BAR_CHART
        },
        line: {
            component: <LineChartContainer />,
            type: ItemTypes.LINE_CHART
        }
    }), []);

    const [ , drag ] = useDrag(() => ({
        type: chartTypes[chartType].type,
        item: { componentID, type: chartTypes[chartType].type },
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging()
        })
    }), [ componentID ]);

    const createXAxeColumns = useCallback(() => <></>, []);

    return (
        <Container canIAddMinSizes={true}>
            <div ref={drag} className={classNames(`flex flex-col items-stretch w-full h-full`)}>
                <div className={classNames(`pl-3 py-4 w-full flex flex-wrap items-stretch justify-start`)}>
                    <ChartTab 
                        label="X axe"
                        tabID="x-axe"
                        openedTab={open}
                        tabClickHanlder={tabClickHanlder}
                    />
                    <ChartTab 
                        label="Y axe"
                        tabID="y-axe"
                        openedTab={open}
                        tabClickHanlder={tabClickHanlder}
                    />
                    <ChartTab 
                        label="Agreggations"
                        tabID="agreggations"
                        openedTab={open}
                        tabClickHanlder={tabClickHanlder}
                    />
                </div>
                <ColumnsCollapse 
                    axeList={xAxeList} 
                    chipDeleteHandler={axeItemDeleteHandler}
                    open={open}  
                    tabID="x-axe" 
                    setAxeList={setXAxeList} 
                />
                <ColumnsCollapse 
                    axeList={yAxeList} 
                    chipDeleteHandler={axeItemDeleteHandler}
                    open={open} 
                    tabID="y-axe" 
                    setAxeList={setYAxeList} 
                />
                <Collapse in={ 'agreggations' === open }>
                    <div className={classNames(globalStyles.chipsContainer, `flex flex-wrap items-center pt-4 pb-2 px-2.5
                        sm:justify-end`)}>
                        { createXAxeColumns() }
                    </div>
                </Collapse>
                <div className={classNames(`grow`)}>
                        { chartTypes[chartType].component }
                </div>
            </div>
        </Container>
    );
};

export default ChartContainer;