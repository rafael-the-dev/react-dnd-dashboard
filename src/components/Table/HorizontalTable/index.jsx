import { forwardRef, useMemo } from 'react'
import { IconButton, Table, TableBody, TableCell, TableHead, TableRow, } from '@mui/material';
import { useGlobalStyles } from '../../../styles'
import classNames from 'classnames'
import nextId from "react-id-generator";
import DeleteIcon from '@mui/icons-material/Delete';
import data from '../../../sales.json'


const HorizontalTable = forwardRef(({ columnsList, isFirstRender, page, removeHeader, rowsPerPage }, ref) => {
    const globalStyles = useGlobalStyles();

    const emptyTable = useMemo(() => (
        <>
            <TableRow>
                <TableCell 
                    align="center"
                    className={classNames(`bg-blue-800 text-slate-50`)}>
                </TableCell>
                <TableCell 
                    align="center">
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell 
                    align="center"
                    className={classNames(`bg-blue-800 text-slate-50`)}>
                </TableCell>
                <TableCell 
                    align="center">
                </TableCell>
            </TableRow>
        </>
    ), []);

    const rowsList = useMemo(() => {
        const list = data.slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage);
        return isFirstRender.current ? emptyTable : (
            columnsList.map((column, columnIndex) => (
                <TableRow key={columnIndex} className={classNames(globalStyles.tableRow)}>
                    <TableCell 
                        align="center"
                        className={classNames(globalStyles.tableHeader, `bg-blue-800 text-slate-50`)}
                        key={columnIndex}>
                        <div classNames={classNames(`flex items-center justify-center`)}>
                            { column }
                            { 
                                Boolean(column) && <IconButton 
                                    className={classNames(`ml-2 text-red-600 p-0 opacity-0 table__header-button`)}
                                    onClick={removeHeader(column)}>
                                    <DeleteIcon />
                                </IconButton>
                            }
                        </div>
                    </TableCell>
                    {
                        Boolean(column) && list.map((row, index) => (
                            <TableCell 
                                align="center"
                                key={nextId('hz')}>
                                { row[column] }
                            </TableCell>
                        ))
                    }
                </TableRow>
            )
        ))
    }, [ columnsList, emptyTable, globalStyles, isFirstRender, page, removeHeader, rowsPerPage ])

    data.slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage).map((row, index) => (
        <TableRow key={index}>
            {
                columnsList
                .filter(column => Boolean(column))
                .map((column, columnIndex) => (
                    <TableCell 
                        align="center"
                        key={`${index}${columnIndex}`}>
                        { row[column] }
                    </TableCell>
                ))
            }
        </TableRow>
    ));

    return (
        <Table 
            aria-label="table"
            sx={{ minWidth: 50 }}
            ref={ref}>
            <TableBody>
                { rowsList }
            </TableBody>
        </Table>
    );
});

export default HorizontalTable;