import { useDrag, useDrop } from 'react-dnd'
import TableContainer from '@mui/material/TableContainer';
import { ItemTypes } from '../../config'
import { useCallback, useRef, useState } from 'react'
import data from '../../sales.json'
import classNames from 'classnames'
import { TablePagination } from '@mui/material';
//import { useGlobalStyles } from '../../styles'
import VerticalTable from './VerticalTable'
import HorizontalTable from './HorizontalTable'
import Container from '../Container'

const DefaultTable = ({ componentID, isHorizontalTable }) => {
    //const globalStyles = useGlobalStyles();

    const [ columnsList, setColumnsList ] = useState(['', '', '']);
    const isFirstRender = useRef(true);
    const [ rowsPerPage, setRowsPerPage ] = useState(5);
    const [ page, setPage ] = useState(0);

    const [ , drag ] = useDrag(() => ({
        type: isHorizontalTable ? ItemTypes.HORIZONTAL_TABLE : ItemTypes.VERTICAL_TABLE,
        item: { columns: columnsList, componentID, type: ItemTypes.VERTICAL_TABLE },
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging()
        })
    }), [ columnsList, componentID ]);

    const [, drop] = useDrop(
        () => ({
            accept: [ ItemTypes.SALE_COLUMN, isHorizontalTable ? ItemTypes.VERTICAL_TABLE : ItemTypes.HORIZONTAL_TABLE ],
            drop: (item) => {
                console.log(item);
                isFirstRender.current = false;

                if(Boolean(item.column)) {
                    setColumnsList(list => {
                        return list.includes(item.column) ? list : [ ...list.filter(item => Boolean(item)), item.column ];
                    });
                } else {
                    setColumnsList(item.columns);
                }
            },
            collect: (monitor) => ({
                isOver: !!monitor.isOver()
            })
        }),
        []
    );

    const handleChangePage = useCallback((event, newPage) => {
        setPage(newPage);
    }, []);

    const handleChangeRowsPerPage = useCallback((event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }, []);

    const removeHeader = useCallback(prop => () => {
        setColumnsList(list => {
            const result = list.filter(item => item !== prop);
            return result.length > 0 ? result : [ '' ];
        });
    }, []);

    return (
        <Container>
            <div ref={drag} className={classNames(`w-full h-full flex flex-col items-stretch`)}>
                <TableContainer 
                    className={classNames(``)}
                    >
                    { isHorizontalTable ? (
                        <HorizontalTable 
                            columnsList={columnsList}
                            isFirstRender={isFirstRender}
                            page={page}
                            ref={drop}
                            removeHeader={removeHeader}
                            rowsPerPage={rowsPerPage}
                        />
                    ) : (
                        <VerticalTable 
                            columnsList={columnsList}
                            isFirstRender={isFirstRender}
                            page={page}
                            ref={drop}
                            removeHeader={removeHeader}
                            rowsPerPage={rowsPerPage}
                        />)
                    }
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
        </Container>
    );
};

export default DefaultTable;
