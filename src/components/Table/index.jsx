import { useDrop } from 'react-dnd'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ItemTypes } from '../../config'
import { useMemo, useRef, useState } from 'react'
import data from '../../sales.json'
import classNames from 'classnames'

const DefaultTable = () => {
    const [ columnsList, setColumnsList ] = useState(['', '', '']);
    const isFirstRender = useRef(true);

    const [, drop] = useDrop(
        () => ({
            accept: ItemTypes.SALE_COLUMN,
            drop: (item) => {
                console.log(item);
                isFirstRender.current = false;
                setColumnsList(list => {
                    return list.includes(item.column) ? list : [ ...list.filter(item => Boolean(item)), item.column ];
                });
            },
            collect: (monitor) => ({
                isOver: !!monitor.isOver()
            })
        }),
        []
    );

    const columnsListMemo = useMemo(() => (
        <TableRow>
            {
                columnsList.map((column, index) => (
                    <TableCell align="center">{ column }</TableCell>
                ))
            }
        </TableRow>
    ), [ columnsList ]);

    const rowsList = useMemo(() => (
        isFirstRender.current ? [] : data.map((row, index) => (
            <TableRow key={index}>
                {
                    columnsList.map((column, columnIndex) => (
                        <TableCell 
                            align="center"
                            key={`${index}${columnIndex}`}>
                            { row[column] }
                        </TableCell>
                    ))
                }
            </TableRow>
        ))
    ), [ columnsList ])

    return (
        <TableContainer 
            className={classNames(`overflow-auto`)}
            component={Paper}
            elevation={0}>
            <Table 
                aria-label="table"
                ref={drop}>
                <TableHead>
                    { columnsListMemo }
                </TableHead>
                <TableBody>
                    { rowsList }
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default DefaultTable;