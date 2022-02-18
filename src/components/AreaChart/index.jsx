import { Paper } from '@mui/material';
import React, { useRef } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import data from  '../../sales.json'
import { useGlobalStyles } from '../../styles'
import classNames from 'classnames'
import { useDrag, useDrop } from 'react-dnd'
import { ItemTypes } from '../../config'

const AreaChartContainer = ({ componentID }) => {
    const globalStyles = useGlobalStyles();

    let startX, startY, startWidth, startHeight;
    const paperRef = useRef(null);

    const [ , drag ] = useDrag(() => ({
        type: ItemTypes.AREA_CHART,
        item: { componentID, type: ItemTypes.AREA_CHART },
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging()
        })
    }), [ componentID ]);

    const initDrag = (e) => {
        startX = e.clientX;
        startY = e.clientY;
        startWidth = parseInt(document.defaultView.getComputedStyle(paperRef.current).width, 10);
        startHeight = parseInt(document.defaultView.getComputedStyle(paperRef.current).height, 10);
        document.documentElement.addEventListener('mousemove', doDrag, false);
        document.documentElement.addEventListener('mouseup', stopDrag, false);
    };

    const doDrag = (e) => {
        paperRef.current.style.width = (startWidth + e.clientX - startX) + 'px';
        paperRef.current.style.height = (startHeight + e.clientY - startY) + 'px';
    }
     
    const stopDrag = (e) => {
        document.documentElement.removeEventListener('mousemove', doDrag, false);    
        document.documentElement.removeEventListener('mouseup', stopDrag, false);
    }
     

    return (
        <Paper 
            className={classNames(globalStyles.chartSize, `relative mb-6 mr-6`)}
            elevation={0}
            ref={paperRef}>
                <ResponsiveContainer ref={drag} width="100%" height="100%">
                    <AreaChart
                        width={500}
                        height={400}
                        data={data}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="id" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="Preço Unitário" stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
            </ResponsiveContainer>
            <div 
                className={classNames(globalStyles.resizer)}
                onMouseDown={initDrag}></div>
        </Paper>
    );
};

export default AreaChartContainer;