import { useCallback, useEffect, useMemo, useState } from 'react';
import AreaChartContainer from '../AreaChart';
import BarChartContainer from '../BarChart';
import Container from '../Container';
import LineChartContainer from '../LineChart';
import { useDrag, useDrop } from 'react-dnd'
import { ItemTypes } from '../../config'
import classNames from 'classnames'
import ChartTab from './ChartTab'
import { useGlobalStyles } from '../../styles';
import { Collapse } from '@mui/material';
import ColumnsCollapse from './Collapse'
import data from '../../sales.json'
import moment from 'moment';

const ChartContainer = ({ chartType, componentID }) => {
    const globalStyles = useGlobalStyles();

    const [ open, setOpen ] = useState('');
    const [ xAxeList, setXAxeList ] = useState([])
    const [ yAxeList, setYAxeList ] = useState([])

    const tabClickHanlder = useCallback(prop => () => setOpen(oldState => oldState === prop ? '' : prop), []);
    const axeItemDeleteHandler = useCallback((id, func) => () => {
        func(list => list.filter(item => item !== id));
    }, []);

    const sortedData = useMemo(() => {
        const sortKey = xAxeList.length > 0 ? xAxeList[0] : 'id';
        const isDate = moment(data[0][sortKey], 'YYYY-MM-DD', true).isValid();
        const isString = typeof data[0][sortKey] === 'string';

        const result = data.sort((a, b) => {
            if(isDate) {
                return new Date(a[sortKey]) -  new Date(b[sortKey]);
            } else if(isString) {
                const nameA = a[sortKey].toLowerCase();
                const nameB = b[sortKey].toLowerCase();

                if (nameA < nameB)
                    return -1;
                
                if (nameA > nameB)
                    return 1;

                return 0;
            }
            return a[sortKey] - b[sortKey];
        });
        
        return result;
    }, [ xAxeList ]);

    const anylitics = useMemo(() => {
        const map = {
            x: 1,
            y: 2,
            count: 3,
            min: 5, 
            max: 7
        };

        data.forEach(item => {
            Object.keys(item).forEach(key => {
                if(Boolean(key)) {
                    if(Object.keys(map).includes(key)) {
                        map[key] += 1;
                    } else {
                        map[key] = 1;
                    }
                }
            });
        });
        return map;
    }, []);

    useEffect(() => console.log(sortedData), [ sortedData ]);

    const colors = useMemo(() => [ '#8884d8', '#82ca9d', '#ffc658'], []);
    
    const chartTypes = useMemo(() => ({
        area: {
            component: <AreaChartContainer colors={colors} data={sortedData} xAxeList={xAxeList} yAxeList={yAxeList} />,
            type: ItemTypes.AREA_CHART
        },
        bar: {
            component: <BarChartContainer colors={colors} data={sortedData} xAxeList={xAxeList} yAxeList={yAxeList} />,
            type: ItemTypes.BAR_CHART
        },
        line: {
            component: <LineChartContainer colors={colors} data={sortedData} xAxeList={xAxeList} yAxeList={yAxeList} />,
            type: ItemTypes.LINE_CHART
        }
    }), [ colors, sortedData, xAxeList, yAxeList ]);

    const [ , drag ] = useDrag(() => ({
        type: chartTypes[chartType].type,
        item: { componentID, type: chartTypes[chartType].type, xAxeList, yAxeList },
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging()
        })
    }), [ componentID, xAxeList, yAxeList ]);

    const [, drop] = useDrop(
        () => ({
            accept: [ ItemTypes.AREA_CHART, ItemTypes.BAR_CHART, ItemTypes.LINE_CHART ],
            drop: (item) => {
                console.log(item);
                setXAxeList(item.xAxeList);
                setYAxeList(item.yAxeList);
            },
            collect: (monitor) => ({
                isOver: !!monitor.isOver()
            })
        }),
        []
    );

    const createXAxeColumns = useCallback(() => <></>, []);

    return (
        <Container canIAddMinSizes={true}>
            <div ref={drag} className={classNames(`w-full h-full`)} >
                <div ref={drop} className={classNames(`flex flex-col items-stretch w-full h-full pt-2 overflow-y-auto`)}>
                    <div className={classNames(``)}>
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
                        <Collapse in={ 'agreggations' === open }  className={classNames({ [globalStyles.collapse]: 'agreggations' === open })}>
                            <div className={classNames(globalStyles.chipsContainer, `flex flex-wrap items-center pt-4 pb-2 px-2.5
                                sm:justify-end`)}>
                                { createXAxeColumns() }
                            </div>
                        </Collapse>
                    </div>
                    <div className={classNames(`grow`)}>
                        { chartTypes[chartType].component }
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default ChartContainer;