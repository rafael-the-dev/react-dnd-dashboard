import { Paper } from '@mui/material';
import React, { useRef } from 'react';
import { PieChart , Legend, Pie, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import data from  '../../sales.json'
import { useGlobalStyles } from '../../styles'
import classNames from 'classnames'
import { useDrag, useDrop } from 'react-dnd'
import { ItemTypes } from '../../config'

const PieChartContainer = ({ componentID }) => {
    const globalStyles = useGlobalStyles();

    let startX, startY, startWidth, startHeight;
    const paperRef = useRef(null);

    const [ , drag ] = useDrag(() => ({
        type: ItemTypes.PIE_CHART,
        item: { componentID, type: ItemTypes.PIE_CHART },
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
                    <PieChart width="80%" height="80%">
                        <Tooltip />
                        <Pie 
                            data={data} 
                            dataKey="id" 
                            nameKey="Preço Unitário" 
                            cx="50%" 
                            cy="50%" 
                            outerRadius={50} 
                            fill="#8884d8" 
                        />
                        <Pie 
                            data={data} 
                            dataKey="value" 
                            nameKey="name" 
                            cx="50%" c
                            y="50%" 
                            innerRadius={60} 
                            outerRadius={80} 
                            fill="#82ca9d" 
                            label 
                        />
                    </PieChart>
            </ResponsiveContainer>
            <div 
                className={classNames(globalStyles.resizer)}
                onMouseDown={initDrag}></div>
        </Paper>
    );
};

export default PieChartContainer;