import { useDrag, useDrop } from 'react-dnd'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ItemTypes } from '../../config'
import { useCallback, useMemo, useRef, useState } from 'react'
import data from '../../sales.json'
import classNames from 'classnames'
import { IconButton, TablePagination } from '@mui/material';
import { useGlobalStyles } from '../../styles'
import nextId from "react-id-generator";
import DeleteIcon from '@mui/icons-material/Delete';
import VerticalTable from './VerticalTable'

const DefaultTable = ({ componentID, isHorizontalTable }) => {
    const globalStyles = useGlobalStyles();

    const [ columnsList, setColumnsList ] = useState(['', '', '']);
    const isFirstRender = useRef(true);
    const [ rowsPerPage, setRowsPerPage ] = useState(5);
    const [ page, setPage ] = useState(0);

    const [ , drag ] = useDrag(() => ({
        type: ItemTypes.VERTICAL_TABLE,
        item: { columns: columnsList, componentID, type: ItemTypes.VERTICAL_TABLE },
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging()
        })
    }), [ columnsList, componentID ]);

    const [, drop] = useDrop(
        () => ({
            accept: [ ItemTypes.SALE_COLUMN, ItemTypes.HORIZONTAL_TABLE ],
            drop: (item) => {
                console.log(item);
                isFirstRender.current = false;
                if(item.type === ItemTypes.HORIZONTAL_TABLE) {
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

    const removeHeader = useCallback(prop => () => {
        setColumnsList(list => {
            const result = list.filter(item => item !== prop);
            return result.length > 0 ? result : [ '' ];
        });
    }, []);

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
    ), [ columnsList, globalStyles, page, rowsPerPage ]);

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
                    <VerticalTable 
                        columnsList={columnsList}
                        isFirstRender={isFirstRender}
                        page={page}
                        ref={drop}
                        removeHeader={removeHeader}
                        rowsPerPage={rowsPerPage}
                    />
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

/**
 * <Table 
                        aria-label="table"
                        sx={{ minWidth: 50 }}
                        ref={drop}>
                        <TableHead>
                            { columnsListMemo }
                        </TableHead>
                        <TableBody>
                            { rowsList }
                        </TableBody>
                    </Table>
 * 
 */