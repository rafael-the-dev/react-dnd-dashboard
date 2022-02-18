import { useDrag, useDrop } from 'react-dnd'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ItemTypes } from '../../config'
import { useMemo, useRef, useState } from 'react'
import data from '../../sales.json'
import classNames from 'classnames'
import { TablePagination } from '@mui/material';
import { useGlobalStyles } from '../../styles'
import nextId from "react-id-generator";

const DefaultTable = ({ componentID }) => {
    const globalStyles = useGlobalStyles();

    const [ columnsList, setColumnsList ] = useState(['', '']);
    const isFirstRender = useRef(true);
    const [ rowsPerPage, setRowsPerPage ] = useState(5);
    const [ page, setPage ] = useState(0);

    const [ , drag ] = useDrag(() => ({
        type: ItemTypes.HORIZONTAL_TABLE,
        item: { columns: columnsList, componentID, type: ItemTypes.HORIZONTAL_TABLE },
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging()
        })
    }), [ columnsList, componentID ]);

    const [, drop] = useDrop(
        () => ({
            accept: [ ItemTypes.SALE_COLUMN, ItemTypes.VERTICAL_TABLE ],
            drop: (item) => {
                console.log(item);
                isFirstRender.current = false;
                if(item.type === ItemTypes.VERTICAL_TABLE) {
                    setColumnsList(item.columns);
                } else if(Boolean(item.column)) {
                    setColumnsList(list => {
                        return list.includes(item.column) ? list : [ ...list.filter(item => Boolean(item)), item.column ];
                    });
                }
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
    ), [])

    const rowsList = useMemo(() => {
        const list = data.slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage);
        return isFirstRender.current ? emptyTable : (
            columnsList.map((column, columnIndex) => (
                <TableRow key={columnIndex}>
                    <TableCell 
                        align="center"
                        className={classNames(`bg-blue-800 text-slate-50`)}
                        key={columnIndex}>
                        { column }
                    </TableCell>
                    {
                        list.map((row, index) => (
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
    }, [ columnsList, emptyTable, page, rowsPerPage ])

    data.slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage).map((row, index) => (
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
    ));

    let startX, startY, startWidth, startHeight;
    const paperRef = useRef(null);

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
            className={classNames(`w-fit max-w-full mb-6 mr-6 relative`)}
            elevation={0}
            ref={paperRef}>
            <div ref={drag} className={classNames(`w-full h-full flex flex-col items-stretch`)}>
                <TableContainer 
                    className={classNames(``)}
                    >
                    <Table 
                        aria-label="table"
                        sx={{ minWidth: 50 }}
                        ref={drop}>
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
            </div>
            <div 
                className={classNames(globalStyles.resizer)}
                onMouseDown={initDrag}></div>
        </Paper>
    );
};

export default DefaultTable;