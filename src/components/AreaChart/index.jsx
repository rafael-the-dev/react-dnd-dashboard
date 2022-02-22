import { Paper } from '@mui/material';
import React, { useEffect, useMemo, useRef } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, Tooltip } from 'recharts';
import data from  '../../sales.json'
import { useGlobalStyles } from '../../styles'
import classNames from 'classnames'
import { useDrag, useDrop } from 'react-dnd'
import { ItemTypes } from '../../config'
import nextId from "react-id-generator";

const AreaChartContainer = ({ componentID, colors, xAxeList, yAxeList }) => {
    const globalStyles = useGlobalStyles();

    const index = useRef(0);

    const yAxe = useMemo(() => {
        index.current = 0;
        return (
            yAxeList.map(yAxeItem => {
                if(index.current >= colors.length) {
                    index.current = 0;
                }
                const actualIndex = index.current;
                index.current += 1;

                return (
                    <Area 
                        type="monotone" 
                        dataKey={yAxeItem} 
                        fill={colors[actualIndex]} 
                        key={nextId('y-axe')}
                        stroke={colors[actualIndex]} 
                    />
                );
            })
        );
    }, [ colors, yAxeList ]);

    const xAxe = useMemo(() => (
        xAxeList.map(xAxeItem => (
            <XAxis dataKey={xAxeItem} key={nextId('x-axe')} />
        ))
    ), [ xAxeList ]);


    return (
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart
                width={500}
                height={400}
                data={data}
                margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 32,
                }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <Legend />
                { xAxe }
                <Tooltip />
                <YAxis />
                { yAxe }
            </AreaChart>
        </ResponsiveContainer>
    );
};

export default AreaChartContainer;

/**
 * 
 * 
        <Paper 
            className={classNames(globalStyles.chartSize, `relative mb-6 mr-6`)}
            elevation={0}
            ref={paperRef}>
            <div 
                className={classNames(globalStyles.resizer)}
                onMouseDown={initDrag}></div>
        </Paper>

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
 */