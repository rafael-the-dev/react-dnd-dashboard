import { Paper } from '@mui/material';
import React, { useMemo, useRef } from 'react';
import { LineChart , Legend, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import data from  '../../sales.json'
import { useGlobalStyles } from '../../styles'
import classNames from 'classnames'
import { useDrag, useDrop } from 'react-dnd'
import { ItemTypes } from '../../config'
import nextId from "react-id-generator";

const LineChartContainer = ({ componentID, colors, data, xAxeList, yAxeList }) => {
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
                    <Line 
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
            <LineChart 
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
                <Tooltip />
                <YAxis />
                { xAxe }
                { yAxe }
            </LineChart >
        </ResponsiveContainer>
    );
};

export default LineChartContainer;