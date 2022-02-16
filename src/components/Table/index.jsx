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
import { TablePagination } from '@mui/material';

const DefaultTable = () => {
    const [ columnsList, setColumnsList ] = useState(['', '', '']);
    const isFirstRender = useRef(true);
    const [ rowsPerPage, setRowsPerPage ] = useState(5);
    const [ page, setPage ] = useState(0);

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

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

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
        isFirstRender.current ? [] : data.slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage).map((row, index) => (
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
    ), [ columnsList, page, rowsPerPage ])

    return (
        <Paper 
            className={classNames(`w-full mb-4`)}
            elevation={0}>
            <TableContainer 
                className={classNames(`overflow-auto`)}
                >
                <Table 
                    aria-label="table"
                    sx={{ minWidth: 120 }}
                    ref={drop}>
                    <TableHead>
                        { columnsListMemo }
                    </TableHead>
                    <TableBody>
                        { rowsList }
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 7, 10, 15, 25, 30]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
};

export default DefaultTable;