import { useDrop } from 'react-dnd'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ItemTypes } from '../../config'
import { useMemo, useState } from 'react'

const DefaultTable = () => {
    const [ columnsList, setColumnsList ] = useState(['', '', '']);

    const [, drop] = useDrop(
        () => ({
            accept: ItemTypes.SALE_COLUMN,
            drop: (item) => {
                console.log(item);
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
    ), [ columnsList ])

    return (
        <TableContainer 
            component={Paper}
            elevation={0}>
            <Table 
                aria-label="table"
                ref={drop}>
                <TableHead>
                    { columnsListMemo }
                </TableHead>
            </Table>
        </TableContainer>
    );
};

export default DefaultTable;