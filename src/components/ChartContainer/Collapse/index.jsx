import { Collapse, Typography } from '@mui/material';
import classNames from 'classnames'
import { useMemo } from 'react';
import { useGlobalStyles } from '../../../styles';
import { useDrop } from 'react-dnd'
import { ItemTypes } from '../../../config'
import AxeChip from '../AxeChip'

const CollapseContainer = ({ axeList, chipDeleteHandler, dropHandler, open, tabID, setAxeList  }) => {
    const globalStyles = useGlobalStyles();
    const columnsList = useMemo(() => (
        axeList.map((item, index) => (
            <AxeChip 
                deleteHandler={chipDeleteHandler(item, setAxeList)}
                key={index}
                label={item} 
            />
        ))
    ), [ axeList, chipDeleteHandler, setAxeList ]);

    const [, drop] = useDrop(
        () => ({
            accept: [ ItemTypes.SALE_COLUMN, ],
            drop: (item) => {
                console.log(item);
                setAxeList(list => {
                    if(!list.includes(item.column)) {
                        return [ ...list, item.column ]
                    }
                    return list;
                })
            },
            collect: (monitor) => ({
                isOver: !!monitor.isOver()
            })
        }),
        []
    );

    return (
        <Collapse in={ tabID === open }>
            <div 
                className={classNames(globalStyles.chipsContainer, `flex flex-wrap items-center px-3`,
                { ' pt-4 pb-2': axeList.length > 0, 'py-6': axeList.length === 0})}
                ref={drop}>
                { axeList.length > 0 ? columnsList : (
                    <Typography
                        className={classNames(`font-bold`)}
                        component="h2"
                        variant="h5">
                        Drag and drop columns here
                    </Typography>
                )}
            </div>
        </Collapse>
    );
};

export default CollapseContainer;