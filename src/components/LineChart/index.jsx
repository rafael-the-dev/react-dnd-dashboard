import { Paper } from '@mui/material';
import React, { useRef } from 'react';
import { LineChart , Legend, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import data from  '../../sales.json'
import { useGlobalStyles } from '../../styles'
import classNames from 'classnames'
import { useDrag, useDrop } from 'react-dnd'
import { ItemTypes } from '../../config'

const LineChartContainer = ({ componentID }) => {
    const globalStyles = useGlobalStyles();

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
                    bottom: 0,
                }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <Legend />
                <XAxis dataKey="id" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="Preço Unitário" stroke="#8884d8" fill="#8884d8" />
                <Line type="monotone" dataKey="Valor da Venda" stroke="#82ca9d" />
            </LineChart >
        </ResponsiveContainer>
    );
};

export default LineChartContainer;