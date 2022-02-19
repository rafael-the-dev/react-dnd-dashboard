import { forwardRef, useMemo } from 'react'
import { IconButton, Table, TableBody, TableCell, TableHead, TableRow, } from '@mui/material';
import { useGlobalStyles } from '../../../styles'
import classNames from 'classnames'
import nextId from "react-id-generator";
import DeleteIcon from '@mui/icons-material/Delete';
import data from '../../../sales.json'


const VerticalTable = forwardRef(({ columnsList, isFirstRender, page, removeHeader, rowsPerPage }, ref) => {
    const globalStyles = useGlobalStyles();

    const columnsListMemo = useMemo(() => (
        <TableRow>
            {
                columnsList.map((column, index) => (
                    <TableCell 
                        align="center" 
                        className={classNames(globalStyles.tableHeader, `bg-blue-800 text-slate-50`)}
                        key={nextId('vth')}>
                        <div className={classNames(`flex items-center justify-center`)}>
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
                ))
            }
        </TableRow>
    ), [ columnsList, globalStyles, removeHeader ]);

    const rowsList = useMemo(() => (
        isFirstRender.current ? [] : data.slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage).map((row, index) => (
            <TableRow key={index} className={classNames(globalStyles.tableRow)}>
                {
                    columnsList
                        .filter(column => Boolean(column))
                        .map((column) => (
                            <TableCell 
                                align="center"
                                key={nextId('vt')}>
                                { row[column] }
                            </TableCell>
                        )
                    )
                }
            </TableRow>
        ))
    ), [ columnsList, globalStyles, isFirstRender, page, rowsPerPage ]);

    return (
        <Table 
            aria-label="table"
            sx={{ minWidth: 50 }}
            ref={ref}>
            <TableHead>
                { columnsListMemo }
            </TableHead>
            <TableBody>
                { rowsList }
            </TableBody>
        </Table>
    );
});

export default VerticalTable;