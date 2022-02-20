import { useMemo } from 'react';
import AreaChartContainer from '../AreaChart';
import BarChartContainer from '../BarChart';
import Container from '../Container';
import LineChartContainer from '../LineChart';
import { ResponsiveContainer } from 'recharts';
import { useDrag } from 'react-dnd'
import { ItemTypes } from '../../config'

const ChartContainer = ({ chartType, componentID }) => {
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

    return (
        <Container>
            <div>

            </div>
            <ResponsiveContainer ref={drag} width="100%" height="90%">
                { chartTypes[chartType].component }
            </ResponsiveContainer>
        </Container>
    );
};

export default ChartContainer;