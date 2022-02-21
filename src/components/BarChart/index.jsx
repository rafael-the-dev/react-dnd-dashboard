import { Paper } from '@mui/material';
import React, { useRef } from 'react';
import { BarChart , Legend, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import data from  '../../sales.json'
import { useGlobalStyles } from '../../styles'
import classNames from 'classnames'
import { useDrag, useDrop } from 'react-dnd'
import { ItemTypes } from '../../config'

const BarChartContainer = ({ componentID }) => {
    const globalStyles = useGlobalStyles();

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart 
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
            <XAxis dataKey="id" />
            <YAxis />
            <Tooltip />
            <Bar type="monotone" dataKey="Preço Unitário" stroke="#8884d8" fill="#8884d8" />
        </BarChart >
    </ResponsiveContainer>
    );
};

export default BarChartContainer;